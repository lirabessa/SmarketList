import mongoose from "mongoose";
const {Schema} = mongoose;

const termos = new Schema({
    versao: String,
    opcoes: [{
        email: Boolean
    }],
    conteudo:{
        type: String,
    }
})

const Termo = mongoose.model ('termos', termos);

export default Termo;