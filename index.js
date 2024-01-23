import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.listen(port, () => {
  console.log(`Server corriendo en puerto ${port}`);
});
