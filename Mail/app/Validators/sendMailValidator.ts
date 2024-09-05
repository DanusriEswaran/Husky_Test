import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class SendMailValidator {
  public schema = schema.create({
    to: schema.string({}, [rules.required()]),
    subject: schema.string({}, [rules.maxLength(255), rules.required()]),
    template: schema.string({}, [rules.required()]),
    variables: schema.object.optional().anyMembers(),
  });

  public messages = {
    "to.required": "Recipient email is required",
    "to.email": "Recipient email must be a valid email address",
    "subject.required": "Subject is required",
    "subject.maxLength": "Subject cannot exceed 255 characters",
    "template.required": "Template is required",
  };
}
