import express from 'express';
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";
dotenv.config();
const app = express();
const port = process.env.SERVER_PORT; // default port to listen
// Configure Express to use EJS
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
const PARENT = path.dirname(DIRNAME);
app.set("views", path.join(PARENT, "views"));
app.set("view engine", "ejs");
// Configure session auth
sessionAuth.register(app);
// Configure routes
routes.register(app);
// start the Express server
app.listen(port, () => {
    console.info(`server started at http://localhost:${port}`);
});
