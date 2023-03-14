import { ErrorMessage, Field, FieldArray, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import PageHeader from "../../components/common/PageHeader";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { api, isActionPermitted } from "../../util";
import { getSaloonsRequest } from "../../redux/saloons/actions";
import { toast } from "react-toastify";
import { getCategoriesRequest } from "../../redux/actions";

const UpsertService = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saloons } = useSelector((state) => state.saloons);
  const { categories } = useSelector((state) => state.categories);
  const { permissions } = useSelector((state) => state.user);
  const [initialValues, setInitialValues] = useState({
    name: "",
    category: "1",
    // isTaxable: "null",
    order: null,
    isPricing: false,
    prices: saloons.map((_) => ({
      ..._,
      name: _.Saloon.name,
      price: "",
      id: _.Saloon.id,
      isEnable: false,
      isTaxable: false,
    })),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVariablePricing, setIsVariablePricing] = useState(false);

  useEffect(() => {
    if (isActionPermitted("services", "read", permissions)) {
      dispatch(getSaloonsRequest());
      dispatch(getCategoriesRequest());
    }
  }, [permissions]);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      prices: saloons.map((_) => ({
        ..._,
        price: "",
        name: _.Saloon.name,
        id: _.Saloon.id,
        isEnable: false,
        isTaxable: false,
      })),
    });
  }, [saloons]);

  useEffect(() => {
    if (id !== "add") {
      const getService = async (id) => {
        try {
          const response = await api.get("/services/" + id);
          if (response.status === 200) {
            let pricesArr = [];

            saloons.map((_) => {
              let isPriceExist = response.data.data.servicePrice.find(
                (p) => p?.saloon?.id === _.Saloon.id
              );

              if (isPriceExist) {
                pricesArr.push({
                  name: isPriceExist.saloon.name,
                  id: isPriceExist.saloon.id,
                  price: isPriceExist.price,
                  isEnable: true,
                  isTaxable: isPriceExist.isTaxable,
                });
              } else {
                pricesArr.push({
                  name: _.Saloon.name,
                  price: "",
                  id: _.Saloon.id,
                  isEnable: false,
                  isTaxable: false,
                });
              }
            });
            // console.log('final prices', pricesArr);
            setInitialValues({
              ...response.data.data,
              name: response.data.data.name || "",
              category: response.data.data.category || "1",
              order: response.data.data.order || "1",
              prices: pricesArr,
            });
            setIsVariablePricing(!!response.data.data.isVariablePricing);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        } finally {
          setIsLoading(false);
        }
      };
      getService(id);
    }
  }, [id, saloons]);

  const onSubmit = async (values) => {
    // console.log('getting values',values,isVariablePricing);
    if (isVariablePricing) {
      values.prices = values.prices.map((_) => ({ ..._, price: -1 }));
    }
    // const enableFound = values.prices.find((_) => _.isEnable);
    //   if (!enableFound) {
    //     toast.error("Please enable this service at least for one saloon");
    //     return;
    //   }
    setIsLoading(true)
    if (id === "add") {
      try {
        const response = await api.post("/services", {
          ...values,
          isVariablePricing,
        });
        if (response.status === 201) {
          toast.success(response?.data?.message || response.message);
          navigate("/services");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await api.put("/services/" + id, {
          ...values,
          isVariablePricing,
        });
        if (response.status === 200) {
          toast.success(response?.data?.message || response.message);
          navigate("/services");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVariablePricing = (e, values, setValues) => {
    const { checked } = e.target;
    if (checked) {
      let pricing = values.prices.map((_) => ({ ..._, price: -1 }));
      setValues({ ...values, prices: pricing, isPricing: checked });
    } else {
      let pricing = values.prices.map((_) => ({ ..._, price: 0 }));
      setValues({ ...values, prices: pricing, isPricing: checked });
    }
  };
  return (
    <React.Fragment>
      <Formik
        validateOnChange
        initialValues={{ ...initialValues }}
        validationSchema={
          isVariablePricing ? 
          Yup.object().shape({
            name: Yup.string().required("Please enter name"),
            order: Yup.number().nullable(),
            category: Yup.string()
              .required("Please select category")
              .default("1"),
            // isTaxable: Yup.boolean()
            //   .required("Please select one option")
            //   .typeError("Please select one option"),
          }) :

          Yup.object().shape({
          name: Yup.string().required("Please enter name"),
          order: Yup.number().nullable(),
          category: Yup.string()
            .required("Please select category")
            .default("1"),
            prices: Yup.array().of(
              Yup.object().shape({
                price: Yup.number().when('isEnable',{
                  is : true,
                  then : Yup.number().moreThan(0,"Price should be greater than 0")
                })
              })
            ),
          // isTaxable: Yup.boolean()
          //   .required("Please select one option")
          //   .typeError("Please select one option"),
        })}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, values, touched, setValues }) => (
          <>
            <PageHeader
              shouldShowAddBtn={false}
              title={id === "add" ? "Add Service" : "Edit Service"}
            />
            <Card>
              <CardTitle tag="h5" className="border-bottom p-3 mb-0">
                <i className="bi bi-hdd-stack me-2"> </i>
                {id === "add" ? "Create a new service" : "Edit this service"}
              </CardTitle>
              <CardBody>
                <Form>
                  <Row>
                    <Col xl={6}>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Field
                          id="name"
                          name="name"
                          placeholder="Service name"
                          type="text"
                          className={
                            "form-control" +
                            (errors.name && touched.name ? " is-invalid" : "")
                          }
                        />
                        {errors.name && touched.name && (
                          <span component="div" className="invalid-feedback">
                            {errors.name}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xl={6}>
                      <FormGroup>
                        <Label for="category">Category</Label>
                        <Field
                          caret
                          type="select"
                          component="select"
                          id="category"
                          name="category"
                          value={values.category}
                          className={
                            "form-control " +
                            (errors.category && touched.category
                              ? " is-invalid"
                              : "")
                          }
                        >
                          {categories.map((_, index) => (
                            <option value={_.id}>{_.name}</option>
                          ))}
                        </Field>

                        {errors.category && touched.category && (
                          <span component="div" className="invalid-feedback">
                            {errors.category}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col xl={6}>
                      <FormGroup>
                        <Label for="order">Order</Label>
                        <Field
                          id="order"
                          name="order"
                          placeholder="Service order"
                          type="number"
                          className={
                            "form-control" +
                            (errors.order && touched.order ? " is-invalid" : "")
                          }
                        />
                        {errors.order && touched.order && (
                          <span component="div" className="invalid-feedback">
                            {errors.order}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr />

                  {/* <Row>
                    <Col>
                      <Label>Is taxable ?</Label>
                      <div className="d-flex gap-2">
                        <Input
                          id="yes"
                          type="radio"
                          checked={
                            values.isTaxable && values.isTaxable !== "null"
                          }
                          onChange={(e) => {
                            setValues({ ...values, isTaxable: true });
                          }}
                        />
                        <Label for="yes" className="mx-1 px-1">
                          Yes
                        </Label>

                        <Input
                          id="no"
                          type="radio"
                          checked={
                            !values.isTaxable && values.isTaxable !== "null"
                          }
                          onChange={(e) => {
                            setValues({ ...values, isTaxable: false });
                          }}
                        />
                        <Label for="no" className="mx-1 px-1">
                          No
                        </Label>
                      </div>
                      {errors.isTaxable && (
                        <span component="div" className="text-danger fw-bold">
                          {errors.isTaxable}
                        </span>
                      )}
                    </Col>
                  </Row> */}

                  {/* <hr /> */}
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Input
                          id="variable_pricing"
                          type={"checkbox"}
                          name="isPricing"
                          checked={isVariablePricing}
                          onChange={(e) => {
                            handleVariablePricing(e, values, setValues);
                            setIsVariablePricing(e.target.checked);
                          }}
                        />
                        <Label check for="variable_pricing">
                          Variable pricing
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FieldArray name="prices">
                    {() =>
                      values.prices.map((priceObj, i) => {
                        const pricesErrors =
                          (errors.prices?.length && errors.prices[i]) || {};
                        const pricesTouched =
                          (touched.prices?.length && touched.prices[i]) || {};
                        return (
                          <div key={i} className="list-group list-group-flush">
                            <React.Fragment>
                              <Row>
                                <Col xl={4} className="form-group col-6">
                                  <FormGroup>
                                    <Label>Salon name</Label>
                                    <Field
                                      disabled
                                      name={`prices.${i}.name`}
                                      type="text"
                                      className={
                                        "form-control" +
                                        (pricesErrors.name && pricesTouched.name
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    {errors.name && touched.name && (
                                      <span
                                        component="div"
                                        className="invalid-feedback"
                                      >
                                        {errors.name}
                                      </span>
                                    )}
                                    <ErrorMessage
                                      name={`prices.${i}.name`}
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col xl={2} className="form-group col-2">
                                <FormGroup>
                                    <Label>Is Enable?</Label>
                                    <div className="d-flex gap-2">
                                      <Input
                                        id={`prices.${i}.isEnableYes`}
                                        type="radio"
                                        checked={
                                          priceObj.isEnable && priceObj.isEnable !== "null"
                                        }
                                        onChange={(e) => {
                                          setValues({ ...values, 
                                            prices: values.prices.map((price, index) => {
                                              if (index === i) {
                                                return {
                                                  ...price,
                                                  isEnable: true,
                                                };
                                              }
                                              return price;
                                            }),
                                             });
                                        }}
                                      />
                                      <Label for={`prices.${i}.isEnableYes`} className="mx-1 px-1">
                                        Yes
                                      </Label>

                                      <Input
                                        id={`prices.${i}.isEnableNo`}
                                        type="radio"
                                        checked={
                                          !priceObj.isEnable && priceObj.isEnable !== "null"
                                        }
                                        onChange={(e) => {
                                          setValues({ ...values, 
                                            prices: values.prices.map((price, index) => {
                                              if (index === i) {
                                                return {
                                                  ...price,
                                                  isEnable: false,
                                                  price:"",
                                                  isTaxable: false,
                                                };
                                              }
                                              return price;
                                            }),
                                            });
                                        }}
                                      />
                                      <Label for={`prices.${i}.isEnableNo`} className="mx-1 px-1">
                                        No
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  </Col>
                                  
                                  {!isVariablePricing && priceObj.isEnable && (
                                <Col xl={4} className="form-group col-6">
                                  <FormGroup>
                                    <Label>Price</Label>
                                    <Field
                                      required={priceObj.isEnable}
                                      disabled={
                                        isVariablePricing &&
                                        parseInt(priceObj.price) === -1
                                      }
                                      
                                      value={
                                        parseInt(priceObj.price) === -1
                                          ? ""
                                          : priceObj.price
                                      }
                                      name={`prices.${i}.price`}
                                      type="number"
                                      className={
                                        "form-control" +
                                        (pricesErrors?.price &&
                                        pricesTouched?.price
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    {pricesErrors?.price &&
                                      pricesTouched?.price && (
                                        <span
                                          component="div"
                                          className="invalid-feedback"
                                        >
                                          {pricesErrors?.price}
                                        </span>
                                      )}
                                  </FormGroup>
                                </Col>
                              )}

                                  { priceObj.isEnable && (
                                <Col xl={2} className="form-group col-2">
                                <FormGroup>
                                    <Label>Is Taxable?</Label>
                                    <div className="d-flex gap-2">
                                      <Input
                                        id={`prices.${i}.isTaxableYes`}
                                        type="radio"
                                        checked={
                                          priceObj.isTaxable && priceObj.isTaxable !== "null"
                                        }
                                        onChange={(e) => {
                                          setValues({ ...values, 
                                            prices: values.prices.map((price, index) => {
                                              if (index === i) {
                                                return {
                                                  ...price,
                                                  isTaxable: true,
                                                };
                                              }
                                              return price;
                                            }),
                                             });
                                        }}
                                      />
                                      <Label for={`prices.${i}.isTaxableYes`} className="mx-1 px-1">
                                        Yes
                                      </Label>

                                      <Input
                                        id={`prices.${i}.isTaxableNo`}
                                        type="radio"
                                        checked={
                                          !priceObj.isTaxable && priceObj.isTaxable !== "null"
                                        }
                                        onChange={(e) => {
                                          setValues({ ...values, 
                                            prices: values.prices.map((price, index) => {
                                              if (index === i) {
                                                return {
                                                  ...price,
                                                  isTaxable: false,
                                                };
                                              }
                                              return price;
                                            }),
                                            });
                                        }}
                                      />
                                      <Label for={`prices.${i}.isTaxableNo`} className="mx-1 px-1">
                                        No
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  </Col>
                                  )}

                                  
                              </Row>
                            </React.Fragment>
                          </div>
                        );
                      })
                    }
                  </FieldArray>

                  <div className="card-footer border-top-0 d-flex gap-2 mt-4 justify-content-end">
                    <Button
                      color="transaprent"
                      className="border"
                      type="button"
                      onClick={() => navigate("/services")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="btn btn-primary">
                      {id === "add" ? "Add Service" : "Update Service"}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default UpsertService;
