import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { PORT, mongoDBurl } from './config';
import mongoose from 'mongoose';
import router from './routes/books.routes'

const app: Express = express();

app.use(express.json())
app.use(cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/', (req: Request, res: Response) => {
    console.log(req);
    return res.status(234).send('Hello, Hackir');
});

app.use('/books',router)

mongoose
    .connect(mongoDBurl)
    .then(()=>{
        console.log('mongo db connected.')
        app.listen(PORT, () => {
            console.log(`Node TS application is listening on port: ${PORT}`);
        });
    })
    .catch((e: Error)=>{
        console.log('mongoDB is not successfully :' + e.message)
    })

