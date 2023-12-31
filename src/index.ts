import express from 'express';
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import * as sessionAuth from "./middleware/session_auth.js";
import * as routes from "./routes/index.js";

dotenv.config();
const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );
const port = process.env.SERVER_PORT; // default port to listen

// Configure Express to use EJS
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
const PARENT = path.dirname(DIRNAME);
app.set( "views", path.join( PARENT, "views" ) );
app.set( "view engine", "ejs" );

// Configure session auth
sessionAuth.register( app );

// Configure routes
routes.register( app );

// start the Express server
app.listen(port, () => {
	console.info( `server started at http://localhost:${ port }` );
});

// Configure Express to use EJS
app.set( "views", path.join( DIRNAME, "views" ) );
app.set( "view engine", "ejs" );

// Configure Express to serve static files in the public folder
app.use( express.static( path.join( DIRNAME, "public" ) ) );