import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  fristName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  password: String,
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
},{
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;