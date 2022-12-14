import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { HomePageContainer, PizzasContainer } from "./styled";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import Header from "../../components/Header/Header";

const HomePage = () => {
  const { pizzas } = useContext(GlobalContext);

  return (
    <>
      <Header title={"Pizzeria Amb"}></Header>
      <HomePageContainer>
        <PizzasContainer>
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.name} pizza={pizza} />
          ))}
        </PizzasContainer>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
