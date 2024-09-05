import MailGunPackage from "App/Services/MailGunPackage";
export default class PackageRepository {
  private mailgunService: MailGunPackage;

  constructor(domain: string) {
    this.mailgunService = new MailGunPackage(domain);
  }

  public async sendMail(emailData: any): Promise<any> {
    return this.mailgunService.sendMail(emailData);
  }

  public async fetchLogs(): Promise<any> {
    return this.mailgunService.fetchLogs();
  }
}
