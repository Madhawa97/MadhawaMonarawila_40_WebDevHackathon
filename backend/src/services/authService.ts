import User from "../models/User";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

require("dotenv").config();

const authService = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<User | null> => {
    const user = await User.findOne({ email });
    if (user) {
      return null;
    }
    const newUser = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: "user",
    });

    await newUser.save();
    return newUser;
  },
  login: async (userData: any): Promise<string | null> => {
    const { email, password } = userData;
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // !

    if (!passwordMatch) {
      return null;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "8h",
      }
    );
    return token;
  },
};

export default authService;
