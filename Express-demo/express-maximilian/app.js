const path = require("path");

const http = require("http");
const express = require("express");
// const expressHbs = require("express-handlebars");
// const { create } = require("express-handlebars");
// const hbs = create({
//   layoutsDir: "views/layouts/",
//   defaultLayout: "main-layout",
//   extname: "hbs",
//   /* config */
// });

// or express-handlebars example
// app.engine(
//   "hbs",
//   expressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main-layout" })
// );

const app = express();

const bodyParser = require("body-parser");
const server = http.createServer(app);

// const adminData = require("./routes/admin");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

// using pug
app.set("view engine", "pug");

// using ejs
// app.set("view engine", "ejs");

// using handlebars
// app.engine("handlebars", hbs.engine);
// app.set("view engine",   "handlebars");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
// add static file structure [ static css file add ]
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminData.routes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(
  errorController.get404
  // console.log('This always runs !!');
  // next()
  //   res.status(404).send("<h1>Page not found</h1>");
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
);

app.listen(3000);
