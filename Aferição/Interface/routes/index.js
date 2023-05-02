var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:7777/api/")
    .then(dados=>{
      res.render('index', { exames: dados.data });
    })
    .catch(erro=>{
    
      res.render('error', { error: erro,message:"Erro a obter lista de exames" });
    })
});

router.get('/exames/:id', function(req, res, next) {
  axios.get("http://localhost:7777/api/emd/"+req.params.id)
      .then(dados=>{
        //console.log(JSON.stringify(dados))
        res.render('exame', { exame: dados.data });
      })
      .catch(erro=>{
    
      })

  
});

module.exports = router;
