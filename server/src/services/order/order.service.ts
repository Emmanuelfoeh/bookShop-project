import { Order } from "../../model/order/order.model";

export class OrderService {
  // Create a new order
  async createOrder(data: any) {
    try {
      const newOrder = await Order.create(data);
      return newOrder;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getOrder(userId: string) {
    try {
      const userOrder = await Order.find({ userId })
        .populate({
          path: "userId",
          model: "Users",
          select: "firstName lastName email",
        })
        .populate({
          path: "items.bookId",
          model: "Books",
        });;
      return userOrder;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }
  async getOrders() {
    try {
      const orders = await Order.find()
        .populate({
          path: "userId",
          model: "Users",
          select: "firstName lastName email",
        })
        .populate({
          path: "items.bookId",
          model: "Books",
        });
      return orders;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getPaidOrder() {
    try {
      const paidOrders = await Order.find({ status: "Paid" })
        .populate({
          path: "userId",
          model: "Users",
          select: "firstName lastName email",
        })
        .populate({
          path: "items.bookId",
          model: "Books",
        });
      return paidOrders;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const OrderServices = new OrderService();
