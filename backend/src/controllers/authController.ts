import { Request, Response } from "express";
import authService from "../services/authService";

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  try {
    const registeredUser = await authService.register(name, email, password);

    if (!registeredUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = await authService.login(req.body);
    if (!token) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // expires in 1hr
    });

    res.status(200).json({ message: "Successfully logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
