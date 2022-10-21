export interface IOrderDB {
  id: string;
}

export interface IOrderItemDB {
  id: string;
  order_id: string;
  pizza_name: string;
  pizza_price: number;
  quantity: number;
}

export interface IOrderItem {
  id: string;
  pizzaName: string;
  pizzaPrice: number;
  quantity: number;
  orderId: string;
}

export interface IOrderOutputDTO {
  id: string;
  total: number;
  items: IOrderItem[];
}

export interface IGetOrdersOutputDTO {
  message: string;
  orders: IOrderOutputDTO[];
}

export interface ICreateOrderOutputDTO {
  message: string;
  order: IOrderOutputDTO;
}

export interface ICreateOrderInputDTO {
  pizzas: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

export class Order {
  private total: number = 0;
  constructor(private id: string, private items: IOrderItem[]) {}

  public getOrder = (): IOrderOutputDTO => {
    return {
      id: this.id,
      total: this.calculateTotal(),
      items: this.items,
    };
  };

  public calculateTotal = (): number => {
    for (const item of this.items) {
      this.total = this.total + item.pizzaPrice * item.quantity;
    }

    return this.total;
  };

  public getTotal = () => this.total;

  public getId = () => this.id;

  public setId = (newId: string) => (this.id = newId);

  public setitems = (newitems: IOrderItem[]) => {
    this.items = newitems;
    this.calculateTotal();
  };

  public addItem = (newItem: IOrderItem) => {
    this.items.push(newItem);
    this.calculateTotal();
  };

  public removeItem = (itemToRemove: IOrderItem) => {
    this.items = this.items.filter((item) => item !== itemToRemove);
    this.calculateTotal();
  };
}
