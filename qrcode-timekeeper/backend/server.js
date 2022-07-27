// Use guide here to help get up and running: https://www.youtube.com/watch?v=SccSCuHhOw0
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "https://frontend-for-heroku.herokuapp.com"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to qrcode application." });
});

require("./routes/employee.routes.js")(app);
require("./routes/time_logs.routes.js")(app);
require("./routes/managers_info.routes.js")(app);
require("./routes/manager_entry.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


/*

// Use stack overflow answer below to find a way to get users ip address.
// https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
app.set('trust proxy', true);

// app.get('/', (req, res) => {
//    res.send(`ADDRESS: ${req.ip}`);
// })

app.listen(8080);

*/