import express, { urlencoded, Express } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import * as routes from './routes/index';
import './config/db';
import './middleware/passportStretagy';
import errorHandle from './middleware/errorHandle';

config();

const PORT = process.env.PORT || 9999;

export class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors({
      optionsSuccessStatus: 200
    }));
    this.app.use(urlencoded({
      extended: true
    }));
    routes.initRoutes(this.app);
    this.app.use(errorHandle);
    this.app.listen(PORT);
  }
}

new Server();