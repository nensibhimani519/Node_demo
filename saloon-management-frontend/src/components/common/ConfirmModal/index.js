import styles from "./cm.module.scss";

import React from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const ConfirmModal = ({
  isOpen,
  setIsOpen,
  title,
  message,
  onOk,
  onCancel,
  type = "delete",
}) => {
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <Modal size="md" centered isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="text-capitalize">
        {title ? title : type}
      </ModalHeader>
      <ModalBody>
        {type === "delete"
          ? message || "Are you sure you want to delete this item ?"
          : message || "Are you sure you proceed?"}
      </ModalBody>
      <ModalFooter
        tag={"div"}
        className="transparant border-0 bg-light bg-light"
      >
        <Button
          onClick={onCancel || toggle}
          color="secondary"
          className="border"
        >
          Cancel
        </Button>
        <Button
          color={type === "delete" ? "danger" : "primary"}
          onClick={() => {
            onOk();
            toggle();
          }}
          className="text-capitalize"
          type="submit"
        >
          {type}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
