import styled from "styled-components";

export const ScreenContainer = styled.div`
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: #0000006d;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SuccessPopUpContainer = styled.div`
  background-color: white;
  width: 350px;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  > h3 {
    margin: 0;
  }
  > button {
    position: absolute;
    top: 0;
    right: 0;
  }
  > div {
    display: flex;
    justify-content: space-between;
    > p {
      margin: 10px;
    }
  }
`;
