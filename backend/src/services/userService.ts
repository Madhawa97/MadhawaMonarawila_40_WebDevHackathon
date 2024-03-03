// userService.ts
import { Schema } from "mongoose";
import Comment, { IComment } from "../models/Comment";
import Recipe, { IRecipe } from "../models/Recipe";
import User, { IUser } from "../models/User";

const userService = {
  getUserById: async (userId: string): Promise<IUser | null> => {
    const user = await User.findOne(
      { _id: userId },
      { _id: 1, firstName: 1, lastName: 1, userName: 1, email: 1, role: 1 }
    );
    if (!user) {
      return null;
    }
    return user;
  },
  getRecipeByMe: async (userId: string): Promise<IRecipe[]> => {
    const recipies = await Recipe.find({ user: userId });
    return recipies;
  },
  getAllRecipies: async (): Promise<IRecipe[]> => {
    const recipies = await Recipe.find();
    return recipies;
  },
  createRecipe: async (
    name: string,
    ingredients: string,
    instructions: string,
    timeToCookInMins: number,
    rating: number,
    userId: Schema.Types.ObjectId
  ): Promise<IRecipe> => {
    const recipe = new Recipe({
      name: name,
      ingredients: ingredients,
      instructions: instructions,
      timeToCookInMins: timeToCookInMins,
      rating: rating,
      user: userId
    });

    await recipe.save();
    return recipe;
  },
  createComment: async (
    content: string,
    userId: Schema.Types.ObjectId,
    recipe: Schema.Types.ObjectId
  ): Promise<IComment> => {
    const comment = new Comment({
      content: content,
      user: userId,
      recipe: recipe
    });

    await comment.save();
    return comment;
  },
};

export default userService;
