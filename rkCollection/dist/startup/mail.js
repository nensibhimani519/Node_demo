"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const nodemailer_1 = __importDefault(require("nodemailer"));
module.exports = () => {
    let transport = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "fsi.nensi@gmail.com",
            pass: "Fullstack@123"
        }
    });
    // send out email
    let mailOptions = {
        from: "fsi.nensi@gmail.com",
        to: "nensibhimani19@gmail.com",
        subject: "Hello world this is a test mail.",
        text: "This is the body of the mail."
    };
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error, 'error');
        }
        else {
            console.log("Email Sent" + info.response);
        }
    });
};
//# sourceMappingURL=mail.js.map