import { Request, Response } from "express";
import authService from "../services/authService";

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, userName, email, password } = req.body;

  if (!firstName || !lastName || !userName || !email || !password) {
    res
      .status(404)
      .json({
        message:
          "All feilds including firstName, lastName, userName, email, and password are required",
      });
    return;
  }
  try {
    const { user, message } = await authService.register(
      firstName,
      lastName,
      userName,
      email,
      password
    );

    if (!user) {
      res.status(400).json({ message });
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
    const { userName, password } = req.body;

  if ( !userName || !password) {
    res
      .status(404)
      .json({
        message:
          "All feilds ; userName and password are required",
      });
    return;
  }
    const { token, message } = await authService.login({userName, password});
    if (!token) {
      res.status(401).json({ message });
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
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};
