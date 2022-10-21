import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "./styled";
import GlobalContext from "../../context/GlobalContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import IconButton from "@mui/material/IconButton";

const Header = (props) => {
  const { title } = props;
  const { cart } = useContext(GlobalContext);

  const navigate = useNavigate();

  let totalQuantity = 0;

  for (const item of cart) {
    totalQuantity = totalQuantity + item.quantity;
  }

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
      ) : cart.length > 0 ? (
        <IconButton color="secondary">
          <div>{totalQuantity}</div>
          <ShoppingCartRoundedIcon
            fontSize="large"
            onClick={() => navigate("cart")}
          />
        </IconButton>
      ) : (
        <IconButton>
          <ShoppingCartOutlinedIcon
            fontSize="large"
            onClick={() => navigate("cart")}
          />
        </IconButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
