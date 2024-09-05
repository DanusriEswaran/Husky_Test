import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { SendMailValidator, LogMailValidator } from "App/Validators";
import { PackageRepository } from "App/Repositories";
import InternalExceptionMessage from "App/Exceptions";

export default class PackageMailsController {
  public async sendMail({ request, response }: HttpContextContract) {
    const { to, subject, template, variables } = await request.validate(
      SendMailValidator
    );
    const domain = "sandbox3591c75c01574da78909d976209e50e0.mailgun.org";
    const mailgunRepo = new PackageRepository(domain);
    const emailData = {
      from: "Mailgun Sandbox <postmaster@sandbox3591c75c01574da78909d976209e50e0.mailgun.org>",
      to,
      subject,
      template,
      "h:X-Mailgun-Variables": JSON.stringify(variables),
    };
    return mailgunRepo
      .sendMail(emailData)
      .then(() => {
        return response
          .status(200)
          .json({ message: "Email sent successfully" });
      })
      .catch(() => {
        const internalError = InternalExceptionMessage.custom(
          500,
          "EMAIL_SEND_FAILURE",
          "Failed to send email"
        );
        return response.status(internalError.status).send({
          code: internalError.code,
          message: internalError.log || "An internal error occurred",
        });
      });
  }

  public async logMail({ request, response }: HttpContextContract) {
    const { domain } = await request.validate(LogMailValidator);
    console.log("REQUEST FROM LOGS: ", request);
    const mailgunRepo = new PackageRepository(domain);
    await mailgunRepo
      .fetchLogs()
      .then((logs) => {
        response.status(200).send(logs);
      })
      .catch((error) => {
        console.error("Failed to fetch logs", error.response.data);
        response.status(500).send({ message: "Failed to fetch logs" });
      });
  }
}
