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
    const { titulo, instrutor, categoria, duracao_minutos, preco, nivel, descricao } = req.body;

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
    
    if (!duracao_minutos) {
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

    if (duracao_minutos < 60) {
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
    };

    cursos.push(novoCurso);

    res.status(201).json({
        success: true,
        data: novoCurso 
    });

};

const deleteCurso = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido."
        });
    };

    const idParaApagar = parseInt(id);
    const cursoParaRemover = cursos.find(c => c.id === idParaApagar);

    if (!cursoParaRemover) {
        return res.status(404).json({
            success: false,
            message: "O id não exite."
        });
    };

    const cursoFiltrado = cursos.filter(c => c.id != id);

    cursos.splice(0, cursos.length, ...cursoFiltrado);

    return res.status(200).json({
        success: true,
        message: "O curso foi removido com sucesso."
    });

};

export { getAllCursos, getCursoById, createCurso, deleteCurso };