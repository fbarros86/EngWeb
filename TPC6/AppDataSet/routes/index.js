var express = require('express');
var router = express.Router();
var pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/pessoas', function(req, res, next) {
  pessoa.list()
    .then(pessoas=>{
      res.json(pessoas)
    })
    .catch(erro =>{
      res.json(erro)
    })
})

router.get('/pessoas/:id', function(req, res, next) {
  pessoa.getpessoa(req.params.id)
  .then(pessoa => {
    res.json(pessoa);
  })
  .catch(erro=>{
    res.json(erro);
  })
});


router.post('/pessoas', function(req, res, next) {
  pessoa.addpessoa(req.body).then(pessoa =>{
    console.log("json(pessoa)")
    res.json(pessoa);
  })
  .catch(erro=>{
    res.json(erro);

  })
});


router.put('/pessoas/:id', function(req, res, next) {
  pessoa.editpessoa(req.params.id, req.body).then(pessoa =>{
    res.json(pessoa);
  })
  .catch(erro=>{
    res.json(erro);
  })
});

router.delete('/pessoas/:id', function(req, res, next) {
  pessoa.deletepessoa(req.params.id).then(pessoa  =>{
    res.json(pessoa);
  })
  .catch(erro=>{
    res.json(erro);
  })
});

module.exports = router;
