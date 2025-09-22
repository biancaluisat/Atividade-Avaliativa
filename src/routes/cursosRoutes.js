import express from "express";
import { createCurso, getAllCursos, getCursoById, deleteCurso } from "../controllers/cursosController.js";

const router = express.Router();

router.get("/", getAllCursos);
router.get("/:id", getCursoById);
router.post("/", createCurso);
router.delete("/:id", deleteCurso);

export default router;