import express, { urlencoded } from 'express';
import { config } from 'dotenv';

import routes from './routes/index';
import './config/db';
import './middleware/passportStretagy';
import errorHandle from './middleware/errorHandle';
import './models/studentModel';

config();
const app = express();

app.use(urlencoded());
app.use(routes);
app.use(errorHandle);

app.listen(9999);