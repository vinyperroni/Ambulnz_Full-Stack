import styled from "styled-components";

export const PizzaCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: #fffafa;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 10px;
  > section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    margin-bottom: 18px;
  }
  > p {
    margin-top: 0;
  }
`;
