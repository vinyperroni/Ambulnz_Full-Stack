import { BaseDatabase } from "../BaseDatabase";
import { OrderDatabase } from "../OrderDatabase";
import { PizzaDatabase } from "../PizzaDatabase";
import { ingredientsDB, pizzas, pizzasIngredients } from "./data";

class Migrations extends BaseDatabase {
  execute = async () => {
    try {
      console.log("Creating tables...");
      await this.createTables();
      console.log("Tables created successfully.");

      console.log("Populating tables...");
      await this.insertData();
      console.log("Tables populated successfully.");

      console.log("Migrations completed.");
    } catch (error) {
      console.log("FAILED! Error in migrations...");
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log("Ending connection...");
      BaseDatabase.connection.destroy();
      console.log("Connection closed graciously.");
    }
  };

  createTables = async () => {
    await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDER_ITEM};
        DROP TABLE IF EXISTS ${OrderDatabase.TABLE_ORDERS};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZA_INGREDIENTS};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_INGREDIENTS};
        DROP TABLE IF EXISTS ${PizzaDatabase.TABLE_PIZZAS};
        
        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZAS}(
            name VARCHAR(255) PRIMARY KEY,
            price DECIMAL(3,2) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_INGREDIENTS}(
            name VARCHAR(255) PRIMARY KEY
        );
        
        CREATE TABLE IF NOT EXISTS ${PizzaDatabase.TABLE_PIZZA_INGREDIENTS} (
            pizza_name VARCHAR(255) NOT NULL,
            ingredient_name VARCHAR(255) NOT NULL,
            FOREIGN KEY (pizza_name) REFERENCES ${PizzaDatabase.TABLE_PIZZAS} (name),
            FOREIGN KEY (ingredient_name) REFERENCES ${PizzaDatabase.TABLE_INGREDIENTS} (name)
        );
        
        CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDERS} (
            id VARCHAR(255) PRIMARY KEY
        );
        
        CREATE TABLE IF NOT EXISTS ${OrderDatabase.TABLE_ORDER_ITEM} (
            id VARCHAR(255) PRIMARY KEY,
            order_id VARCHAR(255) NOT NULL,
            pizza_name VARCHAR(255) NOT NULL,
            pizza_price DECIMAL(3,2) NOT NULL,            
            quantity TINYINT NOT NULL,
            FOREIGN KEY (order_id) REFERENCES ${OrderDatabase.TABLE_ORDERS} (id),
            FOREIGN KEY (pizza_name) REFERENCES ${PizzaDatabase.TABLE_PIZZAS} (name)         
        );
        `);
  };

  insertData = async () => {
    await BaseDatabase.connection(PizzaDatabase.TABLE_PIZZAS).insert(pizzas);

    await BaseDatabase.connection(PizzaDatabase.TABLE_INGREDIENTS).insert(
      ingredientsDB
    );

    await BaseDatabase.connection(PizzaDatabase.TABLE_PIZZA_INGREDIENTS).insert(
      pizzasIngredients
    );
  };
}

const migrations = new Migrations();
migrations.execute();
