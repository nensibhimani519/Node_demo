import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import SocketCustomerStatus from "../../components/common/SocketCustomerStatus";
import {
  api,
  BILLING_DATA_KEY,
  PAYMENT_STATUS,
  roundOff,
  socket,
  SOCKET,
  SOCKET_PING_PONG_INTERVAL,
  SQUARE_PAYMENT_STATUS,
  USER_TYPES,
} from "../../util";
import styles from "./index.module.scss";

// 1. NOT STARTED
// 2. ADDING SERVICES
// 3. FINALIZE
// 4. PAYMENT TYPE CASH / PAYMENT TYPE CARD
// 5. CANCELLED
// 6. PAYMENT DONE
const REDIRECT_TIMEOUT = 4 * 1000;
const UserScreen = () => {
  const user = useSelector((state) => state.user);
  const [list, setList] = useState([]);
  const [isSquarePaymentDone, setIsSquarePaymentDone] = useState(null);
  const [toogle, setToggle] = useState(false);
  const [billingData, setBillingData] = useState({
    checkoutList: [],
    paymentType: "",

    isPaymentComplete: false,
    isPaymentStarted: false,
    paymentStatus: PAYMENT_STATUS.NOT_STARTED,
    billId: null,
    // ...JSON.parse(localStorage.getItem(BILLING_DATA_KEY))
  });

  const [savedData, setSavedData] = useState({
    checkoutList: [],
    paymentType: "",

    isPaymentComplete: false,
    isPaymentStarted: false,
    paymentStatus: PAYMENT_STATUS.NOT_STARTED,
    billId: null,
  });
  const navigate = useNavigate();

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

    socket.on("disconnected", (data) => {
      console.log("socket got disconnected on",  moment().format("DD MMM, YY hh:mm:ss"), "because of ", data);
    });    

    return () => {
      socket.off(SOCKET.EMIT_JOIN);
    };
  }, []);

const pingServer = () => {
  socket.emit("FROM_CUSTOMER", {from: USER_TYPES.CUSTOMER, timestamp: new Date()})
  socket.emit("PING", {from: USER_TYPES.CUSTOMER, timestamp: new Date()})
}


