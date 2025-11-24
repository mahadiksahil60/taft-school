import nodemailer from "nodemailer";

export async function SendMail({to, subject, role, link, code}) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mahadiksahil60@gmail.com",
            pass: "ylcd mxll sqya jeak",
        },
    });

    console.log("to ==============================================================================", typeof to)

    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <mallie.kunze@ethereal.email>',
        to: to,
        subject: subject,
        html: `<h1>You have been invited as a ${role}</h1></br>
          <p>Click on this link to register as ${role}</p></br>
          <p>Enter this registration code while registering: ${code}</p><br/>
          <a href=${link}>Click Here.</a>
    
    `,
    });
}

SendMail()
    .then(() => console.log("Mail sent"))
    .catch((error) => console.log(error, "errors"));
