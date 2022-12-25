import {Express, Request} from "express";
import { withAuthentication, AuditsClient, FronteggContext, FronteggAuthenticator } from '@frontegg/client';

FronteggContext.init({
    FRONTEGG_API_KEY: <string>process.env.FRONTEGG_API_KEY,
    FRONTEGG_CLIENT_ID: <string>process.env.FRONTEGG_CLIENT_ID
});
const authenticator = new FronteggAuthenticator();
authenticator.init(FronteggContext.getContext().FRONTEGG_CLIENT_ID, FronteggContext.getContext().FRONTEGG_API_KEY);

export default (app: Express) => {
    // @ts-ignore
    app.get('/public', (req, res) => {
        res.status(200).send('Public route works');
    });

    // @ts-ignore
    app.get('/protected', withAuthentication({permissions: ['fe.secure.write.tenantInvites']}), async (req:Request, res) => {
        const audits = new AuditsClient();
        await audits.init(FronteggContext.getContext().FRONTEGG_CLIENT_ID, FronteggContext.getContext().FRONTEGG_API_KEY);

        // @ts-ignore
        console.log(req.frontegg);
        try {
        } catch (e) {
            console.log(e);
        }
        res.status(200).send('Protected route works');
    });
}