import { Schema, model } from "mongoose";
import Joi from "joi";

//validation schema
export const BookSchemaValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  picture: Joi.string(),
});

//creating an interface
interface Book {
  title: string;
  description: string;
  quantity: number;
  price: number;
  picture: string;
}

const bookSchema = new Schema<Book>({
  title: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
});

//creating a model
export const Books = model<Book>("Books", bookSchema);
