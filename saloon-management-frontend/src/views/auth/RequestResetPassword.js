import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../util";
import { toast } from "react-toastify";
import { EMAIL_REGEX } from "../../util";

const RequestResetPassword = () => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter valid email address")
        .min(3, "Email must be 3 characters or more")
        .max(60, "Email must be 60 characters or less")
        .required("Please enter the email address")
        .matches(EMAIL_REGEX, "Please enter valid email address"),
    }),
    onSubmit: (values) => {
      setIsRequestLoading(true);
      requestForResetPassword(values);
    },
  });

  const requestForResetPassword = async (payload) => {
    try {
      const response = await api.post("/auth/requestResetPassword", payload);
      if (response.status === 200) {
        formik.resetForm();
        navigate("/login");
        return toast.success(response?.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsRequestLoading(false);
    }
  };

  return (
    <Row>
      <Col
        className="mt-5"
        xl={{
          size: "6",
          offset: "3",
        }}
      >
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Set new password
          </CardTitle>
          <CardBody>
            <Form inline onSubmit={formik.handleSubmit}>
              <Row>
                <Col xl={12} md={12} sm={12} xs={12}>
                  <FormGroup className="mb-2">
                    <Label className="me-sm-2" for="exampleEmail">
                      Email Address
                    </Label>
                    <Input
                      {...formik.getFieldProps("email")}
                      id="exampleEmail"
                      name="email"
                      placeholder="Enter email address"
                      type="email"
                      invalid={formik.touched.email && formik.errors.email}
                    />

                    <FormFeedback>
                      {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null}
                    </FormFeedback>
                  </FormGroup>
                </Col>

                <Col sm={12} xs={12} className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    className="btn-primary"
                    disabled={isRequestLoading}
                  >
                    Send link
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default RequestResetPassword;
