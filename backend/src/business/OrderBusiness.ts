import { OrderDatabase } from "../database/OrderDatabase";
import { PizzaDatabase } from "../database/PizzaDatabase";
import { NotFoundError } from "../errors/NotFoundError";
import { ParamsError } from "../errors/ParamsError";
import {
  ICreateOrderInputDTO,
  ICreateOrderOutputDTO,
  IGetOrdersOutputDTO,
  IOrderItem,
  Order,
} from "../models/Order";
import { IdGenerator } from "../services/IdGenerator";

export class OrderBusiness {
  constructor(
    private orderDatabase: OrderDatabase,
    private idGenerator: IdGenerator,
    private pizzaDatabase: PizzaDatabase
  ) {}

  public createOrder = async (input: ICreateOrderInputDTO) => {
    const items = input.pizzas;

    if (items.length === 0) {
      throw new ParamsError("Empty order, please inform one or more items");
    }

    for (const item of items) {
      if (item.quantity <= 0) {
        throw new ParamsError("Quantity must be greater than 0");
      }

      const pizza = await this.pizzaDatabase.getPizzaByName(item.name);

      if (!pizza) {
        throw new NotFoundError("Pizza not found");
      }
    }

    const orderId = this.idGenerator.generate();

    await this.orderDatabase.createOrder({ id: orderId });

    const orderItems: IOrderItem[] = [];

    for (let item of items) {
      const orderItem: IOrderItem = {
        id: this.idGenerator.generate(),
        orderId: orderId,
        pizzaName: item.name,
        pizzaPrice: item.price,
        quantity: item.quantity,
      };

      orderItems.push(orderItem);

      await this.orderDatabase.insertItemOnOrder(orderItem);
    }
    const order = new Order(orderId, orderItems);

    const response: ICreateOrderOutputDTO = {
      message: "Order Created succesfully",
      order: order.getOrder(),
    };

    return response;
  };

  public getOrders = async (): Promise<IGetOrdersOutputDTO> => {
    const ordersDB = await this.orderDatabase.getOrders();

    const orders: Order[] = [];

    for (let orderDB of ordersDB) {
      const orderitemsDB = await this.orderDatabase.getOrderitems(orderDB.id);

      const orderitems: IOrderItem[] = orderitemsDB.map((orderItem) => ({
        id: orderItem.id,
        pizzaName: orderItem.pizza_name,
        pizzaPrice: orderItem.pizza_price,
        quantity: orderItem.quantity,
        orderId: orderItem.order_id,
      }));

      const order = new Order(orderDB.id, orderitems);

      orders.push(order);
    }

    const response: IGetOrdersOutputDTO = {
      message: "Pedidos retornados com sucesso",
      orders: orders.map((order) => order.getOrder()),
    };

    return response;
  };
}
