import { Schema, model } from "mongoose";
import Joi from "joi";

//validation schema
export const UserSchemaValidate = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  userName: Joi.string().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
});

//creating an interface
interface User {
  firstName?: string;
  lastName?: string;
  role: string;
  email: string;
  userName: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating a model
export const Users = model<User>("Users", userSchema);
