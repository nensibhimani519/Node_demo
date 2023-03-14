import { Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalFooter,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import PageHeader from "../../components/common/PageHeader";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  api,
  BILLING_DATA_KEY,
  PAYMENT_STATUS,
  roundOff,
  socket,
  SOCKET,
  SOCKET_PING_PONG_INTERVAL,
  USER_TYPES,
} from "../../util";
import { toast } from "react-toastify";
import { getCategoriesRequest } from "../../redux/actions";
import AddCheckoutModal from "./components/AddCheckoutModal";
import PaymentFailed from "./components/PaymentFailed";
import styles from "./billing.module.scss";
import moment from "moment";
import { setCustomerSocketId } from "../../redux/socket/actions";

const AddBill = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    items: [{ service: null, quantity: 1, price: 0 }],
  };
  const [employeesList, setEmployeesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [checkoutList, setCheckoutList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState("");
  const [checkoutService, setCheckoutService] = useState(null);
  const validationSchema = Yup.object().shape({
    // items: Yup.array().of(
    //   Yup.object().shape({
    //     service: Yup.object().typeError("Please select service"),
    //   })
    // ),
  });

  const changeBillingData = (billingData, reset = false, finished = false) => {
    if (reset) {
      localStorage.removeItem(BILLING_DATA_KEY);
      formik.setValues({
        userData: {},
        checkoutList: [],
        paymentType: "",
        employeeId: "",
        isPaymentComplete: false,
        isPaymentStarted: false,
        paymentStatus: PAYMENT_STATUS.ADDING_SERVICES,
        currency: "USD",
        tipAmount: 0,
        cashTaken: 0,
        cashReturned: 0,
        billId: null,
      });
      return;
    }
    if (finished) {
      localStorage.removeItem(BILLING_DATA_KEY);
      formik.setValues({
        userData: {},
        checkoutList: [],
        paymentType: "",
        employeeId: "",
        isPaymentComplete: true,
        isPaymentStarted: false,
        paymentStatus: PAYMENT_STATUS.SUCCESSFUL,
        currency: "USD",
        tipAmount: 0,
        cashTaken: 0,
        cashReturned: 0,
        billId: null,
      });
      return;
    }
    localStorage.setItem(BILLING_DATA_KEY, JSON.stringify({ ...billingData }));
      formik.setValues({
        ...formik.values,
        ...billingData,
      });
  };
  
  const calculateTax = () => {
    let itemTotal = 0;
    let tax = Number(user?.saloon?.tax) || 0;

    for (let i = 0; i < checkoutList.length; i++) {
      const checkoutItem = checkoutList[i];
      // const isTaxable = checkoutItem.isTaxable;
      const isTaxable = checkoutItem.servicePrice[0].isTaxable;
      let servicePrice = Number(checkoutItem.servicePrice[0].price);
      let sreviceAmounnt = isTaxable
        ? servicePrice + (servicePrice * tax) / 100
        : servicePrice;

      sreviceAmounnt = parseFloat(sreviceAmounnt).toFixed(2);

      itemTotal += sreviceAmounnt * Number(checkoutItem.quantity);
    }

    return roundOff(itemTotal);
  };

  const formik = useFormik({
    initialValues: {
      userData: {},
      checkoutList: [],
      paymentType: "",
      employeeId: "",
      isPaymentComplete: false,
      isPaymentStarted: false,
      paymentStatus: PAYMENT_STATUS.ADDING_SERVICES,
      currency: "USD",
      tipAmount: 0,
      cashTaken: 0,
      cashReturned: 0,
      billId: null,
      // ...JSON.parse(localStorage.getItem(BILLING_DATA_KEY))
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      cashTaken: Yup.number("Please enter valid amount").typeError("Please enter valid amount")
        .min(
          calculateTax(),
          "Recieved amount cannot be less than " + calculateTax()
        )
        .required("Please enter the amount taken from customer"),
      employeeId: Yup.number()
        .typeError("Please select employee")
        .required("Please select employee"),
      cashReturned: Yup.number(),
    }),
    onSubmit: (values) => {
      paymentApiCall();
    },
  });

  // ========================
  useEffect(() => {
    dispatch(getCategoriesRequest());
    fetchServices();
    fetchCustomerFacingStatus()
    fetchEmployees();
  }, []);

  const pingServer = () => {
    socket.emit("FROM_ADMIN", {from: USER_TYPES.CUSTOMER, timestamp: new Date()})
    socket.emit("PING", {from: USER_TYPES.CUSTOMER, timestamp: new Date()})
  }

  useEffect(() => {
    const instance = setInterval(() => {
      pingServer();
    }, SOCKET_PING_PONG_INTERVAL);

    socket.on("PONG", (data) => {
      console.log("CONNECTIN IS ALIVE", moment().format("DD MMM, YY hh:mm:ss"));
    });

    return () => {
      socket.off("PONG");
      clearInterval(instance);
    };
  }, []);

  // JOINING ROOM
  useEffect(() => {
    if (!socket) return;
    if (user?.role === USER_TYPES.SUPER_ADMIN) return;
    socket.emit(SOCKET.EMIT_JOIN, {
      roomId: user?.saloon?.roomId,
      from: {
        id: user.id,
        roleNumber: user.role,
        name: user.firstName,
        role: user.role === USER_TYPES.ADMIN ? "ADMIN" : "CUSTOMER",
      },
    });

    return () => {
      changeBillingData({
        userData: {},
        checkoutList: [],
        paymentType: "",
        employeeId: "",
        isPaymentComplete: false,
        isPaymentStarted: false,
        currency: "USD",
        tipAmount: 0,
        cashTaken: 0,
        cashReturned: 0,
        billId: null,
        paymentStatus: PAYMENT_STATUS.CANCELED,
      });
      socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
        userData: {},
        checkoutList: [],
        paymentType: "",
        employeeId: "",
        isPaymentComplete: false,
        isPaymentStarted: false,
        currency: "USD",
        tipAmount: 0,
        cashTaken: 0,
        cashReturned: 0,
        billId: null,
        paymentStatus: PAYMENT_STATUS.CANCELED,
      });
      socket.off(SOCKET.EMIT_JOIN);
    };
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;
    socket
      .off(SOCKET.RECEIVE_BILLING_DATA_CHANGE, (data) => {
        changeBillingData(data);
      })
      .on(SOCKET.RECEIVE_BILLING_DATA_CHANGE, (data) =>
        changeBillingData(data)
      );
    return () => {
      socket.off(SOCKET.RECEIVE_BILLING_DATA_CHANGE);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
      ...formik.values,
      checkoutList: checkoutList,
      paymentStatus: PAYMENT_STATUS.ADDING_SERVICES,
    });
    changeBillingData({
      ...formik.values,
      checkoutList: checkoutList,
      paymentStatus: PAYMENT_STATUS.ADDING_SERVICES,
    });
  }, [checkoutList]);

  const onSubmit = async (values) => {
    if (checkoutList.length === 0)
      return toast.error("Please select atleast 1 service");
    socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
      ...formik.values,
      checkoutList: checkoutList,
      paymentStatus: PAYMENT_STATUS.FINALIZED,
    });
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");
      setServicesList(response.data.data?.list);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchCustomerFacingStatus = async () => {
    try {
      const response = await api.get("/users/customer-facing-status");
      dispatch(setCustomerSocketId(response.data.data?.customerSocketId))
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployeesList(response.data.data.list);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const calculateTaxForService = (service) => {
    if (!service) return 0;
    // if (!service.isTaxable) return service?.servicePrice?.[0]?.price;
    if (!service?.servicePrice?.[0]?.isTaxable)
      return service?.servicePrice?.[0]?.price;
    let tax = Number(user.saloon.tax) || 0;
    return roundOff(
      Number(service.servicePrice[0].price) +
        (Number(service.servicePrice[0].price) * Number(tax)) / 100
    );
  };

  const cancelSquarePayment = async () => {
    try {
      // console.log('calling api',formik.values.billId);

      if (!formik.values.billId) return;

      const response = await api.post(
        `/square/cancelTerminalCheckout/${formik.values.billId}`
      );
      toast.success(response?.data?.message || response?.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const paymentApiCall = async () => {
    setIsLoading(true);
    try {
      const billingItems = [];
      let itemTotal = 0;
      let netTotal = 0;
      for (let index = 0; index < checkoutList.length; index++) {
        billingItems.push({
          quantity: checkoutList[index].quantity,
          price: checkoutList[index].servicePrice[0].price,
          salesTax: checkoutList[index]?.servicePrice[0]?.isTaxable
            ? user.saloon.tax
            : 0,
          serviceId: checkoutList[index].id,
          itemTotal:
            calculateTaxForService(checkoutList[index]) *
            checkoutList[index].quantity,
        });

        itemTotal +=
          calculateTaxForService(checkoutList[index]) *
          checkoutList[index].quantity;

        netTotal +=
          checkoutList[index].servicePrice[0].price *
          checkoutList[index].quantity;
      }

      const response = await api.post("/square/addBilling", {
        billingItems: billingItems,
        paymentType: "CASH",
        currency: "USD",
        totalAmount: roundOff(itemTotal),
        serviceTotal: roundOff(itemTotal),
        netTotal: roundOff(netTotal),
        ...formik.values,
        cashReturned: roundOff(formik.values.cashTaken - calculateTax()),
      });
      toast.success(response?.data?.message || response.message);
      socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
        ...formik.values,
        checkoutList: checkoutList,
        paymentStatus: PAYMENT_STATUS.PAYMENT_DONE,
      });
      // navigate("/billing");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <React.Fragment>
      <PageHeader title="Billing" shouldShowAddBtn={false} />
      <Card>
        <CardBody>
          <FormGroup className="mb-2">
            <Label className="me-sm-2" for="employeeId">
              Select Employee
            </Label>
            <Input
              onChange={formik.handleChange}
              {...formik.getFieldProps("employeeId")}
              id="exampleEmail"
              name="employeeId"
              placeholder="Cash taken from customer"
              type="select"
              value={formik.values.employeeId}
              invalid={formik.touched.employeeId && formik.errors.employeeId}
            >
              <option value={""}>Please select employee</option>
              {employeesList.map(({ Employee }) => (
                <option key={Employee?.id} value={Employee?.id}>
                  {/* {`${Employee?.firstName} ${Employee?.lastName} (${Employee?.employeeCode})`} */}
                  {`${Employee?.firstName} ${Employee?.lastName}`}
                </option>
              ))}
            </Input>

            <FormFeedback>
              {formik.touched.employeeId && formik.errors.employeeId
                ? formik.errors.employeeId
                : null}
            </FormFeedback>
          </FormGroup>
        </CardBody>
      </Card>
      {formik.values.employeeId && (
        <Formik
          validateOnChange
          validateOnMount
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ errors, values, touched, setValues }) => (
            <>
              <Card>
                <CardTitle tag="h5" className="border-bottom p-3 mb-0">
                  <i className="bi bi-hdd-stack me-2"> </i>
                  Generate new Bill
                </CardTitle>
                <CardBody>
                  <Form>
                    <Row>
                      <Col xl={3}>
                        <CardTitle tag="h5">Categories</CardTitle>
                        {categories.map((_) => (
                          <Button
                            block
                            onClick={() => setSelectedCategory(_.name)}
                            type="button"
                            color={
                              _.name === selectedCategory
                                ? "primary"
                                : "secondary"
                            }
                            key={_.id}
                            className="my-1"
                          >
                            {_.name}
                          </Button>
                        ))}
                      </Col>
                      <Col xl={6} className="border-start border-end">
                        <CardTitle tag="h5">Services </CardTitle>
                        <Row className={styles.overflow}>
                          {selectedCategory &&
                            servicesList
                              .filter(
                                (_) =>
                                  _.Category?.name.includes(selectedCategory) &&
                                  parseInt(_.servicePrice[0].price) !== 0
                              )
                              // .sort((a, b) => a.name.localeCompare(b.name))
                              .sort((a, b) => {
                                return (
                                  (a.order != null ? a.order : 999) -
                                  (b.order != null ? b.order : 999)
                                );
                              })
                              .map((_, index) => (
                                <Col xl={6} key={_.id}>
                                  <Button
                                    block
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (!_.isVariablePricing) {
                                        let checkout = checkoutList.findIndex(
                                          (cl) => _.id === cl.id
                                        );
                                        if (checkout === -1) {
                                          setCheckoutList((prev) => [
                                            ...prev,
                                            { ..._, quantity: 1 },
                                          ]);
                                        } else {
                                          let serviceList = checkoutList;
                                          serviceList[checkout] = {
                                            ...serviceList[checkout],
                                            quantity:
                                              serviceList[checkout].quantity +
                                              1,
                                          };
                                          setCheckoutList([...serviceList]);
                                        }
                                      } else {
                                        setShowCheckoutModal(true);
                                        let obj = {
                                          ..._,
                                          quantity: 1,
                                        };
                                        setCheckoutService({ ...obj });
                                      }
                                    }}
                                    type="button"
                                    key={_.id}
                                    className="my-1"
                                  >
                                    {_.name}
                                  </Button>
                                </Col>
                              ))}
                        </Row>
                      </Col>
                      <Col xl={3}>
                        <CardTitle tag="h5">Checkout</CardTitle>
                        {checkoutList.map((_, index) => (
                          <Button
                            block
                            type="button"
                            color="light"
                            key={_.id}
                            className="d-flex justify-content-between align-items-center my-1 fs-6 gap-1"
                          >
                            <div className="d-flex text-start">
                              {_.name} {`(${_.quantity})`} <br />
                              {/* {_.servicePrice[0].isTaxable
                                ? `$${roundOff(
                                    _.servicePrice[0].price * _.quantity
                                  )} + ${user.saloon.tax || 0}%  = $${
                                    roundOff(calculateTaxForService(_) * _.quantity)
                                  }`
                                : `$${roundOff(
                                    _.servicePrice[0].price * _.quantity
                                  )}`} */}
                              {`$${roundOff(
                                _.servicePrice[0].price * _.quantity
                              )}`}
                            </div>
                            <i
                              className="bi bi-x fs-4 fw-bolder"
                              onClick={() => {
                                let newArr = checkoutList.filter(
                                  (_, i) => i !== index
                                );
                                setCheckoutList([...newArr]);
                              }}
                            />
                          </Button>
                        ))}
                      </Col>
                    </Row>

                    <div className="d-flex flex-column justify-content-end align-items-end ">
                      <p className="mb-0">
                        Gross amount : $
                        {(function () {
                          let total = 0;
                          checkoutList.map(
                            (_) =>
                              (total +=
                                Number(_.servicePrice[0]?.price) *
                                Number(_.quantity))
                          );
                          return roundOff(total);
                        })()}
                      </p>
                      <p>
                        Tax amount : $
                        {(function () {
                          let total = 0;
                          checkoutList.map(
                            (_) =>
                              (total +=
                                Number(_.servicePrice[0]?.price) *
                                Number(_.quantity))
                          );
                          return roundOff(calculateTax() - total);
                        })()}
                      </p>
                      <CardTitle tag={"h5"}>
                        Net amount : ${calculateTax()}
                      </CardTitle>
                    </div>

                    <div className="card-footer border-top-0 d-flex gap-2 mt-4 justify-content-end">
                      <Button
                        color="transaprent"
                        className="border"
                        type="button"
                        onClick={() => navigate("/billing")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="btn btn-primary">
                        {[
                          PAYMENT_STATUS.FINALIZED,
                          PAYMENT_STATUS.PAYMENT_TYPE_CARD,
                          PAYMENT_STATUS.PAYMENT_TYPE_SELECTED,
                        ].includes(formik.values.paymentStatus) ? (
                          <Spinner size={"sm"} />
                        ) : (
                          "Finalize"
                        )}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </>
          )}
        </Formik>
      )}

      {formik.values.paymentStatus === PAYMENT_STATUS.PAYMENT_TYPE_SELECTED &&
        formik.values.paymentType === "CASH" && (
          <Modal
            centered
            isOpen={
              formik.values.paymentStatus ===
                PAYMENT_STATUS.PAYMENT_TYPE_SELECTED &&
              formik.values.paymentType === "CASH"
            }
          >
            <Card tag="form" onSubmit={formik.handleSubmit}>
              <CardHeader>
                <CardTitle tag="h4">Payment</CardTitle>
              </CardHeader>
              <CardBody>
                <h4>Total bill : $ {calculateTax()}</h4>
                <Row>
                  <Col xs={12}>
                    <FormGroup className="mb-2">
                      <Label className="me-sm-2" for="cashTaken">
                        Cash recieved
                      </Label>
                      <Input
                        {...formik.getFieldProps("cashTaken")}
                        id="exampleEmail"
                        name="cashTaken"
                        placeholder="Cash taken from customer"
                        invalid={
                          formik.touched.cashTaken && formik.errors.cashTaken
                        }
                      />

                      <FormFeedback>
                        {formik.touched.cashTaken && formik.errors.cashTaken
                          ? formik.errors.cashTaken
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  {!!formik.values.cashTaken && !formik.errors.cashTaken && (
                    <Col xs={12} className="mb-2">
                      <CardText tag="h5" className="fs-5 my-0 py-0">
                        Cash needs to be returned :
                        <span className="ms-1 fw-bold">
                          ${roundOff(formik.values.cashTaken - calculateTax())}
                        </span>
                      </CardText>
                    </Col>
                  )}
                </Row>
              </CardBody>
              <CardFooter className="d-flex justify-content-end align-items-center gap-2">
                <Button
                  color="secondary"
                  onClick={() => {
                    socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                      ...formik.values,
                      paymentStatus: PAYMENT_STATUS.FINALIZED,
                    });
                    formik.setFieldValue(
                      "paymentStatus",
                      PAYMENT_STATUS.FINALIZED
                    );
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} color="primary">
                  {isLoading ? <Spinner size={"sm"} /> : "Payment done"}
                </Button>
              </CardFooter>
            </Card>
          </Modal>
        )}
      {showCheckoutModal && (
        <AddCheckoutModal
          data={checkoutService}
          setData={setCheckoutService}
          isOpen={showCheckoutModal}
          setIsOpen={setShowCheckoutModal}
          onOk={() => {
            let serviceIndex = checkoutList.findLastIndex(
              (cl) => checkoutService.id === cl.id
            );
            if (serviceIndex === -1) {
              setCheckoutList((prev) => [
                ...prev,
                { ...checkoutService, quantity: 1 },
              ]);
            } else {
              if (
                checkoutService.isVariablePricing &&
                checkoutList[serviceIndex].servicePrice[0]?.price ===
                  checkoutService.servicePrice[0]?.price
              ) {
                let serviceList = checkoutList;
                serviceList[serviceIndex] = {
                  ...serviceList[serviceIndex],
                  quantity: serviceList[serviceIndex].quantity + 1,
                };
                setCheckoutList([...serviceList]);
              } else {
                setCheckoutList((prev) => [
                  ...prev,
                  { ...checkoutService, quantity: 1 },
                ]);
              }
            }
            setCheckoutService(null);
          }}
        />
      )}
      {formik.values.paymentStatus === PAYMENT_STATUS.PAYMENT_DONE && (
        <Modal
          size="lg"
          centered
          isOpen={formik.values.paymentStatus === PAYMENT_STATUS.PAYMENT_DONE}
        >
          <React.Fragment>
            <CardHeader>
              <CardTitle tag="h4">Summary - Transaction Approved</CardTitle>
            </CardHeader>
            <div className="d-flex justify-content-center">
              <div className="w-100">
                <CardBody>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Service name</th>
                        {/* <th>Base Price</th> */}
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formik?.values?.checkoutList.length > 0 &&
                        formik?.values?.checkoutList.map((service, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{service.name}</td>
                            <td>(x {service.quantity})</td>
                            <td>
                              $
                              {roundOff(
                                Number(service?.servicePrice?.[0]?.price) *
                                  Number(service.quantity)
                              )}
                            </td>
                            {/* <td>
                              {service?.servicePrice?.[0]?.isTaxable &&
                                ` + ${user.saloon.tax}%`}{" "}
                              = $
                              {roundOff(
                                calculateTaxForService(service) *
                                  service.quantity
                              )}
                            </td> */}
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="text-end " colSpan={5}>
                          <p className="mb-0">
                            Gross amount : $
                            {(function () {
                              let total = 0;
                              formik.values.checkoutList.map(
                                (_) =>
                                  (total +=
                                    Number(_.servicePrice[0]?.price) *
                                    Number(_.quantity))
                              );
                              return roundOff(total);
                            })()}
                          </p>
                          <p className="mb-2">
                            Tax amount : $
                            {(function () {
                              let total = 0;
                              formik.values.checkoutList.map(
                                (_) =>
                                  (total +=
                                    Number(_.servicePrice[0]?.price) *
                                    Number(_.quantity))
                              );
                              return roundOff(calculateTax() - total);
                            })()}
                          </p>
                          <h5>Net amount : ${calculateTax()}</h5>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </CardBody>
              </div>
            </div>
          </React.Fragment>
          <ModalFooter>
            <Button
              type="button"
              onClick={() => {
                socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                  ...formik.values,
                  paymentStatus: PAYMENT_STATUS.SUCCESSFUL,
                });
                changeBillingData(
                  {
                    userData: {},
                    checkoutList: [],
                    paymentType: "",
                    employeeId: "",
                    isPaymentComplete: true,
                    isPaymentStarted: false,
                    paymentStatus: PAYMENT_STATUS.SUCCESSFUL,
                    currency: "USD",
                    tipAmount: 0,
                    cashTaken: 0,
                    cashReturned: 0,
                    billId: null,
                  },
                  false,
                  true
                );
                navigate("/billing");
              }}
            >
              Finish
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {formik.values.paymentStatus === PAYMENT_STATUS.SQUARE_PAYMENT_STARTED &&
        formik.values.billId && (
          <Modal
            size="lg"
            centered
            isOpen={
              formik.values.paymentStatus ===
                PAYMENT_STATUS.SQUARE_PAYMENT_STARTED && formik.values.billId
            }
          >
            {/* <Card> */}
            <CardHeader>
              <CardTitle tag={"h5"}>Payment in progress</CardTitle>
            </CardHeader>
            <CardBody>
              <h4>Customer is paying via Card, please standby</h4>
            </CardBody>
            {/* </Card> */}
            <ModalFooter>
              <Button
                type="button"
                color="danger"
                onClick={() => {
                  // formik.setFieldValue(
                  //   "paymentStatus",
                  //   PAYMENT_STATUS.REQUEST_CANCEL_SQUARE_PAYMENT
                  // );
                  // console.log('cancelling from here',formik.values);
                  // socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                  //   ...formik.values,
                  //   paymentStatus: PAYMENT_STATUS.REQUEST_CANCEL_SQUARE_PAYMENT,
                  // });
                  cancelSquarePayment();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}

      {formik.values.paymentStatus === PAYMENT_STATUS.FAILED && (
        <PaymentFailed
          onOk={() => {
            socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
              ...formik.values,
              // checkoutList: [],
              paymentStatus: PAYMENT_STATUS.FINALIZED,
            });
          }}
          isOpen={formik.values.paymentStatus === PAYMENT_STATUS.FAILED}
        />
      )}
    </React.Fragment>
  );
};

export default AddBill;
