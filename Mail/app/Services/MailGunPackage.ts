import mailgunClient from "Config/api";

export default class MailGunPackage {
  private mailgun: any;
  private domain: string;

  constructor(domain: string) {
    this.mailgun = mailgunClient;
    this.domain = domain;
  }

  public async sendMail(emailData: any): Promise<any> {
    return this.mailgun.messages.create(this.domain, emailData);
  }

  public async fetchLogs(): Promise<any> {
    return this.mailgun.events.get(this.domain);
  }
}
