import express from "express";
import { mobileAuth } from "../middleware/auth";
import mobileLogin from "./mobile/login/_router";
import mobilewithdraw from "./mobile/withdraw/_router";
import mobileSettings from "./mobile/settings/_router";
import mobileNotification from "./mobile/notification/_router";
import mobiledeviceToken from "./mobile/device_token/_router";

// admin routes
import adminAnnouncement from "./admin/announcement/_router";
import adminCompany from "./admin/company/_router";
import adminCustomerBank from "./admin/customer_bank/_router";
import adminCustomerInteracId from "./admin/customer_interac_id/_router";
import adminCustomerPayId from "./admin/customer_pay_id/_router";
import adminCustomerUpiId from "./admin/customer_upi/_router";
import adminPromotion from "./admin/promotion/_router";
import adminWithdraw from "./admin/withdraw/_router";

const app = express();

app.use("/mobile/login", mobileLogin);
app.use("/mobile/settings", mobileAuth, mobileSettings);
app.use("/mobile/withdraw", mobileAuth, mobilewithdraw);
app.use("/mobile/notification", mobileAuth, mobileNotification);
app.use("/mobile/device_token", mobileAuth, mobiledeviceToken);

// admin routes
app.use("/admin/announcement", adminAnnouncement);
app.use("/admin/company", adminCompany);
app.use("/admin/customer_bank", adminCustomerBank);
app.use("/admin/customer_interac_id", adminCustomerInteracId);
app.use("/admin/customer_pay_id", adminCustomerPayId);
app.use("/admin/customer_upi", adminCustomerUpiId);
app.use("/admin/promotion", adminPromotion);
app.use("/admin/withdraw", adminWithdraw);

export default app;