useEffect(() => {
  const instance = setInterval(() => {
    pingServer()
  }, SOCKET_PING_PONG_INTERVAL)

  
  socket.on("PONG", (data) => {
      console.log("CONNECTIN IS ALIVE",  moment().format("DD MMM, YY hh:mm:ss"));
  });

  return () => {
    socket.off("PONG");
    clearInterval(instance)
  };
},[])

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET.RECEIVE_BILLING_DATA_CHANGE, (data) => {
      if (data.isPaymentComplete) {
        return navigate("/user");
      }
      // console.log('getting data',data);
      // if (data.paymentStatus === PAYMENT_STATUS.REQUEST_CANCEL_SQUARE_PAYMENT) {
      //   cancelSquarePayment();
      // }
      // setBillingData({ ...data });
      changeBillingData({...data})

    });

    return () => {
      socket.off(SOCKET.RECEIVE_BILLING_DATA_CHANGE);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (!billingData?.checkoutList?.length) return;
    if (isSquarePaymentDone === SQUARE_PAYMENT_STATUS.COMPLETED) {
      socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
        ...billingData,
        paymentStatus: PAYMENT_STATUS.PAYMENT_DONE,
      });
      setIsSquarePaymentDone(null);
    } else if (isSquarePaymentDone === SQUARE_PAYMENT_STATUS.CANCELED) {
      socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
        ...billingData,
        paymentStatus: PAYMENT_STATUS.FAILED,
      });
    }
    setIsSquarePaymentDone(null);

    return () => {
      socket.off(SOCKET.EMIT_BILLING_DATA_CHANGE);
    };
  }, [isSquarePaymentDone, billingData]);

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET.LISTEN_PAYMENT_STATUS_CHANGE, (data) => {
      if (data.paymentStatus === SQUARE_PAYMENT_STATUS.CANCELED) {
        setIsSquarePaymentDone(SQUARE_PAYMENT_STATUS.CANCELED);
      } else if (data.paymentStatus === SQUARE_PAYMENT_STATUS.COMPLETED) {
        setIsSquarePaymentDone(SQUARE_PAYMENT_STATUS.COMPLETED);
      }
    });

    return () => {
      socket.off(SOCKET.LISTEN_PAYMENT_STATUS_CHANGE);
    };
  }, []);

  const changeBillingData = (billingData, reset = false) => {
    if(reset) {
      localStorage.removeItem(BILLING_DATA_KEY)
      setBillingData({
        checkoutList: [],
        paymentType: "",
    
        isPaymentComplete: false,
        isPaymentStarted: false,
        paymentStatus: PAYMENT_STATUS.NOT_STARTED,
        billId: null,
        ...JSON.parse(localStorage.getItem(BILLING_DATA_KEY))
      });
    }
    localStorage.setItem(BILLING_DATA_KEY, JSON.stringify({ ...billingData }))
    setBillingData({ ...billingData });
  };

  const getComponent = (status) => {
    switch (status) {
      case PAYMENT_STATUS.NOT_STARTED:
      case PAYMENT_STATUS.CANCELED:
      case PAYMENT_STATUS.SUCCESSFUL:
        return <WelcomeCard />;

      case PAYMENT_STATUS.ADDING_SERVICES:
        return <ListServices billingData={billingData} />;

      case PAYMENT_STATUS.PAYMENT_TYPE_CARD:
        return (
          <CharityMessage
            billingData={billingData}
            setSavedData={setSavedData}
          />
        );

      case PAYMENT_STATUS.PAYMENT_TYPE_SELECTED:
        return billingData.paymentType === "SQUARE" ? (
          <CardPayment
            billingData={billingData}
            setBillingData={setBillingData}
            list={list}
            toogle={toogle}
            setToggle={setToggle}
            setList={setList}
          />
        ) : (
          <ListServices billingData={billingData} />
        );

      case PAYMENT_STATUS.SQUARE_PAYMENT_STARTED:
        return (
          <CardPayment
            billingData={billingData}
            setBillingData={setBillingData}
            list={list}
            setList={setList}
          />
        );

      case PAYMENT_STATUS.PAYMENT_DONE:
        return (
          <Summery
            billingData={billingData}
            setBillingData={setBillingData}
            savedData={savedData}
          />
        );
      case PAYMENT_STATUS.FINALIZED:
        return <SelectPaymentMethod billingData={billingData} />;
      case PAYMENT_STATUS.FAILED:
        return (
          <PaymentFailed
            billingData={billingData}
            setBillingData={setBillingData}
          />
        );

      default:
        return <LoadingCard />;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/square/billing-state/" + user?.saloon?.roomId);
      const { billingObject } = response?.data?.data
      if(billingObject) {
        setBillingData(billingObject);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.customer_facing}>
        <Row>
          <Col xl={{ offset: 8, size: 4 }} lg={{ offset: 7, size: 5 }} md={{ offset: 6, size: 6 }} sm={{ offset: 4, size: 8 }} xs={{ offset: 0, size: 12 }}>
            {/* <div className="w-30"> */}
            <SocketCustomerStatus />
            {/* </div> */}
          </Col>
        </Row>
        <div className={styles.content_wrapper}>
          {getComponent(billingData.paymentStatus)}
        </div>
      </div>
    </React.Fragment>
  );
};

