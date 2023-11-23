import mongoose from "mongoose";
import Lista from "./Lista";
import Termo from "./Termos";

const { Schema } = mongoose;

const usuario = new Schema({
    nome: String,
    email: String,
    senha: String,
    termos: {
        termo: {
            ref: Termo,
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        aceito: {
            type: Boolean,
            required: true,
        },
        opcoes: {
            email: {
                type: Boolean,
                default: false,
            },
        },
    },
    listas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Lista,
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
