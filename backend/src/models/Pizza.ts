export interface IPizzaDB {
  name: string;
  price: number;
}

export interface IIngredientsDB {
  name: string;
}

export interface IPizzasIngredientsDB {
  pizza_name: string;
  ingredient_name: string;
}

export interface IPizzaOutputDTO {
  name: string;
  price: number;
  ingredients: string[];
}

export interface IGetPizzasOutputDTO {
  message: string;
  pizzas: IPizzaOutputDTO[];
}

export class Pizza {
  constructor(
    private name: string,
    private price: number,
    private ingredients: string[]
  ) {}

  public getPizza = (): IPizzaOutputDTO => {
    return {
      name: this.name,
      price: this.price,
      ingredients: this.ingredients,
    };
  };

  public getName = () => {
    return this.name;
  };

  public getPrice = () => {
    return this.price;
  };

  public getIngredients = () => {
    return this.ingredients;
  };

  public setName = (newName: string) => {
    this.name = newName;
  };

  public setPrice = (newPrice: number) => {
    this.price = newPrice;
  };

  public setIngredients = (newIngredients: string[]) => {
    this.ingredients = newIngredients;
  };

  public addIngredient = (newIngredient: string) => {
    this.ingredients.push(newIngredient);
  };

  public removeIngredient = (ingredientToRemove: string) => {
    return this.ingredients.filter(
      (ingredient) => ingredient !== ingredientToRemove
    );
  };
}
