import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Card,  CardText } from "reactstrap";
import {
  api,
  PAYMENT_STATUS,
  SOCKET,
  socket,

  USER_TYPES,
} from "../../../util";

const SocketCustomerStatus = () => {
  const user = useSelector((state) => state.user);
  const [billingData, setBillingData] = useState({
    checkoutList: [],
    paymentType: "",

    isPaymentComplete: false,
    isPaymentStarted: false,
    paymentStatus: PAYMENT_STATUS.NOT_STARTED,
    billId: null,
  });
  const [isCurrentDeviceConnected, setIsCurrentDeviceConnected] =
    useState(true);

  const handleSocketConnectionFail = (err) => {
    console.log("handleSocketConnectionFail", err);
    setIsCurrentDeviceConnected(false);
  };

  const connectionSuccess = () => {
    socket.emit(SOCKET.EMIT_JOIN, {
      roomId: user?.saloon?.roomId,
      from: {
        id: user.id,
        roleNumber: user.role,
        name: user.firstName,
        role: user.role === USER_TYPES.ADMIN ? "ADMIN" : "CUSTOMER",
      },
    });
    setIsCurrentDeviceConnected(true);
  };

  useEffect(() => {
    connectionSuccess()
    socket.on("connect", (err) => connectionSuccess(err));

    socket.on("connect_error", (err) => handleSocketConnectionFail(err));
    socket.on("connect_failed", (err) => handleSocketConnectionFail(err));
    socket.on("disconnect", (err) => handleSocketConnectionFail(err));

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("connect_failed");
      socket.off("disconnect");
    };
  }, []);

  const reconnectSocket = async () => {
    try {
      socket.disconnect();
      socket.connect();
      socket.emit(SOCKET.EMIT_JOIN, {
        roomId: user?.saloon?.roomId,
        from: {
          id: user.id,
          roleNumber: user.role,
          name: user.firstName,
          role: user.role === USER_TYPES.ADMIN ? "ADMIN" : "CUSTOMER",
        },
      });

      try {
        const response = await api.get(
          "/square/billing-state/" + user?.saloon?.roomId
        );
        const { billingObject } = response?.data?.data;
        if (billingObject) {
          setBillingData(billingObject);
          socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, billingObject);
        } else {
          socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, billingData);
        }
      } catch (error) {
        console.log(error);
        // toast.error(error.response?.data?.message || error.message);
      }
    } catch (error) {
      toast.error("Couldn't re-establish the connection, Please refresh.");
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="mx-1 customer_status_wrapper">
        <Button
          type="button"
          size="sm"
          title="Refresh connection"
          disabled={isCurrentDeviceConnected}
          color={isCurrentDeviceConnected ? "secondary" : "primary"}
          onClick={(e) => {
            e.preventDefault();
            reconnectSocket();
          }}
        >
          <i class="bi bi-arrow-clockwise fs-6"></i>
        </Button>
        <CardText className="d-flex gap-2 fs-6">
          Status of current device :
          {isCurrentDeviceConnected ? (
            <small className="fw-bolder">
              <i class="bi bi-wifi text-success fs-6"></i> Connected
            </small>
          ) : (
            <small className="fw-bolder">
              <i class="bi bi-wifi fs-6 text-danger"></i> Disconnected
            </small>
          )}
        </CardText>
        {/* <CardText className="d-flex gap-2">
          Status of admin device :
          {isAdminActive ? (
            <div>
              <i class="bi bi-wifi text-success fs-5"></i> Active
            </div>
          ) : (
            <div>
              <i class="bi bi-wifi fs-5"></i> Inactive
            </div>
          )}
        </CardText> */}
      </Card>
    </div>
  );
};

export default SocketCustomerStatus;
