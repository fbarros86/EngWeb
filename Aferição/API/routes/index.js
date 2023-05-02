var express = require('express');
var router = express.Router();
var Exame = require('../controler/exame')

/* GET home page. */
router.get('/', function(req, res, next) {
    Exame.listToda()
        .then(exames=>{
          res.json(exames)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter exames",error:erro })
        })
})


router.get('/emd', function(req, res, next) {
  if(req.query.res && (req.query.res=="ok"||req.query.res=="OK")){
    Exame.examesOK()
        .then(exames=>{
          res.json(exames)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter exames",error:erro })
        })
  }
  else if(req.query.modalidade){
    Exame.exameModalidade(req.query.modalidade)
        .then(exames=>{
          res.json(exames)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter exames",error:erro })
        })
  }
  else{
    Exame.list()
      .then(exames=>{
        res.json(exames)
      })
      .catch(erro=>{
        res.status(601).json({ message: "Erro a obter lista de exames",error:erro })
      })
  }
});

router.get('/emd/:id', function(req, res, next) {
  Exame.getExame(req.params.id)
    .then(exame=>{
      res.json(exame)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter exame",error:erro })
    })
});

router.get('/modalidades', function(req, res, next) {
  Exame.modalidades()
    .then(modalidades=>{
      res.json(modalidades)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter modalidades",error:erro })
    })
});


router.get('/atletas', function(req, res, next) {
  if(req.query.gen){
    Exame.atletasGenero(req.query.gen)
        .then(atletas=>{
          res.json(atletas)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter exames",error:erro })
        })
  }
  else if(req.query.clube){
    Exame.atletasClube(req.query.clube)
        .then(exames=>{
          res.json(exames)
        })
        .catch(erro=>{
          res.status(602).json({ message: "Erro a obter exames",error:erro })
        })
  }
  else{res.status(404).json({ message: "Not found",error:erro })
  }
});





module.exports = router;
