import { model } from "mongoose";
import { companySchema } from "../models/company";
import { countrySchema } from "../models/country";
import { currencySchema }  from "../models/currency";
import { rejectReasonSchema }  from "../models/reject_reason";
import { customerSchema }  from "../models/customer";
import { customerBankSchema }  from "../models/customer_bank";
import { customerUpiSchema }  from "../models/customer_upi";
import { customerPayIdSchema }  from "../models/customer_pay_id";
import { customerInteracSchema }  from "../models/customer_interac";
import { withdrawRequestSchema }  from "../models/withdraw_request";
import { announcementSchema }  from "../models/announcement";
import { withdrawAutoLimitSchema }  from "../models/withdraw_auto_limit";
import { promotionSchema }  from "../models/promotion";
import { appContentSchema }  from "../models/app_content";
import { deviceTokenSchema }  from "../models/device_token";
import { notificationSchema }  from "../models/notification";
import { customerWalletSchema }  from "../models/customer_wallet";

export default () => {
  model("Company", companySchema);
  model("Country", countrySchema);
  model("Currency", currencySchema);
  model("RejectReason", rejectReasonSchema);
  model("Customer", customerSchema);
  model("CustomerBank", customerBankSchema);
  model("CustomerUpi", customerUpiSchema);
  model("CustomerPayId", customerPayIdSchema);
  model("CustomerInterac", customerInteracSchema);
  model("WithdrawRequest", withdrawRequestSchema);
  model("Announcement", announcementSchema);
  model("WithdrawAutoLimit", withdrawAutoLimitSchema);
  model("promotion", promotionSchema);
  model("AppContent", appContentSchema);
  model("DeviceToken", deviceTokenSchema);
  model("Notification", notificationSchema);
  model("CustomerWallet", customerWalletSchema);
};
