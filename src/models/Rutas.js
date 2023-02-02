import { Schema, model } from "mongoose";

const RutaSchema = new Schema({
    corigen: {type: String, require: true, trim: true},
    dorigen: {type: String, require: true, trim: true},
    cdestino: {type: String, require: true, trim: true},
    ddestino: {type: String, require: true, trim: true},
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Rutas', RutaSchema)