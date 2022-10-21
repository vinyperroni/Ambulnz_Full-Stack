import { IconButton } from "@mui/material";
import { ScreenContainer, SuccessPopUpContainer } from "./styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const OrderSuccessPopUp = () => {
  const { setOrderStatus, orderStatus } = useContext(GlobalContext);

  const navigate = useNavigate();

  const closePopUp = () => {
    setOrderStatus({ ...orderStatus, isSuccess: false });
    navigate("/");
  };

  let numberItem = 0;
  return (
    <ScreenContainer>
      <SuccessPopUpContainer>
        <IconButton onClick={() => closePopUp()}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
        <h3>Order Placed Successfully</h3>
        {orderStatus.isSuccess ? <p>{orderStatus.order.id}</p> : null}

        <h4>Items:</h4>
        <p>{orderStatus.order.items[0].name}</p>
        {orderStatus.order.items.length > 0
          ? orderStatus.order.items.map((item) => {
              numberItem = numberItem + 1;
              return (
                <div>
                  <p>
                    {numberItem} - {item.pizzaName}
                  </p>
                  <p>
                    {item.quantity} X{" "}
                    {item.pizzaPrice.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                  </p>
                </div>
              );
            })
          : null}
        {orderStatus.isSuccess ? (
          <div>
            <h2>Total:</h2>
            <h2>
              {orderStatus.order.total.toLocaleString("pt-br", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
          </div>
        ) : null}
      </SuccessPopUpContainer>
    </ScreenContainer>
  );
};

export default OrderSuccessPopUp;
