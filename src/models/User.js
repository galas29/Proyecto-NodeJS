import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new Schema({
    name: {type: String, trim: true},
    rut: {type: String, require: true, unique: true, trim: true},
    correo: {type: String, require: true, unique: true, trim: true},
    password: {type: String, require: true, unique: true, trim: true},
    sexo: {type: String, require: true}
},
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default model('User', UserSchema);