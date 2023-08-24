import * as express from "express";
import * as pkg from "pg-promise";
import pgPromise from "pg-promise";
const { ParameterizedQuery } = pkg;

export const register = ( app: express.Application ) => {
    const port = parseInt( process.env.PGPORT || "5432", 10 );
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };

    const pgp = pgPromise();
    const db = pgp( config );

    app.get( `/api/guitars/all`, async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const guitars = await db.any( `
                SELECT
                    id
                    , brand
                    , model
                    , year
                    , color
                FROM    guitars
                WHERE   user_id = $1
                ORDER BY year, brand, model`, [ userId ] );
            return res.json( guitars );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            return res.json( { error: (err as Error).message || err } );
        }
    } );

    app.post( `/api/guitars/add`, async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const { brand, model, year, color } = req.body;
            const addGuitar = new ParameterizedQuery( { text: `
                INSERT INTO guitars(user_id, brand, model, year, color)
                VALUES($1, $2, $3, $4, $5)
                RETURNING id;
            `,
            values: [ userId, brand, model, year, color ]
            } );
            const id = await db.one( addGuitar );
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            return res.json( { error: (err as Error).message || err } );
        }
    } );

    app.delete( `/api/guitars/remove/:id`, async ( req: any, res ) => {
        try {
            const userId = req.userContext.userinfo.sub;
            const id = await db.result( `
                DELETE
                FROM    guitars
                WHERE   user_id = $1
                AND     id = $2`,
                [ userId, req.params.id ],
                ( r: any ) => r.rowCount );
            return res.json( { id } );
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            return res.json( { error: (err as Error).message || err } );
        }
    } );
};