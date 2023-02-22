var http=require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res){
    var pedido = url.parse(req.url, true).pathname
    if(pedido == '/'){
        fs.readFile('index.html', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("Erro na leitura:"+ err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    else{
        fs.readFile(pedido.substring(1)+'.html',function(err, data){
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("Erro na leitura:"+ err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...")