const crypto = require("crypto");

const User = require("../models/user");
const bcrypt = require("bcryptjs");

// validation example
const { validationResult } = require("express-validator");

// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         "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",
//     },
//   })
// );

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: isLoggedIn,
    // isAuthenticated: false,
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  // User.findById("63a947d006981d45314d54cd")
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        // req.flash("error", "Invalid email.");
        // return res.redirect("/login");
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: ' "Invalid email."',
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              res.redirect("/");
            });
          }
          // req.flash("error", "Invalid password.");
          // res.redirect("/login");
          return res.status(422).render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            errorMessage: ' "Invalid password."',
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          res.redirect("/login");
        });
    })
    // .catch((err) => {
    //   console.log(err);
    // });
    // or
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationErrors: [],
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array(), "error");
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      // isAuthenticated: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirm_password: confirm_password,
      },
      validationErrors: errors.array(),
    });
  }
  // User.findOne({ email: email })
  //   .then((userDoc) => {
  //     if (userDoc) {
  //       req.flash(
  //         "error",
  //         "E-mail exists already, please pick a different one."
  //       );
  //       return res.redirect("/signup");
  //     }
  // return
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/login");
      const msg = {
        to: email,
        from: "fsi.nensi@gmail.com",
        subject: "Signup Succeeded !!",
        html: "<h1> You successfully Sign up !!! </h1>",
        text: "and easy to do anywhere, even with Node.js",
      };
      sgMail.send(msg);
      // return transporter.sendMail({
      //   to: email,
      //   from: "nensibhimani519@gmail.com",
      //   subject: "Signup Succeeded !!",
      //   html: "<h1> You successfully Sign up !!! </h1>",
      // });
    })
    // .catch((err) => {
    //   console.log(err);
    // });
    // or
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  // })

  // .catch((err) => {
  //   console.log(err);
  // });
};

exports.getResetpassword = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/resetpassword", {
    path: "/resetpassword",
    pageTitle: "Resetpassword",
    errorMessage: message,
  });
};

exports.postResetpassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.redirect("/resetpassword");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found");
          return res.redirect("/resetpassword");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        const msg = {
          to: req.body.email,
          from: "fsi.nensi@gmail.com",
          subject: "Password Reset !!",
          html: `<p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/resetpassword/${token}">link</a> link to set a new password.</p> 
          `,
          text: "and easy to do anywhere, even with Node.js",
        };
        sgMail.send(msg);
      })
      // .catch((err) => {
      //   console.log(err);
      // });
      // or
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewpassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      console.log(user, "userrr");
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user?._id.toString(),
        passwordToken: token,
      });
    })
    // .catch((err) => {
    //   console.log(err);
    // });
    // or
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewpassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    // .catch((err) => {
    //   console.log(err);
    // });
    // or
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
