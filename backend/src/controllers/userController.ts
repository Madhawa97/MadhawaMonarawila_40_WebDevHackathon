import { Request, Response } from "express";
import userService from "../services/userService";
import { Schema } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: { userId: string; email: string; role: string };
  cookies: { token?: string };
}
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.userId) {
      const { userId } = req.user;
      const userData = await userService.getUserById(userId);
      res.status(200).json({ message: "Success", user: userData });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserRecipes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const kind = req.query.kind;

    if (kind === "me" && req?.user?.userId) {
      const recipies = await userService.getRecipeByMe(req.user.userId);
      res.status(200).json({ message: "Success", recipies });
    } else if (kind === "all") {
      const recipies = await userService.getAllRecipies();
      res.status(200).json({ message: "Success", recipies });
    } else {
      res.status(404).json({ message: "Param not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createRecipe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.userId) {
      const { userId } = req.user;

      const { name, ingredients, instructions, timeToCookInMins, rating } =
        req.body;

      if (
        !name ||
        !ingredients ||
        !instructions ||
        !timeToCookInMins ||
        !rating
      ) {
        res.status(404).json({ message: "Some fields not found" });
        return;
      }

      const recipie = await userService.createRecipe(
        name,
        ingredients,
        instructions,
        timeToCookInMins,
        rating,
        userId as unknown as Schema.Types.ObjectId 
      );

      res.status(200).json({message: "Success", recipie})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.userId) {
      const { userId } = req.user;

      const { content, recipe } =
        req.body;

      if (
        !content ||
        !recipe
      ) {
        res.status(404).json({ message: "Some fields not found" });
        return;
      }

      const recipie = await userService.createComment(
        content, userId as unknown as Schema.Types.ObjectId, recipe
      );

      res.status(200).json({message: "Success", recipie})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
