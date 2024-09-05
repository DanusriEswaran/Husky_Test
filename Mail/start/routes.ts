import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/send", "AxiosMailsController.sendMail");
  Route.post("/logs", "AxiosMailsController.logMail");
}).prefix("/axios");

Route.group(() => {
  Route.post("/send", "PackageMailsController.sendMail");
  Route.post("/logs", "PackageMailsController.logMail");
}).prefix("/package");

//default
Route.get("/", async () => {
  return { hello: "world" };
});
