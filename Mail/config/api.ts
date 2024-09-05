import Mailgun from "mailgun.js";
import axios from "axios";

const apiKey = process.env.MAILGUN_API_KEY || "";
const domain = process.env.MAILGUN_DOMAIN || "";

const mailgun = new Mailgun(FormData);
const mailgunClient = mailgun.client({
  username: "api",
  key: apiKey,
});

const axiosClient = axios.create({
  baseURL: `https://api.mailgun.net/v3/${domain}`,
  timeout: 10000,
  auth: {
    username: "api",
    password: apiKey,
  },
});

export { mailgunClient, axiosClient };
