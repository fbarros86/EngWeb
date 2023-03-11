var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var toDoServer = http.createServer(function (req, res) {
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.todolist(tasks))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas a fazer... Erro: " + erro)
                            res.end()
                        })
                }
                else if(/\/done\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tasks/"+idTask)
                        .then(response => {
                            var task = response.data
                            task.done = 1
                            axios.put("http://localhost:3000/tasks/" + idTask,task)
                                .then( response => {
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.todolist(tasks))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de tarefas a fazer... Erro: " + erro)
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    console.log("Erro a atualizar tarefa: "+ erro)
                                })
                                    
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a tarefas a atualizar... Erro: " + erro)
                            res.end()
                        })
                    
                }
                else if(/\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tasks/"+idTask)
                        .then(response =>{
                            var task = response.data
                            axios.get("http://localhost:3000/tasks")
                                .then(response => {
                                    var tasks = response.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.todolist(tasks,task))
                                    res.end()
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tarefas a fazer... Erro: " + erro)
                                    res.end()
                                })

                        })
                        .catch(err=>{
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a tarefas a atualizar... Erro: " + erro)
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/tasks/",result)
                                .then( response => {
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.todolist(tasks))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de tarefas a fazer... Erro: " + erro)
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    console.log("Erro: "+ erro)
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                })}
                else if(/\/edit\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put("http://localhost:3000/tasks/"+result.id,result)
                                .then( response => {
                                    axios.get("http://localhost:3000/tasks")
                                        .then(response => {
                                            var tasks = response.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.todolist(tasks))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Não foi possível obter a lista de tarefas a fazer... Erro: " + erro)
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    console.log("Erro a atualizar task: "+ erro)
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                })}
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

toDoServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})