import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import PageHeader from "../../components/common/PageHeader";
import { getSaloonsRequest } from "../../redux/saloons/actions";
import { api, isActionPermitted, socket, SOCKET } from "../../util";

const ListSaloons = () => {
  const dispatch = useDispatch();
  const { saloons, count, loading } = useSelector((state) => state.saloons);
  const { permissions } = useSelector((state) => state.user);

  const [showPairModal, setShowPairModal] = useState(false);
  const [pairSaloonId, setpairSaloonId] = useState(null);
  const [pairingEvent, setpairingEvent] = useState(null);
  const [showDeviceCodeModal, setShowDeviceCodeModal] = useState(false);
  const [deviceCode, setDeviceCode] = useState(null);
  const [devicePairSuccess, setDevicePairSuccess] = useState(false);
  const [devicePairFail, setDevicePairFail] = useState(false);

  const [paginationConfig, setPaginationConfig] = useState({
    page: 1,
    limit: 10,
    // filter: {},
    // sort: "-id",
    // search: "",
  });

  useEffect(() => {
    if (isActionPermitted("services", "read", permissions)) {
      dispatch(getSaloonsRequest(paginationConfig));
    }
  }, [paginationConfig, permissions]);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET.LISTEN_DEVICE_PAIRED_CHANGE, (data) => {
      if (data && data.squareDeviceId && data.squareId) {
        setDevicePairSuccess(true);
        setShowDeviceCodeModal(false);
        setpairSaloonId(null);
      } else {
        setDevicePairFail(true);
        setShowDeviceCodeModal(false);
        dispatch(getSaloonsRequest(paginationConfig));
      }
    });
  }, []);

  const pairDevice = async (id) => {
    try {
      const response = await api.post("/square/createDeviceCode/" + id);
      if (response.status === 200) {
        if (isActionPermitted("services", "read", permissions)) {
          dispatch(getSaloonsRequest(paginationConfig));
        }
        // toast.success(response?.data?.data.message || response.message);
        if (response?.data?.data?.deviceCode) {
          // Paired event
          setDeviceCode(response?.data?.data?.deviceCode.code);
          setShowDeviceCodeModal(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <React.Fragment>
      <PageHeader
        title="Salons"
        addBtnUrl="/salons/add"
        shouldShowAddBtn={false}
      />
      <DataTable
        isPagination
        count={count}
        loading={loading}
        paginationConfig={paginationConfig}
        setPaginationConfig={setPaginationConfig}
        data={saloons}
        columns={[
          { Header: "Name", accessor: "Saloon.name" },
          { Header: "Location", accessor: "Saloon.location" },
          {
            Header: "Tax",
            accessor: "Saloon.tax",
            Cell: ({ row }) => {
              return !!row.original.Saloon.tax
                ? row.original.Saloon.tax + "%"
                : "-";
            },
          },
          {
            Header: "Device",
            accessor: "Saloon.device",
            Cell: ({ row }) => {
              return !!row.original.Saloon.device ? (
                <div className="d-flex gap-2 w-75 justify-content-between align-items-center">
                  <p className="mb-0">PAIRED</p> 
                  <Button
                    color="danger"
                    onClick={() => {
                      setpairSaloonId(row.original.Saloon.id);
                      setShowPairModal(true);
                      setpairingEvent("unpair");
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </div>
              ) : (
                <div className="d-flex gap-2 w-75 justify-content-between align-items-center">
                  <p className="mb-0">UNPAIRED</p>
                  <Button
                    onClick={() => {
                      setpairSaloonId(row.original.Saloon.id);
                      setShowPairModal(true);
                      setpairingEvent("pair");
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </div>
              );
            },
          },
        ]}
      />

      {showPairModal && (
        <ConfirmModal
          type={pairingEvent == "pair" ? "confirm" : "delete"}
          title={pairingEvent == "pair" ? "Pair device" : "Unpair device"}
          message={
            pairingEvent == "pair"
              ? "Are you sure you want to pair this device?"
              : "Are you sure you want to unpair this device?"
          }
          isOpen={showPairModal}
          setIsOpen={setShowPairModal}
          onOk={() => pairDevice(pairSaloonId)}
          onCancel={() => {
            setpairSaloonId(null);
            setShowPairModal(false);
          }}
        />
      )}

      {showDeviceCodeModal && (
        <Modal isOpen={showDeviceCodeModal} centered>
          <ModalHeader>Device Code Generated!</ModalHeader>
          <ModalBody>
            <div>
              Please Enter This Code To Your Square Terminal Device and Wait
              Until It Is Paired:
            </div>
            <div className="d-flex justify-content-center">
              <h3>{deviceCode}</h3>
            </div>
          </ModalBody>
        </Modal>
      )}

      {devicePairSuccess && (
        <Modal
          isOpen={devicePairSuccess}
          centered
          toggle={() => setDevicePairSuccess(false)}
        >
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>Your Device Is Paired Sucessfully.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setDevicePairSuccess(false)}>
              Okay
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {devicePairFail && (
        <Modal
          isOpen={devicePairFail}
          centered
          toggle={() => setDevicePairFail(false)}
        >
          <ModalHeader>Failed!</ModalHeader>
          <ModalBody>Your Device Is Not Paired.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setDevicePairFail(false)}>
              Okay
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ListSaloons;
