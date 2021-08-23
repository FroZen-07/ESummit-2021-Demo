"use strict";
var express = require("express");
var app = express();

var ocMemberModel = require("./models/ocMemberSchema");
var caMemberModel = require("./models/caMemberSchema");
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
  res.render("pages/comingsoon", {
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
  res.render("pages/comingsoon", {
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

// LaunchX page
app.get("/launchx", function (req, res) {
  res.render("pages/launchx", {
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



// InspiraTalks page
app.get("/inspiratalks", function (req, res) {
  res.render("pages/inspiratalks", {
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

// ManagerHustle page
app.get("/managerhustle", function (req, res) {
  res.render("pages/managerhustle", {
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

// MockAuction page
app.get("/mockauction", function (req, res) {
  res.render("pages/mockauction", {
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

// HackNPitch page
app.get("/hacknpitch", function (req, res) {
  res.render("pages/hacknpitch", {
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

// Analyst page
app.get("/analyst", function (req, res) {
  res.render("pages/analyst", {
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

// CA page
app.post("/ca/apply", function (req, res) {
  res.render("pages/ca-apply", {
    home: 0,
    legacy: 0,
    events: 0,
    schedule: 0,
    ca: 1,
    latest: 0,
    contact: 0,
    sponsors: 0,
    formData: req.body,
    isSuccess: -1,
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

app.post("/ca/apply/submit", (req, res) => {
  // console.log("Data: ", req.body);
  const {
    name,
    university,
    department,
    degree,
    currently_pursuing,
    grad_yr,
    email,
    phone,
    age,
    gender,
    why_ca,
    innovative_things,
    popular,
    linkedin,
    facebook,
    instagram,
  } = req.body;

  // Creating new model
  var new_caMember = new caMemberModel({
    name: name,
    university: university,
    department: department,
    degree: degree,
    currently_pursuing: currently_pursuing,
    grad_yr: grad_yr,
    email: email,
    phone: phone,
    age: age,
    gender: gender,
    why_ca: why_ca,
    innovative_things: innovative_things,
    popular: popular,
    linkedin: linkedin,
    facebook: facebook,
    instagram: instagram,
  });

  new_caMember.save(function (err, data) {
    if (err) {
      console.log(err);
      // Redirect to error page
      res.render("pages/ca-apply", {
        isSuccess: 0,
        home: 0,
        legacy: 0,
        events: 0,
        schedule: 0,
        ca: 1,
        latest: 0,
        contact: 0,
        sponsors: 0,
      });
    } else {
      // Send application receipt mail to applicant
      let isHTML = false;
      let content = `Thank You ${name} ! \nYour Application for being a Campus Ambassador for Jadavpur University E-Summit has been successfully submitted.
      \nWe'll get back to you soon after a quick review.
      \nApplication ID. : ${data._id}\n\nCheers,\nTeam JU E-Cell`;

      let subject = "Campus Ambassador Application";

      sendMail(content, email, subject, isHTML).catch(console.error);

      console.log(typeof data._id);

      // Redirect to success page
      res.render("pages/ca-apply", {
        name,
        id: data._id,
        // referralCode:
        // "JUCA" + JSON.stringify(data._id).toUpperCase().substr(-5, -1),
        isSuccess: 1,
        home: 0,
        legacy: 0,
        events: 0,
        schedule: 0,
        ca: 1,
        latest: 0,
        contact: 0,
        sponsors: 0,
      });
    }
  });
});

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

      let subject = "OC Member Application";

      sendMail(content, email, subject, isHTML).catch(console.error);

      // Redirect to success page
      res.render("pages/oc-apply", { firstName, id: data._id, isSuccess: 1 });
    }
  });
});

const port = process.env.PORT;
// const port = 3001;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
