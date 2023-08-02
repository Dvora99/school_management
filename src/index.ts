import express, { urlencoded } from 'express';
import { config } from 'dotenv';

import routes from './routes/index';
import './config/db';
import './middleware/passportStretagy';
import errorHandle from './middleware/errorHandle';

config();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandle);

app.listen(process.env.PORT);