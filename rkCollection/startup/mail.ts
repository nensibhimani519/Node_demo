import nodemailer from 'nodemailer'
export = () => {
    
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fsi.nensi@gmail.com",
            pass: "Fullstack@123"
        }
    })
    
    // send out email
    
    let mailOptions = {
    from: "fsi.nensi@gmail.com",
    to: "nensibhimani19@gmail.com",
    subject: "Hello world this is a test mail.",
    text: "This is the body of the mail."
}

transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error,'error')
    } else {
        console.log("Email Sent" + info.response)
    }
})
}