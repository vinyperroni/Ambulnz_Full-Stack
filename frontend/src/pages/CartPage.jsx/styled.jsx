import styled from "styled-components";

export const CartPageContainer = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const CartCard = styled.div`
  margin: 0 auto;
  width: 350px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  background-color: #fffafa;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h3,
  h2,
  p {
    margin: 0;
  }
  > p {
    text-align: center;
    padding: 40px;
    font-size: 30px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      gap: 15px;
      > p {
        font-weight: 500;
      }

      > div {
        display: flex;
        align-items: center;
        background-color: #fffafa;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
          rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      }
    }
  }
`;
