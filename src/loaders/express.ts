import type { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config/index';
import bodyParser from 'body-parser';
import router from '../routes/index';

export default async ({ app }: { app: Express }): Promise<void> => {
  /* ------------------ HEALTH CHECK API's ------------------------ */
  app.get('/status', (req: Request, res: Response) =>
    res.sendStatus(200).end()
  );
  app.head('/status', (req: Request, res: Response) =>
    res.sendStatus(200).end()
  );
  app.enable('trust proxy');

  /* ----------------------- MIDDLEWARES ---------------------------- */
  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  );
  app.use(
    cors({
      origin: 'https://microgreensui.netlify.app/',
      credentials: true
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(router);
  app
    .listen(config?.port, () => {
      console.log(`Server running on ${config?.port}`);
    })
    .on('error', (error) => {
      console.log(error.message);
      process.exit(1);
    });
};
