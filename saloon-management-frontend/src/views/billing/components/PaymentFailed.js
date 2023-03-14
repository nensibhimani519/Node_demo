import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Modal,
} from "reactstrap";

const PaymentFailed = ({ isOpen, onOk = () => {} }) => {
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} centered>
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Something went wrong !</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText tag="h4">
              We couldn't process your payment, Please try again.
            </CardText>
          </CardBody>
          <CardFooter className="d-flex justify-content-end">
            <Button onClick={onOk}>Okay</Button>
          </CardFooter>
        </Card>
      </Modal>
    </React.Fragment>
  );
};

export default PaymentFailed;
