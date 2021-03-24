const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const { host, port, user, password } = require("../config/mail.json");

const transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: password,
  },
});

// const options = {
//   viewEngine: {
//     extname: ".hbs",
//     layoutsDir: path.resolve("./src/resources/mail/views/email/"),
//     defaultLayout: "template",
//     partialsDir: path.resolve("./src/resources/mail/views/partials/"),
//   },
//   viewPath: path.resolve("./src/resources/mail/views/email/"),
//   extName: ".hbs",
// };

transport.use(
  "compile",
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/resources/mail/"),
    },
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;
