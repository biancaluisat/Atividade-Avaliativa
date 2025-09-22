import express from "express";
import dotenv from "dotenv";
import cursosRoutes from "./src/routes/cursosRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Servidor Online!");
});

app.use("/cursos", cursosRoutes);

app.listen(serverPort, () => {
  console.log(`Server ON! http://localhost:${serverPort}`);
});
