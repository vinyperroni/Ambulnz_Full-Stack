// import { IUserDB, User } from "../models/User";
import { IOrderDB, IOrderItem, IOrderItemDB } from "../models/Order";
import { BaseDatabase } from "./BaseDatabase";

export class OrderDatabase extends BaseDatabase {
  public static TABLE_ORDERS = "Amb_Order";
  public static TABLE_ORDER_ITEM = "Amb_Order_Item";

  public createOrder = async (order: IOrderDB): Promise<void> => {
    await BaseDatabase.connection(OrderDatabase.TABLE_ORDERS).insert(order);
  };

  public insertItemOnOrder = async (item: IOrderItem): Promise<void> => {
    const orderItemDB: IOrderItemDB = {
      id: item.id,
      order_id: item.orderId,
      pizza_name: item.pizzaName,
      pizza_price: item.pizzaPrice,
      quantity: item.quantity,
    };
    await BaseDatabase.connection(OrderDatabase.TABLE_ORDER_ITEM).insert(
      orderItemDB
    );
  };

  public getOrders = async (): Promise<IOrderDB[]> => {
    const result: IOrderDB[] = await BaseDatabase.connection(
      OrderDatabase.TABLE_ORDERS
    ).select();

    return result;
  };

  public getOrderitems = async (orderId: string): Promise<IOrderItemDB[]> => {
    const result: IOrderItemDB[] = await BaseDatabase.connection(
      OrderDatabase.TABLE_ORDER_ITEM
    )
      .select()
      .where({ order_id: orderId });

    return result;
  };

  // public toUserDBModel = (user: User): IUserDB => {
  //   const userDB: IUserDB = {
  //     id: user.getId(),
  //     name: user.getName(),
  //     email: user.getEmail(),
  //     password: user.getPassword(),
  //     role: user.getRole(),
  //   };
  //   return userDB;
  // };
}
