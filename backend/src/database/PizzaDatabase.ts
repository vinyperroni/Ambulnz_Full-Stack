// import { IUserDB, User } from "../models/User";
import {
  IIngredientsDB,
  IPizzaDB,
  IPizzasIngredientsDB,
  Pizza,
} from "../models/Pizza";
import { BaseDatabase } from "./BaseDatabase";

export class PizzaDatabase extends BaseDatabase {
  public static TABLE_PIZZAS = "Amb_Pizza";
  public static TABLE_INGREDIENTS = "Amb_Ingredient";
  public static TABLE_PIZZA_INGREDIENTS = "Amb_Pizza_Ingredient";

  public toPizzaDBModel = (pizza: Pizza): IPizzaDB => {
    const pizzaDB: IPizzaDB = {
      name: pizza.getName(),
      price: pizza.getPrice(),
    };
    return pizzaDB;
  };

  public getPizzas = async (): Promise<IPizzaDB[]> => {
    const pizzas: IPizzaDB[] = await BaseDatabase.connection(
      PizzaDatabase.TABLE_PIZZAS
    ).select();

    return pizzas;
  };

  public getPizzaIngredients = async (pizzaName: string): Promise<string[]> => {
    const result: IPizzasIngredientsDB[] = await BaseDatabase.connection(
      PizzaDatabase.TABLE_PIZZA_INGREDIENTS
    )
      .select("ingredient_name")
      .where({ pizza_name: pizzaName });

    return result.map((item) => item.ingredient_name);
  };

  public getPizzaByName = async (name: string) => {
    const pizzas: IPizzaDB[] = await BaseDatabase.connection(
      PizzaDatabase.TABLE_PIZZAS
    )
      .select()
      .where({ name });

    const pizza = pizzas[0];

    if (pizzas.length > 0) {
      return pizza;
    } else {
      return undefined;
    }
  };
}