const WelcomeCard = () => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={12} md={8} lg={8} xl={6}>
        <Card className={styles.welcome_card}>
          <CardBody className={styles.welcome_body}>
            <CardText tag="p" className=" text-center mb-1">
              Welcome to
            </CardText>
            <CardText
              tag="h1"
              className=" text-center text-uppercase fw-bolder"
            >
              OUR SALON
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const PaymentFailed = ({ setBillingData, billingData }) => {
  useEffect(() => {
    const instance = setTimeout(() => {
      setBillingData({
        ...billingData,
        paymentStatus: PAYMENT_STATUS.FINALIZED,
      });
    }, REDIRECT_TIMEOUT);

    return () => {
      clearTimeout(instance);
    };
  }, []);

  return (
    <React.Fragment>
      <CardTitle tag="h4" className="text-center text-white mb-4">
        Something went wrong !
      </CardTitle>
      <Card className={styles.welcome_card}>
        <CardBody className={styles.welcome_body}>
          <CardText tag="h4">
            We couldn't process your payment, Please try again.
          </CardText>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

const CardPayment = ({
  billingData,
  setBillingData,

}) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const paymentApiCall = async () => {
      try {
        const billingItems = [];
        let itemTotal = 0;
        let netTotal = 0;

        for (let index = 0; index < billingData.checkoutList.length; index++) {
          billingItems.push({
            quantity: billingData.checkoutList[index].quantity,
            price:
              Number(
                billingData.checkoutList[index]?.servicePrice?.[0]?.price ||
                  billingData.checkoutList[index].price
              ) || 0,
            salesTax: billingData.checkoutList[index]?.servicePrice[0]
              ?.isTaxable
              ? Number(user.saloon.tax)
              : 0,
            serviceId: billingData.checkoutList[index].id,
            itemTotal:
              calculateTaxForService(billingData.checkoutList[index]) *
              billingData.checkoutList[index].quantity,
          });
          itemTotal +=
          calculateTaxForService(billingData.checkoutList[index]) *
          billingData.checkoutList[index].quantity;
          
          netTotal += (Number(
            billingData.checkoutList[index]?.servicePrice?.[0]?.price ||
            billingData.checkoutList[index].price
            ) || 0) * 
            billingData.checkoutList[index].quantity;
            
            // console.log('getting billingdata',billingData,netTotal);
          }

        const response = await api.post("/square/addBilling", {
          ...billingData,
          totalAmount: roundOff(itemTotal),
          billingItems: billingItems,
          serviceTotal: roundOff(itemTotal),
          netTotal : roundOff(netTotal)
          // deviceID: "9fa747a2-25ff-48ee-b078-04381f7c828f",
        });
        // console.log('got billId',response?.data.data.billId);
        setBillingData({
          ...billingData,
          checkoutList: billingData.checkoutList,
          billId: response?.data.data.billId,
          paymentStatus: PAYMENT_STATUS.SQUARE_PAYMENT_STARTED,
        });
        socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
          ...billingData,
          billId: response?.data.data.billId
        });
      } catch (error) {
        socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
          ...billingData,
          paymentStatus: PAYMENT_STATUS.FAILED,
        });
        console.log(error);
        toast.error(error.response?.data?.message);
      }
    };

    paymentApiCall();
  }, []);

  const calculateTaxForService = (service) => {
    const price = service.servicePrice?.[0]?.price || service?.price;
    if (!service.servicePrice?.[0]?.isTaxable) return price;

    let tax = Number(user.saloon.tax) || 0;
    return roundOff(Number(price) + (Number(price) * Number(tax)) / 100);
  };

  return (
    <Card className={styles.welcome_card}>
      <CardHeader>
        <CardTitle tag="h4">Your payment is in progress</CardTitle>
      </CardHeader>
      <CardBody className={styles.welcome_body}>
        <CardText tag="h2"></CardText>
        <Spinner />
      </CardBody>
    </Card>
  );
};

const CharityMessage = ({ billingData, setBillingData, setSavedData }) => {
  return (
    <React.Fragment>
      <CardTitle tag="h4" className="text-center mb-4 text-white">
        Help others by choosing cash !
      </CardTitle>
      <Card className={styles.welcome_card}>
        <CardBody className={styles.welcome_body}>
          <CardText tag="h3" className="text-center">
            
          We will donate 3.5% of this Sale to Autism Society of America. A cause that is very close to our heart.
          </CardText>
        </CardBody>
        <CardFooter className="d-flex gap-4 justify-content-end align-items-center">
          <Button
            onClick={() => {
              socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                ...billingData,
                paymentType: "CASH",
                paymentStatus: PAYMENT_STATUS.PAYMENT_TYPE_SELECTED,
              });
            }}
            className="p-4 fs-5 fw-bolder"
            color="primary"
          >
            Proceed with Cash
          </Button>
          <Button
            className="p-4"
            onClick={() => {
              setSavedData(billingData);

              socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                ...billingData,
                checkoutList: billingData.checkoutList,
                paymentType: "SQUARE",
                paymentStatus: PAYMENT_STATUS.SQUARE_PAYMENT_STARTED,
              });
            }}
          >
            Proceed with Card
          </Button>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

