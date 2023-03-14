import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Modal, ModalFooter, Table } from "reactstrap";
import { toast } from "react-toastify";
import { api, getFormatDate, roundOff } from "../../../util"
import styles from "../billing.module.scss"

const BillingInfo = ({
    isOpen,
    setIsOpen,
    billId,
    isSuperAdmin
}) =>{
    const toggle = () => setIsOpen((prev) => !prev);
    const [billData,setBillData] = useState(null)
    useEffect(()=>{
        getBilling(billId);
    },[])

    const getBilling = async (id) => {
        try {
          const response = await api.get("/square/getBilling/" + id);
          if (response.status === 200) {
            setBillData(response.data.data)
            toast.success(response?.data?.data.message || response.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      };

      const calculateTaxForService = (service) =>{
        if(Number(service?.salesTax) > 0){
            let tax = Number(service.salesTax) || 0;

            return parseFloat(Number(service.price) +
        (Number(service.price) * Number(tax)) / 100).toFixed(2);
        }
        return service.price;
      }

    return(
        <Modal isOpen={isOpen} toggle={toggle} size="lg"
        centered>
            <Card>
                <CardHeader>
                <CardTitle tag="h4">Bill</CardTitle>
                </CardHeader>
                <div className="d-flex justify-content-center">
                    <div className="w-100">
                        <CardBody>
                            <div className={styles.billMain}>
                                <div className={styles.billDiv}>
                                    <div className={styles.billTitle}>Transaction ID:</div>
                                    <div>{billData?.bill?.transactionId}</div>
                                </div>
                                
                                {isSuperAdmin && (
                                    <div className={styles.billDiv}>
                                        <div className={styles.billTitle}>Salon Name:</div>
                                        <div>{billData?.bill?.Saloon?.name}</div>
                                    </div>
                                )}

                                <div className={styles.billDiv}>
                                    <div className={styles.billTitle}>Employee Name:</div>
                                    <div>{billData?.bill?.Employee?.firstName + ' ' + billData?.bill?.Employee?.lastName}</div>
                                </div>

                                { Number(billData?.bill?.tipAmount) > 0 && (
                                <div className={styles.billDiv}>
                                    <div className={styles.billTitle}>Tip:</div>
                                    <div>${billData?.bill?.tipAmount}</div>
                                </div>
                                )}

                                <div className={styles.billDiv}>
                                    <div className={styles.billTitle}>Payment Type:</div>
                                    <div>{billData?.bill?.paymentType === 'CASH' ? 'CASH' : 'CARD'}</div> <br />
                                    
                                </div>
                                <div className={styles.billDiv}>
                                    <div className={styles.billTitle}>Date:</div>
                                    <div>{getFormatDate(billData?.bill?.createdAt)}</div>    
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="w-100">
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
                                        {billData?.billingItems?.length > 0 &&
                                            billData?.billingItems?.map((service, index) => (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{service.Service?.name}</td>
                                                <td>(x {service.quantity})</td>
                                                <td>
                                                ${roundOff(service?.price)}
                                                </td>
                                                {/* <td>
                                                {Number(service?.salesTax) > 0 &&
                                                    ` + ${service?.salesTax}%`}{" "}
                                                = $
                                                {service.itemTotal}
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
                                                billData?.billingItems?.map(
                                                    (_) =>
                                                    (total +=
                                                        Number(_.price) *
                                                        Number(_.quantity))
                                                );
                                                return roundOff(total);
                                                })()}
                                            </p>
                                            <p className="mb-2">
                                                Tax amount : $
                                                {(function () {
                                                let total = 0;
                                                billData?.billingItems?.map(
                                                    (_) =>
                                                    (total +=
                                                        Number(_.price) *
                                                        Number(_.quantity))
                                                );
                                                return roundOff(billData?.bill?.serviceTotal - total);
                                                })()}
                                            </p>
                                            <h5>Net amount : ${billData?.bill?.serviceTotal}</h5>
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </Table>
                                    
                                </div>
                            </div>
                        </CardBody>
                    </div>
            </div>
            </Card>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default BillingInfo;