import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";

const AddCheckoutModal = ({
  isOpen,
  setIsOpen,
  onOk,
  data,
  setData,
  onCancel,
}) => {
  const toggle = () => setIsOpen((prev) => !prev);
  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: Yup.object().shape({
      price: Yup.number()
        .typeError("Please enter valid price")
        .moreThan(0, "Price can not be 0 or negative")
        .required("Please enter price"),
    }),
    onSubmit: (values) => {
      onOk();
      toggle();
    },
  });

  useEffect(() => {
    let temp = data;
    temp.servicePrice[0].price = formik.values.price;
    setData({ ...temp });
  }, [formik.values.price]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal size="md" centered isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-capitalize">
          Add {data?.name}
        </ModalHeader>
        <ModalBody>
          <Row>
            {data?.isVariablePricing && (
              <Col>
                <FormGroup>
                  <Input
                    name="price"
                    {...formik.getFieldProps("price")}
                    invalid={formik.touched.price && formik.errors.price}
                    min={0}
                    placeholder="Price"
                  />

                  <FormFeedback>
                    {formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : null}
                  </FormFeedback>
                </FormGroup>
              </Col>
            )}
          </Row>
        </ModalBody>
        <ModalFooter
          tag={"div"}
          className="transparant border-0 bg-light bg-light"
        >
          <Button
            onClick={onCancel || toggle}
            color="transprent"
            className="border"
            // type="button"
          >
            Cancel
          </Button>
          <Button
            color={"primary"}
            onClick={() => {
              formik.handleSubmit();
            }}
            className="text-capitalize"
          >
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default AddCheckoutModal;
