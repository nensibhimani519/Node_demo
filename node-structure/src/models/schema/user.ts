import { Schema } from "mongoose";
import config from "config";
import { encrypt } from "../../helper/encription";
import jwt from "jsonwebtoken";

export const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, 'Name is required.'] },
    email: { type: String, required: [true, 'Email is  required.'], unique: [true, 'Email is already exists.'] },
    password: { type: String, required: [true, 'Password is required.'] },
    status: { type: Boolean, default: "" }
}, { collection: 'user' });

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ uid: this._id }, config.get('jwtPrivateKey'));
    return encrypt(token);
}