import { Application, Request, Response } from "express";

export default function register(app: Application): void {
  const oidc = app.locals.oidc;

  // define a route handler for the default home page
  app.get("/", (req: any, res: Response) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render("index", { isAuthenticated: req.isAuthenticated(), user });
  });

  // define a secure route handler for the login page that redirects to /guitars
  app.get("/login", oidc.ensureAuthenticated(), (req: any, res: any) => {
    res.redirect("/guitars");
  });

  // define a route to handle logout
  app.get("/logout", (req: any, res: Response) => {
    req.logout();
    res.redirect("/");
  });

  // define a secure route handler for the guitars page
  app.get("/guitars", oidc.ensureAuthenticated(), (req: any, res: Response) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    res.render("guitars", { isAuthenticated: req.isAuthenticated(), user });
  });
}
