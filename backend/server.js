import express from 'express';
import { connectDB } from './database/db.js';
import router from './controllers/notes.contorller.js';
import cors from "cors"

const app = express();
app.use(cors({
  origin: "*" ,
}))

app.use(express.json());
connectDB();
app.use('/api' , router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})