const LoadingCard = () => {
  return (
    <Card className={`${styles.card} ${styles.welcome_body}`}>
      <Spinner />
    </Card>
  );
};

const SelectPaymentMethod = ({ billingData }) => {
  return (
    <React.Fragment>
      <CardTitle tag="h4" className="text-center text-white mb-4">
        How would you like to pay ?
      </CardTitle>

      <Card className={styles.card}>
        <CardBody>
          <Row className={styles.payment_method}>
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              className="card-body d-flex flex-column justify-content-center"
            >
              <Button
                className={`${styles.payment_option} ${styles.cash_btn}`}
                block
                color="primary"
                onClick={() => {
                  socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                    ...billingData,
                    paymentType: "CASH",
                    paymentStatus: PAYMENT_STATUS.PAYMENT_TYPE_SELECTED,
                  });
                }}
              >
                <p className={`mb-0 fw-bolder method-title ${styles.method_title}`}>Pay via Cash</p>
                <div className={`${styles.small_text}`}>

                <p className="mb-0">Preferred payment method</p>
                <p className="mb-0">
                  Cash payment saves us 3.5% in credit card processing fees.
                </p>
                </div>
              </Button>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Button
                block
                onClick={() => {
                  socket.emit(SOCKET.EMIT_BILLING_DATA_CHANGE, {
                    ...billingData,
                    paymentType: "SQUARE",
                    paymentStatus: PAYMENT_STATUS.PAYMENT_TYPE_CARD,
                  });
                }}
                className={styles.payment_option}
                color="secondary"
              >
                <p className={`mb-0 fw-bolder method-title ${styles.method_title}`}>Pay via Card</p>
                
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

