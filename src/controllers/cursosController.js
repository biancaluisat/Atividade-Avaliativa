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

    if (!curso) {
        res.status(404).json({
            success: false,
            message: `Id ${id} não encontrado.`
        });
};

    res.status(200).json({
        total: curso.length,
        data: curso
    });
};

const createCurso = (req, res) => {
    const { titulo, instrutor, categoria, duracao, preco, nivel, descricao } = req.body;

    if (!titulo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'titulo' é obrigatório"
        });
    }
    
    if (!instrutor) {
        return res.status(400).json({
            success: false,
            message: "O campo 'instrutor' é obrigatório"
        });
    }
    
    if (!categoria) {
        return res.status(400).json({
            success: false,
            message: "O campo 'categoria' é obrigatório"
        });
    }
    
    if (!duracao) {
        return res.status(400).json({
            success: false,
            message: "O campo 'duracao' é obrigatório"
        });
    }
    
    if (!preco) {
        return res.status(400).json({
            success: false,
            message: "O campo 'preco' é obrigatório"
        });
    }
    
    if (!nivel) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nivel' é obrigatório"
        });
    }
    
    if (!descricao) {
        return res.status(400).json({
            success: false,
            message: "O campo 'descricao' é obrigatório"
        });
    };

    if (preco < 0) {
        return res.status(400).json({
            success: false,
            message: "O preço não pode ser negativo."
        });
    };

    if (duracao < 60) {
        return res.status(400).json({
            success: false,
            message: "O curso deve ter mais de uma hora."
        });
    };

    const novoCurso = {
        id: cursos.length +1,
        titulo,
        instrutor,
        categoria,
        duracao_minutos: parseInt(duracao_minutos),
        preco: parseInt(preco),
        nivel,
        descricao
    }
}

export { getAllCursos, getCursoById, createCurso };