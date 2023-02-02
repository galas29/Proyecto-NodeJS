import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";



const ChoferSchema = new Schema({
    name: {type: String, trim: true },
    rut: {type: String, require: true, trim: true},
    patente: {type: String, require: true, trim: true},
    marca: {type: String, require: true, trim: true},
    modelo: {type: String, require: true, trim: true},
    fecha: {type: String, require: true, trim: true},
    password: {type: String, require: true, trim: true}
},
    {
        timestamps: true,
        versionKey: false
    }
);

ChoferSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

ChoferSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default model('Chofer', ChoferSchema)
