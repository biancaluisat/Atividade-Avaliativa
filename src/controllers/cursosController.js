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

    if(preco) {
        if(preco === "Gratuito") {
            resultado = resultado.filter(c => c.preco === 0);
        } else if (preco === "1-100") {
            resultado = resultado.filter(c => c.preco >= 1 && c.preco <= 50);
        } else if (preco === "50-100") {
            resultado = resultado.filter(c => c.preco > 50 && c.preco <= 100);
        } else if (preco === "+100") { 
            resultado = resultado.filter(c => c.preco > 100)
        };
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

const updateCurso = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, instrutor, categoria, duracao_minutos, preco, nivel, descricao } = req.body;
    const idParaEditar = id;

    if (isNaN(idParaEditar)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido."
        });
    };

    const cursoExiste = cursos.find(c => c.id === idParaEditar);

    if (!cursoExiste) {
        return res.status(404).json({
            success: false,
            message: "O curso não existe.",
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

    const cursoAtualizado = cursos.map(c => c.id === idParaEditar
        ? {
            ...c,
            ...(titulo && { titulo }),
            ...(instrutor && { instrutor }),
            ...(categoria && { categoria }),
            ...(duracao_minutos && { duracao_minutos: parseInt(duracao_minutos) }),
            ...(preco && { preco: parseInt(preco) }),
            ...(nivel && { nivel }),
            ...(descricao && { descricao })
        }
        : c
    );

    cursos.splice(0, cursos.length, ...cursoAtualizado);

    const cursoEditado = cursos.find(c => c.id === idParaEditar);

    res.status(200).json({
        success: true,
        data: cursoEditado
    });
};

export { getAllCursos, getCursoById, createCurso, deleteCurso, updateCurso };