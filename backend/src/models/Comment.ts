import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  content: string;
  user: string;
  recipe: string;
}

const commentSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
  timeToCookInMins: Number,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: Number,
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;