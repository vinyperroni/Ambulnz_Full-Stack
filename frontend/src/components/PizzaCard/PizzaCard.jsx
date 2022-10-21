import React, { useContext, useEffect } from "react";
import { PizzaCardContainer } from "./styled";
import Button from "@mui/material/Button/Button";
import GlobalContext from "../../context/GlobalContext";

const PizzaCard = (props) => {
  const { pizza } = props;
  const { addToCart } = useContext(GlobalContext);

  useEffect(() => {}, []);

  let ingredients = "";

  for (let index = 0; index < pizza.ingredients.length; index++) {
    if (index !== pizza.ingredients.length - 1) {
      ingredients = ingredients + `${pizza.ingredients[index]}, `;
    } else {
      ingredients = ingredients + `${pizza.ingredients[index]}.`;
    }
  }

  switch (pizza.name !== null) {
    case true:
      return (
        <PizzaCardContainer>
          <section>
            <h3>{pizza.name.toUpperCase()}</h3>

            <p>
              {pizza.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </section>
          <p>{ingredients}</p>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => addToCart(pizza)}
            sx={{
              textTransform: "none",
            }}
          >
            Add to Cart
          </Button>
        </PizzaCardContainer>
      );
    default:
      return <PizzaCardContainer></PizzaCardContainer>;
  }
};

export default PizzaCard;
