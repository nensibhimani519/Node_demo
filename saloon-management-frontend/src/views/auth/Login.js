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
import { EMAIL_REGEX } from "../../util";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginRequest } from "../../redux/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter valid email address")
        .min(3, "Email must be 3 characters or more")
        .max(60, "Email must be 60 characters or less")
        .required("Please enter the email address")
        .matches(EMAIL_REGEX, "Please enter valid email address"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .max(30, "Password must be 30 characters or less")
        .required("Please enter the password"),
    }),
    onSubmit: (values) => {
      dispatch(userLoginRequest(values, navigate, dispatch));
    },
  });
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
            Login
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
                <Col xl={12} md={12} sm={12} xs={12}>
                  <FormGroup>
                    <Label className="me-sm-2" for="exampleEmail">
                      Password
                    </Label>
                    <Input
                      name="password"
                      placeholder="Password"
                      type="password"
                      {...formik.getFieldProps("password")}
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
                <Col xl="5" xs="12">
                  <Link to="/request-reset-password">
                    Forgot your password ?
                  </Link>
                </Col>
                <Col sm={12} xs={12} className="d-flex justify-content-end">
                  <Button type="submit" className="btn-primary">
                    Login
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

export default Login;
