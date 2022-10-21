import { PizzaDatabase } from "../database/PizzaDatabase";
import { IGetPizzasOutputDTO, Pizza } from "../models/Pizza";

export class PizzaBusiness {
  constructor(private pizzaDatabase: PizzaDatabase) {}

  public getPizzas = async (): Promise<IGetPizzasOutputDTO> => {
    const pizzasDB = await this.pizzaDatabase.getPizzas();

    const pizzas: Pizza[] = [];

    for (let pizzaDB of pizzasDB) {
      const ingredients = await this.pizzaDatabase.getPizzaIngredients(
        pizzaDB.name
      );

      const pizza = new Pizza(pizzaDB.name, pizzaDB.price, ingredients);

      pizzas.push(pizza);
    }

    const response: IGetPizzasOutputDTO = {
      message: "Pizzas retornadas com sucesso",
      pizzas: pizzas.map((pizza) => pizza.getPizza()),
    };

    return response;
  };
}
