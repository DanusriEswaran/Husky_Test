import { axiosClient } from "Config/api";
export default new (class AxiosRepository {
  private client: any;
  constructor() {
    this.client = axiosClient;
  }

  public async sendMail(emailData: any): Promise<any> {
    const data = new FormData();
    for (const key in emailData) {
      data.append(key, emailData[key]);
    }
    return this.client.post("/messages", data);
  }

  public async fetchLogs(): Promise<any> {
    return this.client.get("/events");
  }
})();
