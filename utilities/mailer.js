const nodemailer = require("nodemailer");

async function sendMail(content, recipientEmail, mailSubject, isHTML) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "triumph.herosite.pro",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "esummit@juecell.in", // generated ethereal user
      pass: "JUecell@123", // generated ethereal password
    },
  });

  if (!isHTML) {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"JU E-Summit" <esummit@juecell.in>', // sender address
      to: recipientEmail, // list of receivers
      subject: mailSubject, // Subject line
      text: content, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  } else {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"JU E-Summit" <esummit@juecell.in>', // sender address
      to: recipientEmail, // list of receivers
      subject: mailSubject, // Subject line
      //   text: content, // plain text body
      html: content, // html body
    });

    console.log("Message sent to : %s", email);
  }
}

module.exports = { sendMail };
