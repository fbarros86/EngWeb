var Pessoa = require('../models/pessoa')

// pessoa list
module.exports.list = () => {
    return Pessoa
    .find()
    .sort({nome:1})
    .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getpessoa = (id) => {
    return Pessoa.findOne({_id: id})
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.addpessoa = (pessoa) => {
    return Pessoa.collection.insertOne(pessoa)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.editpessoa = (id,pessoa) => {
    return Pessoa.updateOne({_id : id},pessoa)
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.deletepessoa = (id) => {
    return Pessoa.deleteOne({_id:id})
        .then(dados =>{
            return dados
        })
        .catch(erro =>{
            return erro
        })
}