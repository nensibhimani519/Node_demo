import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardText, CardTitle, Col, Input, Label, Modal, Row } from "reactstrap";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader";
import { getBillsRequest } from "../../redux/actions";
import { getSaloonsRequest } from "../../redux/saloons/actions";
import { getServicesRequest } from "../../redux/services/actions";
import { setCustomerSocketId } from "../../redux/socket/actions";
import { api, getDate, getFormatDate, isActionPermitted, roundOff, USER_TYPES } from "../../util";
import styles from "./billing.module.scss";
import BillingInfoModal from "./components/BillingInfoModal"

const ListBillings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bills, count, loading } = useSelector((state) => state.bills);
  const { saloons } = useSelector((state) => state.saloons);
  const user = useSelector((state) => state.user);
  const { permissions } = useSelector((state) => state.user);
  const [deleteId, setDeleteId] = useState(null);
  const [tableState, setTableState] = useState({ hiddenColumns: ["actions"] });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paginationConfig, setPaginationConfig] = useState({
    page: 1,
    limit: 10,
    filter: {
      from: moment().startOf("day").toISOString(),
      to: moment().endOf("day").toISOString(),
      location: "",
      employee: ""
    },
    sort: "-id",
    // search: "",
  });
  const [showBillingModal,setShowBillingModal] = useState(false);
  const [showBillId,setShowBillId] = useState(-1);
  const [employeesList, setEmployeesList] = useState([]);
  const [data, setData] = useState({
    cash: {
      orderCount: 0,
      net: "0",
      tax: "0",
      gross: "0",
      tip: "0"
    },
    square: {
      orderCount: 0,
      net: 0,
      tax: "0",
      gross: 0,
      tip: "0"
    },
  });

  useEffect(() => {
    if (isActionPermitted("services", "read", permissions)) {
      dispatch(getBillsRequest(paginationConfig));
    }
    if (user.role === USER_TYPES.SUPER_ADMIN) {
      dispatch(getSaloonsRequest());
    }
    if (user.role !== USER_TYPES.SUPER_ADMIN) {
      setTableState({
        hiddenColumns: ["Saloon.name", "actions"],
      });
    }
    if (user.role === USER_TYPES.ADMIN) {
      fetchData();
      fetchCustomerFacingStatus()
    }
  }, [paginationConfig, permissions]);

  useEffect(() => {
    if (user.role === USER_TYPES.ADMIN) {
      fetchEmployees();
    }
  }, []);

  const deleteService = async (id) => {
    try {
      const response = await api.delete("/services/" + id);
      if (response.status === 200) {
        if (isActionPermitted("services", "read", permissions)) {
          dispatch(getServicesRequest(paginationConfig));
        }
        toast.success(response?.data?.message || response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onDateRangeChange = ({ target }) => {
    const { name, value } = target;
    let pc = paginationConfig;
    if (name === "from") {
      pc.filter[name] = moment(value).startOf("day").toISOString();
    } else {
      pc.filter[name] = moment(value).endOf("day").toISOString();
    }
    setPaginationConfig({ ...pc, page: 1, limit: 10 });
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      // console.log('getting employees',response.data.data.list);
      setEmployeesList(response.data.data.list);
    } catch (error) {
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
  const fetchData = async () => {
    try {
      const response = await api.post("/dashboard", {
        employee : paginationConfig.filter.employee,
        date : {
          from : paginationConfig.filter.from,
          to : paginationConfig.filter.to
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
    }
  };

  return (
    <React.Fragment>
      <PageHeader
        title="Billing"
        shouldShowAddBtn={user.role !== USER_TYPES.SUPER_ADMIN}
        addBtnUrl="/billing/add"
        addBtnText={
          <div className="d-flex gap-2 fs-5">
            Create a new bill <i className="bi bi-plus-circle"></i>
          </div>
        }
      />
      <Card>
        <CardBody>
          <Row className="gy-3 gx-3">
            <Col xl={4} md={4} sm={6} xs={6}>
              <Label>From</Label>
              <Input
                name="from"
                onChange={onDateRangeChange}
                value={moment(paginationConfig.filter.from).format(
                  "YYYY-MM-DD"
                )}
                max={moment().format(
                  "YYYY-MM-DD"
                )}
                disabled={user.role === USER_TYPES.ADMIN}
                type="date"
              />
            </Col>
            <Col xl={4} md={4} sm={6} xs={6}>
              <Label>To</Label>
              <Input
                disabled={user.role === USER_TYPES.ADMIN}
                min={moment(paginationConfig.filter.from).format(
                  "YYYY-MM-DD"
                )}
                onChange={onDateRangeChange}
                name="to"
                value={moment(paginationConfig.filter.to).format("YYYY-MM-DD")}
                type="date"
              />
            </Col>
            {user.role === USER_TYPES.SUPER_ADMIN && (
              <Col xl={4} md={4} sm={12} xs={12}>
                <Label>Location</Label>
                <Input
                  caret
                  type="select"
                  name="location"
                  value={paginationConfig.filter.location}
                  onChange={(e) => {
                    let x = paginationConfig;
                    x.filter.location = e.target.value;
                    setPaginationConfig({ ...x,  page: 1, limit: 10 });
                  }}
                >
                  <option value={""}>All Location</option>
                  {saloons.map((_, index) => (
                    <option key={_.id} value={_.Saloon.id}>
                      {_.Saloon.name} - {_.Saloon.location}
                    </option>
                  ))}
                </Input>
              </Col>
            )}
            {user.role === USER_TYPES.ADMIN && (
              <Col>
                <Label>Employee</Label>
                <Input
                  caret
                  type="select"
                  name="employee"
                  value={paginationConfig.filter.employee}
                  onChange={(e) => {
                    let x = paginationConfig;
                    x.filter.employee = e.target.value;
                    setPaginationConfig({ ...x,  page: 1, limit: 10 });
                  }}
                >
                  <option value={""}>All Employees</option>
                  {employeesList.map((_, index) => (
                    <option key={_.Employee.id} value={_.Employee.id}>
                      {_.Employee.firstName}  {_.Employee.lastName}
                    </option>
                  ))}
                </Input>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
      
      {user.role === USER_TYPES.ADMIN && (
      <div>
        <CardTitle tag="h4" className="text-white">
          Cash transactions
        </CardTitle>
        <Row xl={5} md={3} sm={2} xs={1} className="mb-4">
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Transactions</CardTitle>
              <CardText tag="h3">{data.cash.orderCount || 0}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Net Sales</CardTitle>
              <CardText tag="h3">${roundOff(data.cash.gross || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className=" my-2">
              <CardTitle tag="h5">Tax</CardTitle>
              <CardText tag="h3">${roundOff(data.cash.tax || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Gross Sales</CardTitle>
              <CardText tag="h3">${roundOff(data.cash.net || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Tips</CardTitle>
              <CardText tag="h3">${roundOff(data.cash.tip || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
        </Row>

        <CardTitle tag="h4" className="text-white">
          Card transactions
        </CardTitle>
        <Row xl={5} md={3} sm={2} xs={1} className="mb-4">
          <Col>
            <Card body className=" my-2">
              <CardTitle tag="h5">Transactions</CardTitle>
              <CardText tag="h3">{data.square.orderCount || 0}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Net Sales</CardTitle>
              <CardText tag="h3">${roundOff(data.square.gross || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className=" my-2">
              <CardTitle tag="h5">Tax</CardTitle>
              <CardText tag="h3">${roundOff(data.square.tax || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Gross Sales</CardTitle>
              <CardText tag="h3">${roundOff(data.square.net || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
          <Col>
            <Card body className="my-2">
              <CardTitle tag="h5">Tips</CardTitle>
              <CardText tag="h3">${roundOff(data.square.tip || 0)}</CardText>
              {/* <Button color="primary">Go somewhere</Button> */}
            </Card>
          </Col>
        </Row>
      </div>
      )}

      <DataTable
        isPagination
        count={count}
        loading={loading}
        paginationConfig={paginationConfig}
        setPaginationConfig={setPaginationConfig}
        data={bills}
        initialState={tableState}
        columns={[
          { Header: "Transaction Id", accessor: "transactionId",
          Cell: ({ row }) => {
            return (
              <div className={styles.transaction} onClick={()=> {
                setShowBillingModal(true);
                setShowBillId(row.original.id);
              }}>
                {row.original.transactionId}
              </div>
            );
          }

        },
          {
            Header: "Payment type",
            accessor: "paymentType",
            Cell: ({ row }) => {
              return (
                <p className="mb-0 text-capitalize">
                  {row.original.paymentType?.toLowerCase() || "-"}
                </p>
              );
            },
          },
          {
            Header: "Employee",
            // accessor: "Employee.employeeCode",
            Cell: ({ row }) => row.original.Employee.firstName + ' ' + row.original.Employee.lastName,
          },
          {
            Header: "Tips",
            // accessor: "Employee.employeeCode",
            Cell: ({ row }) => `$${roundOff(row.original.tipAmount)}`,
          },
          {
            Header: "Total",
            accessor: "serviceTotal",
            Cell: ({ row }) => {
              return `$${roundOff(row.original.serviceTotal)}`;
            },
          },
          { Header: "Salon", accessor: "Saloon.name" },
          {
            Header: "Date",
            accessor: "createdAt",
            Cell: ({ row }) => {
              return `${getFormatDate(row.original.createdAt)}`;
            },
          },
          { Header : "Status", accessor: "paymentStatus"},
          {
            Header: "Actions",
            accessor: "actions",
            width: "20%",
            Cell: ({ row }) => {
              return (
                <div className="d-flex gap-2">
                  {isActionPermitted("services", "edit", permissions) && (
                    <Button
                      onClick={() => navigate(`/services/${row.original.id}`)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  )}
                  {isActionPermitted("services", "delete", permissions) && (
                    <Button
                      color="danger"
                      onClick={() => {
                        setDeleteId(row.original.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  )}
                </div>
              );
            },
          },
        ]}
      />

      {showDeleteModal && (
        <ConfirmModal
          isOpen={showDeleteModal}
          setIsOpen={setShowDeleteModal}
          onOk={() => deleteService(deleteId)}
          onCancel={() => {
            setDeleteId(null);
            setShowDeleteModal(false);
          }}
        />
      )}

      {showBillingModal && (
        <BillingInfoModal isOpen={showBillingModal}
        setIsOpen={setShowBillingModal}
        billId={showBillId}
        isSuperAdmin={user.role == USER_TYPES.SUPER_ADMIN}>

        </BillingInfoModal>
      )}
    </React.Fragment>
  );
};

export default ListBillings;
