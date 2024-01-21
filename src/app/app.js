import router from '../routes/index.js';
import express from 'express';
import cors from "cors";

const app = express();
var corsOptions = {
    origin: "http://localhost:5173"
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);


export default app;