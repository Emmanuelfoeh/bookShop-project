import express from "express";
import { OrderControllers } from "../../controllers/order/order.controller";

export const orderRouter = express.Router();
const { createOrder, getAllOrders, getOrder, getPaidOrder } = OrderControllers;

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:userId", getOrder);
orderRouter.get("/paidOrder", getPaidOrder);
