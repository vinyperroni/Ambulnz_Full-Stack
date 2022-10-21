import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  background-color: #fffafa;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: #414141;
  position: fixed;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
  button {
    align-self: center;
    justify-self: center;
  }
  h1 {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
`;
