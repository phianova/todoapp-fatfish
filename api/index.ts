
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes';
import serverless from 'serverless-http';
import cors from 'cors';

const app: express.Express = express();
// const port = process.env.PORT || 3000;

// api gateway:
// endpoints:
//   ANY - https://4wgjp9tm5d.execute-api.eu-west-1.amazonaws.com/dev/
//   ANY - https://4wgjp9tm5d.execute-api.eu-west-1.amazonaws.com/dev/{proxy+}
// functions:
//   api: todoapp-fatfish-dev-api (2.8 MB)

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());
app.use('/', router);
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
));

module.exports.handler = serverless(app)
export default app;