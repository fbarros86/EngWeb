var mongoose = require('mongoose');


var exameSchema = new mongoose.Schema({
        _id: String,
        index:Number,
        dataEMD:String,
        nome:{primeiro:String,ultimo:String},
        idade:Number,
        género:String,
        Morada:String,
        Modalidade:String,
        Clube:String,
        Email:String,
        Federado:Boolean,
        Resultado:Boolean
    });


module.exports = new mongoose.model('exame',exameSchema);