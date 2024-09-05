import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class LogMailValidator {
  public schema = schema.create({
    domain: schema.string([
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
  });

  public messages = {
    "domain.required": "The domain is required.",
    "domain.minLength": "The domain must be at least 3 characters long.",
    "domain.maxLength": "The domain cannot be longer than 255 characters.",
  };
}
