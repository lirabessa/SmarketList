import mongoose from "mongoose";
import Termo from "./Termos";
import Usuario from "./Usuario";

const { Schema } = mongoose;

const historico = new Schema({
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Usuario
    },
    termos: {
        opcoes: {
            email: {
                type: Boolean,
                default: false,
            },
        },
    },
});

const Historico = mongoose.model('historicos', historico);

export default Historico;
