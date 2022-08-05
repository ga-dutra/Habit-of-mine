import styled from "styled-components";
import Progressbar from "./Progressbar";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Wrapper>
      <Link to="/habitos">
        <span>Hábitos</span>
      </Link>
      <Link to="/hoje">
        <Progressbar />
      </Link>
      <Link to="/historico">
        <span>Histórico</span>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 100;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: "Lexend Deca", sans-serif;

  span {
    z-index: 5;
    font-size: 20px;
    color: #52b6ff;
  }
`;
