import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

require("dotenv").config();

const authService = {
  register: async (
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
  ): Promise<{ user: IUser | null; message?: string }> => {
    const userWithUserName = await User.findOne({ userName });
    if (userWithUserName) {
      return { user: null, message: "Username is already taken" };
    }
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return { user: null, message: "Email is already in use" };
    }
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: "user",
    });

    await newUser.save();
    return { user: newUser };
  },
  login: async (
    userData: any
  ): Promise<{ token: string | null; message?: string }> => {
    const { userName, password } = userData;
    const user = await User.findOne({ userName });

    if (!user) {
      return { token: null, message: "Username doesn't exist" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // !

    if (!passwordMatch) {
      return { token: null, message: "Password doesn't match" };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "8h",
      }
    );
    return { token };
  },
};

export default authService;
