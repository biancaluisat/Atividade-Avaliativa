import dados from "../models/dados.js";

const { cursos } = dados;

const getAllCursos = (req, res) => {
    let resultado = cursos;

    const { categoria, instrutor, preco, nivel  } = req.query;

    if (categoria) {
        resultado = resultado.filter(
            (c) => c.categoria.toLowerCase() === categoria.toLowerCase()
        );
    };

    if (instrutor) {
        resultado = resultado.filter(
            (i) => i.instrutor.toLowerCase() === instrutor.toLowerCase()
        );
    };

    if (nivel) {
        resultado = resultado.filter(
            (n) => n.nivel.toLowerCase() === nivel.toLowerCase()
        );
    };

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
};

const getCursoById = (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursos.find((c) => c.id === id);

    
}

export { getAllCursos };