import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, CardText } from "reactstrap";
import { api, PAYMENT_STATUS, SOCKET, socket, USER_TYPES } from "../../../util";

const SocketAdminStatus = () => {
  const user = useSelector((state) => state.user);
  const { socket: socketState } = useSelector((state) => state);
  const [billingData, setBillingData] = useState({
    checkoutList: [],
    paymentType: "",

    isPaymentComplete: false,
    isPaymentStarted: false,
    paymentStatus: PAYMENT_STATUS.NOT_STARTED,
    billId: null,
  });
  const [isClientActive, setIsClientActive] = useState(
    !!socketState.customerSocketId
  );
  const [isCurrentDeviceConnected, setIsCurrentDeviceConnected] =
    useState(true);

  useEffect(() => {
    if (!!socketState.customerSocketId) {
      setIsClientActive(true);
    } else {
      setIsClientActive(false);
    }
  }, [socketState.customerSocketId]);

  const handleSocketConnectionFail = (err) => {
    console.log("handleSocketConnectionFail", err);
    setIsCurrentDeviceConnected(false);
  };

  const connectionSuccess = (err) => {
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

    socket.on("CUSTOMER_FACING_DISCONNECTED", (data) => {
      // console.log("GOT PING FROM CLIENT 'CUSTOMER_FACING_DISCONNECTED'");
      setIsClientActive(false);
    });

    socket.on("CUSTOMER_FACING_CONNECTED", (id) => {
      if (id !== socket.id) {
        // console.log("GOT PING FROM CLIENT 'CUSTOMER_FACING_CONNECTED'");
        setIsClientActive(true);
      }
    });

    socket.on("connect_error", (err) => handleSocketConnectionFail(err));
    socket.on("connect_failed", (err) => handleSocketConnectionFail(err));
    socket.on("disconnect", (err) => handleSocketConnectionFail(err));

    return () => {
      socket.off("CUSTOMER_FACING_CONNECTED");
      socket.off("CUSTOMER_FACING_DISCONNECTED");

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
        setIsClientActive(true);
      } catch (error) {
        console.log(error);
        setIsClientActive(false);
        // toast.error(error.response?.data?.message || error.message);
      }
    } catch (error) {
      setIsClientActive(false);
      toast.error("Couldn't re-establish the connection, Please refresh.");
      console.log(error);
    }
  };

  return (
    <div className="status_wrapper">
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
        <i class="bi bi-arrow-clockwise"></i>
      </Button>
      <CardText className="d-flex gap-2 mb-0 fs-6">
        Status of current device :
        {isCurrentDeviceConnected ? (
          <div className="fw-bolder">
            <i class="bi bi-wifi text-success fs-6"></i> Connected
          </div>
        ) : (
          <div className="fw-bolder">
            <i class="bi bi-wifi fs-5 text-danger"></i> Disconnected
          </div>
        )}
      </CardText>
      <CardText className="d-flex gap-2 fs-6">
        Status of client device :
        {isCurrentDeviceConnected ? (
          isClientActive ? (
            <div className="fw-bolder">
              <i class="bi bi-wifi text-success fs-6 fw-bold"></i> Connected
            </div>
          ) : (
            <div className="fw-bolder">
              <i class="bi bi-wifi fs-6 fw-bold text-danger"></i> Disconnected
            </div>
          )
        ) : (
          <div className="fw-bolder">
            <i class="bi bi-wifi fs-6 fw-bold text-warning"></i> Unknown
          </div>
        )}
      </CardText>
    </div>
  );
};

export default SocketAdminStatus;
