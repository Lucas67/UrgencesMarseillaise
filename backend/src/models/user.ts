import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY as string, { expiresIn: '7d' });
};

const User = model<IUser>('User', userSchema);
export default User;
