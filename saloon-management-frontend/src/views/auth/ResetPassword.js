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
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../../util";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .max(30, "Password must be 30 characters or less")
        .required("Please enter the password"),
      confirmPassword: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),
    onSubmit: (values) => {
      setIsRequestLoading(true);
      resetPassword(values);
    },
  });

  const resetPassword = async (payload) => {
    try {
      const response = await api.post("/auth/reset-password", {
        ...payload,
        token,
      });
      if (response.status === 200) {
        toast.success(
          "Your password has been reset successfully, Please login to continue."
        );
        return navigate("/login");
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
                      New password
                    </Label>
                    <Input
                      {...formik.getFieldProps("password")}
                      id="exampleEmail"
                      name="password"
                      placeholder="Enter password"
                      type="text"
                      invalid={
                        formik.touched.password && formik.errors.password
                      }
                    />

                    <FormFeedback>
                      {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null}
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col xl={12} md={12} sm={12} xs={12}>
                  <FormGroup>
                    <Label className="me-sm-2" for="exampleEmail">
                      Confirm Password
                    </Label>
                    <Input
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      {...formik.getFieldProps("confirmPassword")}
                      invalid={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                    <FormFeedback>
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
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
                    Set new Password
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

export default ResetPassword;
