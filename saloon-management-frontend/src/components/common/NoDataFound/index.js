import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

const NoDataFound = () => {
  return (
    <div style={{ height: "75vh" }} className="mb-4">
      <Card className="border-0 h-100 w-100">
        <CardBody className="h-100 w-100 d-flex align-items-center flex-column gap-3 justify-content-center ">
          <i class="bi bi-exclamation-circle fs-1"></i>
          <CardText tag="h4">No data found.</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default NoDataFound;
