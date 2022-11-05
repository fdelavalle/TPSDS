import mongoose, { Schema, model } from 'mongoose';

export interface User {
  _id: string;
  id: string;
  username: string;
  password: string;
  amountAvailable: number;
}

const userSchema = new Schema<User>({
  _id: { type: String, default: () => (new mongoose.Types.ObjectId()).toHexString() },
  username: { type: String, required: true },
  password: { type: String, required: true },
  amountAvailable: { type: Number, required: false, default: 10000 }
});

const UserModel = model<User>('User', userSchema);

export default UserModel;