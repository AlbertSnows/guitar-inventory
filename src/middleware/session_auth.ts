import pkg from "@okta/oidc-middleware";
import session from "express-session";
import { Request, Response, NextFunction } from 'express';

const { ExpressOIDC } = pkg;
export const register = ( app: any ) => {
    // Middleware function
function myMiddleware(req: Request, res: Response, next: NextFunction) {
    // Do something before passing the request to the next middleware or route handler
    console.log('Middleware is executing...');
    next(); // Call next() to pass control to the next middleware or route handler
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express!');
});


    // Create the OIDC client
    // const oidc = new ExpressOIDC( {
    //     client_id: process.env.OKTA_CLIENT_ID,
    //     client_secret: process.env.OKTA_CLIENT_SECRET,
    //     issuer: `${ process.env.OKTA_ORG_URL }/oauth2/default`,
    //     redirect_uri: `${ process.env.HOST_URL }/authorization-code/callback`,
    //     appBaseUrl:`${ process.env.HOST_URL }`,
    //     scope: "openid profile"
    // } );

    // Configure Express to use authentication sessions
    // app.use( session( {
    //     resave: true,
    //     saveUninitialized: false,
    //     secret: process.env.SESSION_SECRET ?? ["foo"]
    // } ) );

    // // Configure Express to use the OIDC client router
    // app.use( oidc.router );

    // add the OIDC client to the app.locals
    // app.locals.oidc = oidc;
};