import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import sequelize from "./config/database.js";

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);


sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Tablas sincronizadas (alter)");
    app.listen(port, () => {
      console.log(`🚀 Server corriendo en puerto ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Error al sincronizar la DB:", err);
  });
app.listen(port, () => {
  console.log(`Server corriendo en puerto ${port}`);
});
