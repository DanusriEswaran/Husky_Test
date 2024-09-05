import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { AxiosRepository } from "App/Repositories";
import { SendMailValidator, LogMailValidator } from "App/Validators";
import InternalExceptionMessage from "App/Exceptions";

export default class AxiosMailsController {
  public async sendMail({ request, response }: HttpContextContract) {
    const { to, subject, template, variables } = await request.validate(
      SendMailValidator
    );
    const data = {
      from: "Mailgun Sandbox <postmaster@sandbox3591c75c01574da78909d976209e50e0.mailgun.org>",
      to,
      subject,
      template,
      "h:X-Mailgun-Variables": JSON.stringify(variables),
    };
    await AxiosRepository.sendMail(data)
      .then(() => {
        response.status(200).send({ message: "Email sent successfully" });
      })
      .catch((error: any) => {
        const internalError = InternalExceptionMessage.custom(
          500,
          "EMAIL_SEND_FAILURE",
          "Failed to send email"
        );
        console.error(
          "Failed to send email",
          error.response?.data || error.message
        );
        return response.status(internalError.status).send({
          code: internalError.code,
          message: internalError.log || "An internal error occurred",
        });
      });
  }

  public async logMail({ request, response }: HttpContextContract) {
    await request.validate(LogMailValidator);
    await AxiosRepository.fetchLogs()
      .then((logs: any) => {
        response.status(200).send(logs.data);
      })
      .catch((error: any) => {
        const internalError = InternalExceptionMessage.custom(
          500,
          "LOG_FETCH_FAILURE",
          "Failed to fetch logs"
        );
        console.error(
          "Failed to fetch logs",
          error.response?.data || error.message
        );
        return response.status(internalError.status).send({
          code: internalError.code,
          message: internalError.log || "An internal error occurred",
        });
      });
  }
}
