var http =require('http');
const axios = require('axios')
var pages = require('./mypages')
var fs = require('fs')

http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method+ " "+req.url+" "+d)
    if (req.url=="/pessoas"){
        axios.get("http://localhost:3000/pessoas?_sort=nome&_order=asc").then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })}
    else if(req.url == "/ordDesc"){
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var pessoas = resp.data
            let pessoasOrdenadas = pessoas.sort(
                (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
            )
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoasOrdenadas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })}
    else if (req.url.match(/w3\.css$/)){
        fs.readFile('w3.css', function(err,data){
            res.writeHead(200,{'Content-Type':'text/css; charset=utf-8'});
            if (err){
                res.write("Erro na leitura do ficheiro: "+ err)
            }
            else res.write(data)
            res.end()})        
    }
    else if(req.url.match(/pessoas\/\d+/)){
        axios.get("http://localhost:3000/pessoas/"+req.url.substring(9)).then(resp => {
            var pessoa = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genPeoplePage(pessoa,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })

    }
    else if(req.url=="/pessoas/sexo"){
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genSexDistribPage(pessoas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })
    }
    else if(req.url.match(/pessoas\/sexo\/\w+/)){
        axios.get("http://localhost:3000/pessoas?sexo="+req.url.substring(14)).then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoas,d,"Lista das pessoas do sexo "+req.url.substring(14)))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })

    }
    else if(req.url=="/pessoas/desporto"){
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genSportDistribPage(pessoas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })
    }
    else if(req.url.match(/pessoas\/desporto\/\w+/)){
        axios.get("http://localhost:3000/pessoas?desportos_like="+req.url.substring(18)).then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoas,d,"Lista das pessoas que praticam "+decodeURI(req.url.substring(18))))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })
    }
    else if(req.url=="/pessoas/profissao"){
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genTop10profissoes(pessoas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })
    }
    else if(req.url.match(/pessoas\/profissao\/\w+/)){
        axios.get("http://localhost:3000/pessoas?profissao="+req.url.substring(19)).then(resp => {
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoas,d,"Lista das pessoas cuja profissão é "+decodeURI(req.url.substring(19))))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })
    }
    else{
        res.writeHead(405,{'Content-Type':'text/css; charset=utf-8'})
        res.end("<p>ERRO: OPERAÇÃO NÃO SUPORTADA</p>")
    }
   
}).listen(7777);

console.log("Servidor à escuta na porta 7777...")