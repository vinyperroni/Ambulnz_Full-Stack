import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "./styled";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button/Button";
import GlobalContext from "../../context/GlobalContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import IconButton from "@mui/material/IconButton";

const Header = (props) => {
  const { title } = props;
  const { cart } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      {title === "Pizzeria Amb" ? (
        <div></div>
      ) : (
        <IconButton>
          <ArrowBackIosRoundedIcon onClick={() => navigate(-1)} />
        </IconButton>
      )}

      <h1>{title}</h1>
      {title === "Cart" ? (
        <div></div>
      ) : (
        <IconButton color="secondary">
          {cart.length > 0 ? (
            <ShoppingCartRoundedIcon onClick={() => navigate("cart")} />
          ) : (
            <ShoppingCartOutlinedIcon onClick={() => navigate("cart")} />
          )}
        </IconButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
