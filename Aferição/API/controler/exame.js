var Exame = require('../models/exame')

// Exame lis
module.exports.listToda = () =>{
    return Exame.find()
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.list = () =>{
    return Exame.find({},{"nome":1,"data":1,"resultado":1})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getExame = id =>{
    return Exame.findOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.modalidades = id =>{
    return Exame.distinct("modalidade")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.examesOK = () =>{
    return Exame.find({"resultado":true})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.exameModalidade = (modalidade) =>{
    return Exame.find({"modalidade":modalidade})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}


module.exports.atletasGenero = (genero) =>{
    return Exame.find({"género":genero},{"nome":1,"_id":0}).sort("nome.primeiro nome.segundo")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.atletasClube = (clube) =>{
    return Exame.find({"clube":clube},{"nome":1,"_id":0}).sort("nome.primeiro nome.segundo")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}