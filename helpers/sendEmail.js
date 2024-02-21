import dotenv from "dotenv";
dotenv.config();
import sendgrid from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "grogulandriy1998@gmail.com" };
  await sendgrid.send(email);
  return true;
};

export default sendEmail;
