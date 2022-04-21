const express = require('express');
const server = express();

// Para aceita que user envie json para nossa aplicação
server.use(express.json());

const port = process.env.PORT || 3000;



const cursos = ['NodeJS', 'JS', 'React Native', 'PHP', 'Java', 'Angular'];

function checkCurso (req, res, next) {

    if(!req.body.name){
        return res.status(400).json({ error: 'Nome do curso e obrigatorio'});
    }
    return next();
}
function CheckIndexCurso (req, res, next) {
    const { index } = req.params;
    const curso = cursos[index];
    if(!cursos[index]){
        return res.status(400).json({ error: 'Curso não encontrado'});
    }

    req.curso = curso
    return next();
}


// Rteunr todos os cursos
server.get('/cursos', (req, res) => {
    return res.json({
        cursos
    })
})

server.get('/cursos/:index', CheckIndexCurso, (req, res)=>{
    return res.json({
        message: `seu curso é ${req.curso}`
    });
})


//Criando um novo curso
server.post('/cursos',checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);
    return res.json({
        cursos
    })
})


//Atualizando um curso
server.put('/cursos/:index',checkCurso, CheckIndexCurso, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;
    cursos[index] = name;
    return res.json({
        cursos
    })
})

//Deletando um curso
server.delete('/cursos/:index', CheckIndexCurso, (req, res) => {
    const {index} = req.params;
    cursos.splice(index, 1);
    return res.json({
        cursos
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})