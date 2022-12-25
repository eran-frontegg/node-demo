import 'dotenv/config';
import express from 'express';
import configExpress from './config/express';

async function bootstrap() {
    const app = express();

    configExpress(app);

    app.listen(process.env.PORT ?? 8080, () => {
        console.log(`Server is up and running. Listening on http://localhost:${process.env.PORT ?? 8080}`);
    });
}

bootstrap();