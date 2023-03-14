// import { useFormik } from "formik";
import React from "react";
// import { useEffect } from "react";
// import styles from "./UserInfo.module.scss";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   CardTitle,
//   Carousel,
//   CarouselItem,
//   Col,
//   Container,
//   Form,
//   FormFeedback,
//   FormGroup,
//   Input,
//   Label,
//   Row,
// } from "reactstrap";
// import * as Yup from "yup";
// import { EMAIL_REGEX, SOCKET } from "../../util";
// const { io } = require("socket.io-client");
// let socket = null;

const UserInfo = () => {
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [animating, setAnimating] = useState(false);
  // const [isPaymentDone, setIsPaymentDone] = useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     customerName: "",
  //     customerEmail: "",
  //     customerMobile: "",
  //   },
  //   validationSchema: Yup.object().shape({
  //     customerEmail: Yup.string()
  //       .email("Please enter valid email address")
  //       .min(3, "Email must be 3 characters or more")
  //       .max(60, "Email must be 60 characters or less")
  //       .matches(EMAIL_REGEX, "Please enter valid email address"),
  //     customerName: Yup.string(),
  //     customerMobile: Yup.string()
  //       .min(10, "Please enter valid phone number.")
  //       .max(12, "Please enter valid phone number."),
  //   }),
  //   onSubmit: (values) => {
  //     //   dispatch(userLoginRequest(values, navigate));
  //   },
  // });

  // useEffect(() => {
  //   // socket = io(BACK_SOCKET_URL);
  // }, []);

  // const items = [
  //   {
  //     id: 4,
  //     key: 4,
  //     content: (
  //       <div className={styles.payment_options}>
  //         <Button
  //           className={styles.payment_option}
  //           block
  //           color="primary"
  //           onClick={() => {
  //             socket.emit(SOCKET.EMIT_USER_DATA_CHANGE, {
  //               ...formik.values,
  //               SALOON_CONTROLLING: true,
  //               PAYMENT_METHOD: "CASH",
  //             });
  //             setIsPaymentDone(true);
  //           }}
  //         >
  //           Pay via Cash
  //         </Button>

  //         <Button block className={styles.payment_option} color="secondary">
  //           Pay via Card
  //         </Button>
  //       </div>
  //     ),
  //   },
  // ];

  // const next = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex + 1;
  //   if (items.length === nextIndex) return;
  //   setActiveIndex(nextIndex);
  // };

  // const previous = () => {
  //   if (animating) return;
  //   const nextIndex = activeIndex - 1;
  //   if (-1 === nextIndex) return;
  //   setActiveIndex(nextIndex);
  // };

  // const goToIndex = (newIndex) => {
  //   if (animating) return;
  //   setActiveIndex(newIndex);
  // };

  // const slides = items.map((item) => {
  //   return (
  //     <CarouselItem
  //       className={styles.corousel_item}
  //       tag="div"
  //       key={item.key}
  //       onExiting={() => setAnimating(true)}
  //       onExited={() => setAnimating(false)}
  //     >
  //       {item.content}
  //     </CarouselItem>
  //   );
  // });

  // useEffect(() => {
  //   socket.emit(SOCKET.EMIT_USER_DATA_CHANGE, formik.values);
  // }, [formik.values]);

  return (
    <React.Fragment>
      {/* <style>
        {`.custom-tag {
          max-width: 100%;
              height: 250px;
              background: #fafafa;
            }`}
      </style>
      {isPaymentDone ? (
        <Card>
          <CardBody
            className="d-flex justify-content-center align-items-center "
            style={{ height: "300px" }}
          >
            <h2>Thank you for visiting !</h2>
          </CardBody>
        </Card>
      ) : (
        <div className="d-flex justify-content-stretch align-items-center vh-100">
          <Card className="w-100 mb-5">
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  slide={false}
                  dir="right"
                  interval={false}
                  previous={previous}
                >
                  {slides}
                </Carousel>
              </Form>
            </CardBody>
            <CardFooter className="d-flex justify-content-end align-items-center gap-2">
              {activeIndex !== 0 && <Button onClick={previous}>Back</Button>}
              {activeIndex !== 3 && (
                <Button onClick={next} data-slide="next" color="primary">
                  Next
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )} */}
    </React.Fragment>
  );
};

export default UserInfo;
