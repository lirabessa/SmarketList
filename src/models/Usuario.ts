import mongoose from "mongoose";
import Lista from "./Lista";

const { Schema } = mongoose;

const usuario = new Schema({
    nome: String,
    email: String,
    senha: String,
    termos:{
        type: Boolean,
        default: false,
        required: true,
    },
    tipoUsuario:{
        type: String,
        enum: ['admin', 'usuario'],
        default: 'usuario'
    },
    listas:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: Lista
        }
    ],
    status:{
        type:String,
        enum:['ativo', 'inativo'],
        default: 'ativo'
    }
});
const Usuario = mongoose.model('usuarios', usuario);

export default Usuario;