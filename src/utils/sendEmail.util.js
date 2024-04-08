import { createTransport } from "nodemailer";

export default async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: process.env.PORT,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    await transport.sendMail({
      from: `CODER <${process.env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name} REGISTERED`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Registered</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>USER REGISTERED!</h1>
          <p>Hello ${data.name},</p>
          <p>We are pleased to inform you that your registration was successful.</p>
          <p>Thank you for joining us!</p>
          <p>Best regards,</p>
          <p>The CODER Team</p>
          <p>Your verify code is ${data.verifyCode}</p>
        </div>
      </body>
      </html>
    `,
    });
  } catch (error) {
    throw error;
  }
}
