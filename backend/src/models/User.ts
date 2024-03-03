import mongoose, { Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
});

const User = mongoose.model<User>('User', userSchema);

export default User;