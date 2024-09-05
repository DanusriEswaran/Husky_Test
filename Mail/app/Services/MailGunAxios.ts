import { mailgunClient } from "Config/api";

export default class MailgunAxios {
  private client: any;

  constructor() {
    this.client = mailgunClient;
  }

  public async sendMail(emailData: any): Promise<any> {
    const data = new FormData();
    for (const key in emailData) {
      data.append(key, emailData[key]);
    }
    return this.client.messages.create(process.env.MAILGUN_DOMAIN || "", data);
  }

  public async fetchLogs(): Promise<any> {
    return this.client.events.get(process.env.MAILGUN_DOMAIN || "");
  }
}
