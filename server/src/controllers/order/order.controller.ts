import { Request, Response } from "express";
import { OrderServices } from "../../services/order/order.service";

const { createOrder, getOrder, getOrders, getPaidOrder } = OrderServices;

class OrderController {
  createOrder = async (req: Request, res: Response) => {
    const order = {
      userId: req.body.userId,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status:req.body.status
    };

    try {
      const newOrder = await createOrder(order);
      res.status(201).send(newOrder);
    } catch (error: any) {
      res.status(500).send(error);
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = await getOrders();
      return res.status(200).send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  getOrder = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const order = await getOrder(userId);
      return res.status(200).send(order);
    } catch (error) {
      console.log("error getting order for user", error);
      return res.status(500).send(error);
    }
  };

  getPaidOrder = async (req: Request, res: Response) => {
    try {
      const paidOrders = await getPaidOrder();
      return res.status(200).send(paidOrders);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

export const OrderControllers = new OrderController();
