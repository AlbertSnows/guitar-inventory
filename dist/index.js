import express from 'express';
import path from "path";
const app = express();
const port = 8080; // default port to listen
// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
// start the Express server
app.listen(port, () => {
    console.info(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map