const ListServices = ({ billingData }) => {
  const user = useSelector((state) => state.user);

  const calculateTaxForService = (service) => {
    if (!service.servicePrice[0].isTaxable)
      return service.servicePrice[0].price;
    let tax = Number(user.saloon.tax) || 0;
    return roundOff(
      Number(service.servicePrice[0].price) +
        (Number(service.servicePrice[0].price) * Number(tax)) / 100
    );
  };

  const calculateTax = () => {
    let itemTotal = 0;
    let tax = Number(user?.saloon?.tax) || 0;

    for (let i = 0; i < billingData.checkoutList.length; i++) {
      const checkoutItem = billingData.checkoutList[i];
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
  return (
    <React.Fragment>
      <CardTitle tag="h4" className="text-center text-white mb-4">
        {billingData.paymentStatus === PAYMENT_STATUS.PAYMENT_TYPE_SELECTED
          ? "We are finalizing your receipt"
          : "We are generating your receipt"}
      </CardTitle>
      <Card className={styles.list_service_container}>
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <CardBody>
              <Table bordered className={styles.rwd_table}>
                <thead className={styles.table_header}>
                  <tr className={styles.theader}>
                    <th>#</th>
                    <th>Services / Products</th>
                    {/* <th>Base Price</th> */}
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.checkoutList.map((service, index) => (
                    <tr key={service.id}>
                      <td data-th="#">{index + 1}</td>
                      <td data-th="Service Name">{service.name}</td>
                      <td data-th="Quantity">(x {service.quantity})</td>
                      <td data-th="Price">
                        ${roundOff(Number(service.servicePrice[0]?.price) * Number(service.quantity) )}
                      </td>
                      {/* <td>
                        {service.servicePrice[0]?.isTaxable &&
                          ` + ${user.saloon.tax}%`}{" "}
                        = $
                        {roundOff(
                          calculateTaxForService(service) * service.quantity
                        )}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
                {billingData.checkoutList.length !== 0 && (
                  <tfoot>
                    <tr>
                      <td className="text-end" colSpan={5}>
                        <CardTitle tag={"p"} className="mb-0">
                          Gross amount : $
                          {(function () {
                            let total = 0;
                            billingData.checkoutList.map(
                              (_) =>
                                (total +=
                                  Number(_.servicePrice[0]?.price) *
                                  Number(_.quantity))
                            );
                            return roundOff(total);
                          })()}
                        </CardTitle>
                        <CardTitle tag={"p"} className="mb-2">
                          Tax amount : $
                          {(function () {
                            let total = 0;
                            billingData.checkoutList.map(
                              (_) =>
                                (total +=
                                  Number(_.servicePrice[0]?.price) *
                                  Number(_.quantity))
                            );
                            return roundOff(calculateTax() - total);
                          })()}
                        </CardTitle>
                        <h5>Net amount : ${calculateTax()}</h5>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </Table>
            </CardBody>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

const Summery = ({ billingData, setBillingData, savedData }) => {
  const user = useSelector((state) => state.user);

  const calculateTax = () => {
    let itemTotal = 0;
    let tax = Number(user?.saloon?.tax) || 0;

    for (let i = 0; i < billingData.checkoutList.length; i++) {
      const checkoutItem = billingData.checkoutList[i];
      // const isTaxable = checkoutItem.isTaxable;
      const isTaxable = checkoutItem.servicePrice[0].isTaxable;
      const price = checkoutItem.servicePrice[0].price;
      let servicePrice = Number(checkoutItem.servicePrice[0].price);

      let sreviceAmounnt = isTaxable
        ? servicePrice + (servicePrice * tax) / 100
        : servicePrice;

      sreviceAmounnt = parseFloat(sreviceAmounnt).toFixed(2);

      itemTotal += sreviceAmounnt * Number(checkoutItem.quantity);
    }

    return roundOff(itemTotal);
  };

  useEffect(() => {
    const instance = setTimeout(() => {
      setBillingData({
        ...billingData,
        paymentStatus: PAYMENT_STATUS.NOT_STARTED,
      });
    }, REDIRECT_TIMEOUT);

    return () => {
      clearTimeout(instance);
    };
  }, []);

  return (
    <React.Fragment>
      <CardTitle tag="h4" className="text-center text-white mb-4">
        Here's your invoice, Thank you !
      </CardTitle>
      <Card>
        <div className="d-flex justify-content-center">
          <div className="w-100">
            <CardBody>
              <Table bordered className={styles.rwd_table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Services / Products</th>
                    {/* <th>Base Price</th> */}
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.checkoutList.map((service, index) => (
                    <tr key={service.id}>
                      <th data-th="#" scope="row">{index + 1}</th>
                      <td data-th="Services / Products">{service.name}</td>
                      <td data-th="Quantity">(x {service.quantity})</td>
                      <td data-th="Base Price">{roundOff(Number(service.servicePrice[0]?.price) * Number(service.quantity))}</td>
                      {/* <td data-th="Price">
                        {service.servicePrice[0]?.isTaxable &&
                          ` + ${user.saloon.tax}%`}{" "}
                        ={" "}
                        {roundOff(
                          calculateTaxForService(service) * service.quantity
                        )}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="text-end" colSpan={5}>
                      <p className="mb-0">
                        Gross amount : $
                        {(function () {
                          let total = 0;
                          billingData.checkoutList.map(
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
                          billingData.checkoutList.map(
                            (_) =>
                              (total +=
                                Number(_.servicePrice[0]?.price) *
                                Number(_.quantity))
                          );
                          return roundOff(calculateTax() - total);
                        })()}
                      </p>
                      <h5>Net amount : {calculateTax()}</h5>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </CardBody>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};
export default UserScreen;
