import React from "react";
import { Card, CardBody, Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div style={{ height: "75vh" }} className="mb-4">
      <Card className="border-0 h-100 w-100">
        <CardBody className="h-100 w-100 d-flex align-items-center justify-content-center ">
          <Spinner className="m-5" color="primary">
            Loading...
          </Spinner>
        </CardBody>
      </Card>
    </div>
  );
};

export default Loading;
