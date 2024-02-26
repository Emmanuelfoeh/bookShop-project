import { Schema, model } from "mongoose";
import Joi from "joi";
import { ObjectId } from "mongodb";

interface Order {
  userId: ObjectId;
  items: [];
  totalAmount: number;
  status: string;
  orderDate?: Date;
}

const orderSchema = new Schema<Order>({
  userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  items: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: "Books",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});
export const Order = model("Orders", orderSchema);
