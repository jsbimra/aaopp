
// console.log('process env is : ' + process.env.CESPassword)
export default function (req, res) {
  const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    let testAccount = {
      user: process.env.CESUsername,
      pass: process.env.CESPassword,
      emailFrom: `Season Fruit (Mangoes) -  AAOPP! 👻 (from Codesandbox Application) <${process.env.CESEmailFrom}>`,
      emailTo: process.env.CESEmailTo,
      emailSubject: `Mangoes Enquiry ✔ Dated - ${new Date().toString()}`,
    };

    // Empty check and return
    if(!req.body.name && !req.body.mobile) {
      res.send({success: false, message: "Please pass post data "});
      return;
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.CEServer,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });

    // console.log(req.body);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: testAccount.emailFrom, // sender address
      to: testAccount.emailTo, // list of receivers
      subject: testAccount.emailSubject, // Subject line
      text:
        "Date of Enquiry: " +
        new Date().toDateString() + " " + new Date().toLocaleTimeString() +
        " | Name: " +
        req.body.name +
        " | Mobile: " +
        req.body.mobile +
        " | Email: " +
        req.body.email +
        " | Mango type: " +
        req.body.productType +
        " | Dozen: " +
        req.body.dozen +
        " | Time to reach at: " +
        req.body.reachTimeStart +
        " - " +
        req.body.reachTimeEnd +
        " | Day: " +
        req.body.day +
        " | Location: " +
        req.body.location , // plain text body
      html: `
      <div style=" width:80%; margin: 10px auto;">
        <p>Hi here, <br /><br /> Enquiry recieved from: <strong>${req.body.name}</strong></p>
        <table style="text-align:left; font-size: 12px; 
          border: 1px solid lightgrey;
          margin: 10px auto;
  padding: 10px;
        font-family: 'Serif-sans', arial;  " cellpadding="5" 
        cellspacing="0" border="0" width="100%"><tbody>
          
          <tr>
            <th scope="row">Date of Enquiry:</th>
            <td>${
              new Date().toDateString() + " " + new Date().toLocaleTimeString()
            }</td>
          </tr>
          <tr>
            <th scope="row">Name:</th>
            <td>${req.body.name}</td>
          </tr>
          <tr>
            <th scope="row">Mobile:</th>
            <td>${req.body.mobile}</td>
          </tr>
          <tr>
            <th scope="row">Email:</th>
            <td>${req.body.email}</td>
          </tr>
          <tr>
            <th scope="row">Mango type:</th>
            <td>${req.body.productType}</td>
          </tr>
          <tr>
            <th scope="row">Dozen:</th>
            <td>${req.body.dozen}</td>
          </tr>
          <tr>
            <th scope="row">Day availability:</th>
            <td>${req.body.day}</td>
          </tr>
          <tr>
            <th scope="row">Time to reach at:</th>
            <td>${req.body.reachTimeStart} - ${req.body.reachTimeEnd}</td>
          </tr>
          <tr>
            <th scope="row">Location:</th>
            <td>${req.body.location}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>Thanks <br /> AAOPP Team</p>
      </div>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);

  console.log(req.body);
  res.send({ success: true });
}
