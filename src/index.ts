import dotenv from "dotenv";
import express from "express";
// import "global-agent/bootstrap";
import globalTunnel from "global-tunnel-ng";
// import { Issuer } from "openid-client";
import path from "path";
import sessionAuth from "./middleware/sessionAuth";
import routes from "./routes";

// set to use HTTP and pick up proxy config?
// Issuer.useRequest();

// if behind proxy
// apply global node proxy using module global-tunnel-ng - only working for Node 8
// const proxy = "http://proxy.host.com:8080";
// process.env.http_proxy = proxy;
// process.env.https_proxy = proxy;
// if ENV HTTP_PROXY not set - global-tunnel-ng retrieves it from npm config
// globalTunnel.initialize();

// for use with module global-agent?
// process.env.GLOBAL_AGENT_HTTP_PROXY = "http://proxy.host.com:8080";
// process.env.GLOBAL_AGENT_HTTPS_PROXY = "http://proxy.host.com:8080";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure session auth
sessionAuth(app);

// Configure routes
routes(app);

// // define a route handler for the default home page
// app.get("/", (req, res) => {
//   // render the ejs index template
//   res.render("index");
// });

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
