"use strict";
var express = require("express");
var app = express();

var ocMemberModel = require("./models/ocMemberSchema");
const { sendMail } = require("./utilities/mailer");
const { db } = require("./utilities/dbConnect");

app.use(express.json()); //Used to parse JSON bodies

//Parse URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

// set the view engine to ejs
app.set("view engine", "ejs");

// serve static assets
app.use(express.static(__dirname + "/views"));

// home page
app.get("/", function (req, res) {
  res.render("pages/home", {
    home: 1,
    legacy: 0,
    events: 0,
    schedule: 0,
    ca: 0,
    latest: 0,
    contact: 0,
    sponsors: 0,
  });
});

// legacy page
app.get("/legacy", function (req, res) {
  res.render("pages/legacy", {
    home: 0,
    legacy: 1,
    events: 0,
    schedule: 0,
    ca: 0,
    latest: 0,
    contact: 0,
    sponsors: 0,
  });
});

// events page
app.get("/events", function (req, res) {
  res.render("pages/events", {
    home: 0,
    legacy: 0,
    events: 1,
    schedule: 0,
    ca: 0,
    latest: 0,
    contact: 0,
    sponsors: 0,
  });
});

// schedule page
app.get("/schedule", function (req, res) {
  res.render("pages/schedule", {
    home: 0,
    legacy: 0,
    events: 0,
    schedule: 1,
    ca: 0,
    latest: 0,
    contact: 0,
    sponsors: 0,
  });
});

// sponsors page
app.get("/sponsors", function (req, res) {
  res.render("pages/sponsors", {
    home: 0,
    legacy: 0,
    events: 0,
    schedule: 0,
    ca: 0,
    latest: 0,
    contact: 0,
    sponsors: 1,
  });
});

// Latest posts page
app.get("/latest", function (req, res) {
  res.render("pages/latest", {
    home: 0,
    legacy: 0,
    events: 0,
    schedule: 0,
    ca: 0,
    latest: 1,
    contact: 0,
    sponsors: 0,
  });
});

// CA page
app.get("/ca", function (req, res) {
  res.render("pages/ca", {
    home: 0,
    legacy: 0,
    events: 0,
    schedule: 0,
    ca: 1,
    latest: 0,
    contact: 0,
    sponsors: 0,
  });
});

// Contact page
app.get("/contact", function (req, res) {
  res.render("pages/contact", {
    home: 0,
    legacy: 0,
    events: 0,
    schedule: 0,
    ca: 0,
    latest: 0,
    contact: 1,
    sponsors: 0,
  });
});

// oc-applications page
// app.get("/", function (req, res) {
//   res.render("pages/oc-apply", { isSuccess: -1 });
// });

// oc-applications page
// app.get("/admin", function (req, res) {
//   ocMemberModel.find(function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       // res.send(data);
//       res.render("pages/view-oc-applications", { applications: data });
//     }
//   });
// });

app.post("/oc-apply-submit", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    department,
    gradYear,
    interestDepartment,
    interests,
    portfolioLink,
  } = req.body;

  // Creating new model
  var new_ocMember = new ocMemberModel({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    department: department,
    gradYear: gradYear,
    interestDepartments: interestDepartment,
    interests: interests,
    portfolioLink: portfolioLink,
  });

  new_ocMember.save(function (err, data) {
    if (err) {
      console.log(err);
      // Redirect to error page
      res.render("pages/oc-apply", { isSuccess: 0 });
    } else {
      // Send application receipt mail to applicant
      let isHTML = false;
      let content = `Thank You ${firstName} ! \nYour Application for being a member in the Organizing Committee for Jadavpur University E-Summit has been successfully submitted.
      \nWe'll get back to you soon after a quick review.
      \nApplication ID. : ${data._id}\n\nCheers,\nTeam JU E-Cell`;

      sendMail(content, email, isHTML).catch(console.error);

      // Redirect to success page
      res.render("pages/oc-apply", { firstName, id: data._id, isSuccess: 1 });
    }
  });
});

const port = process.env.PORT || 3000;
// const port = 3001;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
