const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gng10gg.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;
// "mongodb+srv://fullStack:fullStack@cluster0.gng10gg.mongodb.net/session_cookie?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });
const csrfProtection = csrf({});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  // User.findById("63a68f2fd923c71c96d68d11")
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Nensi",
    //       email: "fsi.nensi@gmail.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
