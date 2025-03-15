import nodemailer from "nodemailer";

export async function SendMail({ to, subject, role, link }) {
  console.log(to, subject, role, link, "receipeinty");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mahadiksahil60@gmail.com",
      pass: "ylcd mxll sqya jeak",
    },
  });

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <mallie.kunze@ethereal.email>',
    to: to,
    subject: subject,
    html: `<h1>You have been invited as a ${role}</h1></br>
          <p>Click on this link to register as ${role}</p></br>
          <a href=${link}>Click Here.</a>
    
    `,
  });
}

SendMail()
  .then(() => console.log("Mail sent"))
  .catch((error) => console.log(error, "errorss"));
