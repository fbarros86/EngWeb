var express = require('express');
var router = express.Router();
var Task = require('../controler/task')


/* GET home page. */
router.get('/', function(req, res, next) {
  Task.list()
    .then(t=>{
      res.render('index', { tasks: t})
    })
    .catch(erro=>{
      res.render('error', { message: "Erro a obter lista de tarefas",error:erro })
    })
});

/* GET done page. */
router.get('/done/:idTask', function(req, res, next) {
  Task.getTask(req.params.idTask)
    .then(t=>{
      t.done=1
      Task.editTask(t)
        .then(_=>{
          res.redirect("/")
        })
        .catch(erro=>{
          res.render('error', { message: "Erro a atualizar tarefa",error:erro })
        })
    })
    .catch(erro=>{
      res.render('error', { message: "Erro a obter tarefa",error:erro })
    })
});

router.get('/edit/:idTask', function(req, res, next) {
  Task.list()
    .then(ts=>{
      Task.getTask(req.params.idTask)
        .then(t=>{
          res.render('index', {tasks:ts,tasktoedit:t})
        })
        .catch(erro=>{
          res.render('error', { message: "Erro a obter tarefa",error:erro })
        })
    })
    .catch(erro=>{
      res.render('error', { message: "Erro a obter lista de tarefas",error:erro })
    })
});



router.post('/', function(req, res, next) {
  Task.addTask(req.body)
    .then(t=>{
      res.redirect("/")
    })
    .catch(erro=>{
      res.render('error', { message: "Erro a obter lista de tarefas",error:erro })
    })
});


router.post('/edit/:idTask', function(req, res, next) {
  Task.editTask(req.body)
    .then(t=>{
      res.redirect("/")
    })
    .catch(erro=>{
      res.render('error', { message: "Erro a obter lista de tarefas",error:erro })
    })
});

module.exports = router;
