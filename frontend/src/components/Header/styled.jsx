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
    position: relative;
    align-self: center;
    justify-self: center;
    > div {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      min-height: 18px;
      background-color: purple;
      border-radius: 100px;
      border: 1px solid grey;
      top: 1px;
      right: 1px;
      > p {
        margin: 0;
        color: white;
        font-size: 10px;
      }
    }
  }
  h1 {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }
`;
