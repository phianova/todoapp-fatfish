
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes';

const app: express.Express = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

export default app;