import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

const PageHeader = ({
  title = "",
  shouldShowAddBtn = true,
  addBtnUrl = "",
  addBtnText = <i className="bi bi-plus-circle"></i>,
  onAddBtnClick = () => {},
}) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardBody className="d-flex gap-2 text-align-center justify-content-between">
        <CardTitle tag="h4" className="mb-0 lh-base">
          {title}
        </CardTitle>

        <div>
          {shouldShowAddBtn && (
            <Button
              onClick={addBtnUrl ? () => navigate(addBtnUrl) : onAddBtnClick}
            >
              {addBtnText}
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default PageHeader;
