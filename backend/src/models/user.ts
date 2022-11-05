import { Schema, model } from 'mongoose';
// @ts-ignore
import mongooseLeanId from 'mongoose-lean-id';

export interface User {
  _id: string;
  username: string;
  password: string;
  amountAvailable: number;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  amountAvailable: { type: Number, required: false, default: 10000 }
});

userSchema.plugin(mongooseLeanId);

const UserModel = model<User>('User', userSchema);

export default UserModel;