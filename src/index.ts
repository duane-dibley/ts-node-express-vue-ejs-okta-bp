import dotenv from "dotenv";
import express from "express";
// import globalTunnel from "global-tunnel-ng";
import path from "path";
import sessionAuth from "./middleware/sessionAuth";
import routes from "./routes";

// initialize environment variales from .env
dotenv.config();

// if behind proxy
// apply global node proxy using module global-tunnel-ng - only working for Node 8
// if ENV HTTP_PROXY not set - global-tunnel-ng retrieves it from npm config
// globalTunnel.initialize();

const app = express();
app.use(express.json());

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure Express to serve static files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// Configure session auth
sessionAuth(app);

// Configure routes
routes(app);

// start the Express server
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
