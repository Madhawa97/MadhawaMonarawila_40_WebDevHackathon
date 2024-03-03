import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  content: string;
  user: string;
  recipe: string;
}

const commentSchema = new mongoose.Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;