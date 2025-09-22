import express from "express";
import { createCurso, getAllCursos, getCursoById } from "../controllers/cursosController.js";

const router = express.Router();

router.get("/", getAllCursos);
router.get("/:id", getCursoById);
router.post("/", createCurso);

export default router;