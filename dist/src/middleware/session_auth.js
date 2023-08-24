import pkg from "@okta/oidc-middleware";
import session from "express-session";
const { ExpressOIDC } = pkg;
export const register = (app) => {
    var _a;
    // Create the OIDC client
    const oidc = new ExpressOIDC({
        client_id: process.env.OKTA_CLIENT_ID,
        client_secret: process.env.OKTA_CLIENT_SECRET,
        issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
        redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
        appBaseUrl: `${process.env.HOST_URL}`,
        scope: "openid profile"
    });
    // Configure Express to use authentication sessions
    app.use(session({
        resave: true,
        saveUninitialized: false,
        secret: (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : ["foo"]
    }));
    // Configure Express to use the OIDC client router
    app.use(oidc.router);
    // add the OIDC client to the app.locals
    app.locals.oidc = oidc;
};
