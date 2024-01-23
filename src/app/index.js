import router from '../api/index.js';
import express from 'express';
import cors from "cors";

const app = express();
var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);


export default app;