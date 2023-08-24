import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
const port = 8080; // default port to listen
// Configure Express to use EJS
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
const PARENT = path.dirname(DIRNAME);
app.set("views", path.join(PARENT, "views"));
app.set("view engine", "ejs");
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.render("index");
});
// start the Express server
app.listen(port, () => {
    console.info(`server started at http://localhost:${port}`);
});