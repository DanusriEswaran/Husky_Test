import Logger from "@ioc:Adonis/Core/Logger";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.isInternalException) {
      ctx.response.status(error.status).send({
        code: error.code,
        message: error.log || "An internal error occurred",
      });
      if (error.log) {
        Logger.error(error.log);
      }
      return;
    }
  }
}
