import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { getCategoriesRequest, getEmployeesRequest } from "../../redux/actions";
import { getSaloonsRequest } from "../../redux/saloons/actions";
import { api, roundOff } from "../../util";

const Dashboard = () => {
  const { saloons } = useSelector((state) => state.saloons);
  const { categories } = useSelector((state) => state.categories);
  const { employees } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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

  const [paginationConfig, setPaginationConfig] = useState({
    location: null,
    employee: null,
    category: null,
    date: {
      from: moment().startOf("day").toISOString(),
      to: moment().endOf("day").toISOString(),
    },
  });

  useEffect(() => {
    dispatch(getCategoriesRequest());
    dispatch(getSaloonsRequest());
    dispatch(getEmployeesRequest());
  }, []);

  useEffect(() => {
    fetchData();
  }, [paginationConfig]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await api.post("/dashboard", paginationConfig);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDateRangeChange = ({ target }) => {
    const { name, value } = target;
    let pc = paginationConfig;
    if (name === "from") {
      pc.date[name] = moment(value).startOf("day").toISOString();
    } else {
      pc.date[name] = moment(value).endOf("day").toISOString();
    }
    setPaginationConfig({ ...pc });
  };

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <Row xxl={5} xl={5} md={3} sm={2} xs={1} className="gy-3 gx-3">
            <Col>
              <Label>Location</Label>
              <Input
                caret
                type="select"
                name="location"
                value={paginationConfig.location}
                onChange={(e) => {
                  let x = paginationConfig;
                  x.location = e.target.value;
                  setPaginationConfig({ ...x });
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
            <Col>
              <Label>Employee</Label>
              <Input
                caret
                type="select"
                name="location"
                value={paginationConfig.employee}
                onChange={(e) => {
                  let x = paginationConfig;
                  x.employee = e.target.value;
                  setPaginationConfig({ ...x });
                }}
              >
                <option value={""}>All Employees</option>
                {employees.map(({ Employee }) => (
                  <option key={Employee.id} value={Employee.id}>
                    {Employee.firstName + " " + Employee.lastName}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label>Category</Label>
              <Input
                caret
                type="select"
                name="location"
                value={paginationConfig.category}
                onChange={(e) => {
                  let x = paginationConfig;
                  x.category = e.target.value;
                  setPaginationConfig({ ...x });
                }}
              >
                <option value={""}>All Categories</option>
                {categories.map((_, index) => (
                  <option key={_.id} value={_.id}>
                    {_.name}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label>From</Label>
              <Input
                name="from"
                onChange={onDateRangeChange}
                max={moment().format(
                  "YYYY-MM-DD"
                )}
                value={moment(paginationConfig.date.from).format("YYYY-MM-DD")}
                type="date"
              />
            </Col>
            <Col>
              <Label>To</Label>
              <Input
                onChange={onDateRangeChange}
                name="to"
                min={moment(paginationConfig.date.from).format(
                  "YYYY-MM-DD"
                )}
                value={moment(paginationConfig.date.to).format("YYYY-MM-DD")}
                type="date"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

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
      <Row xl={5} md={3} sm={2} xs={1}>
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
    </React.Fragment>
  );
};

export default Dashboard;
