import mongoose, { Document, Schema } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  ingredients: string;
  instructions: string;
  timeToCookInMins: number;
  user: string;
  rating: number;
}

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
  timeToCookInMins: Number,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: Number,
});

const Recipe = mongoose.model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
