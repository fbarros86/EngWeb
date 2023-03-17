axios = require('axios')

// Tasks list
module.exports.list = () =>{
    return axios.get('http://localhost:3000/tasks')
                .then(resposta=> {
                    return resposta.data
                })
                .catch(erro=>{
                    return erro
                })
}


// Task
module.exports.getTask = idTask =>{
    return axios.get('http://localhost:3000/tasks/'+idTask)
                .then(resposta=> {
                    return resposta.data
                })
                .catch(erro=>{
                    return erro
                })
}

// Add task
module.exports.addTask = task =>{
    return axios.post('http://localhost:3000/tasks',task)
                .then(resposta=> {
                    return resposta.data
                })
                .catch(erro=>{
                    return erro
                })
}

// Edit task
module.exports.editTask = task =>{
    return axios.put('http://localhost:3000/tasks/'+task.id,task)
                .then(resposta=> {
                    return resposta.data
                })
                .catch(erro=>{
                    return erro
                })
}