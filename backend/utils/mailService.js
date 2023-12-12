const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "superschool.ad@gmail.com",
    pass: "DoanKHTN",
  },
});

exports.sendMail = async (emailPayload) => {
  try {
    await transport.sendMail({
      from: "superschool",
      to: emailPayload.to,
      subject: emailPayload.subject,
      html: emailPayload.html,
    });
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};
