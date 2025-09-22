import express from "express";
import { getAllCursos, getCursoById } from "../controllers/cursosController.js";

const router = express.Router();

router.get("/", getAllCursos);
router.get("/:id", getCursoById);

export default router;