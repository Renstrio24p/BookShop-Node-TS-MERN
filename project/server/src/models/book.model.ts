import mongoose, { Document, Model } from "mongoose";

interface IBook extends Document {
  name: string;
}

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  }
},
{
    timestamps: true,   
});

export const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);


