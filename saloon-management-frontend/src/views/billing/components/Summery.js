import React from "react";
import { useSelector } from "react-redux";
import { CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import { roundOff } from "../../../util";

const Summery = ({ billingData }) => {
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
      <CardHeader>
        <CardTitle tag="h4">Summary</CardTitle>
      </CardHeader>
      <div className="d-flex justify-content-center">
        <div className="w-100">
          <CardBody>
            <Table bordered>
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
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{service.name}</td>
                    <td>(x {service.quantity})</td>
                    <td>${roundOff(service.servicePrice[0]?.price)}</td>
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
              <tfoot>
                <tr>
                  <td className="text-end" colSpan={5}>
                    <h5>
                      Subtotal :{" "}
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
                    </h5>
                    <h5>Total bill : {calculateTax()}</h5>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </CardBody>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Summery;
