import styled from "styled-components";
import Progressbar from "./Progressbar";
import { Link } from "react-router-dom";
import logoutphoto from "../assets/img/logout.png";
import { useNavigate } from "react-router-dom";

export default function Footer({ progressPercentege }) {
  const navigate = useNavigate();
  function userLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <Wrapper>
        <Link to="/habitos">
          <span>Hábitos</span>
        </Link>
        <Link to="/hoje">
          <Progressbar progressPercentege={progressPercentege} />
        </Link>
        <Link to="/historico">
          <span>Histórico</span>
        </Link>
      </Wrapper>
      <LogoutButton onClick={userLogout}>
        <img src={logoutphoto} alt="" />
      </LogoutButton>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 40px;
  z-index: 2;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: "Lexend Deca", sans-serif;
  background-color: #ffffff;

  span {
    z-index: 2;
    font-size: 20px;
    color: #52b6ff;
  }
`;
const LogoutButton = styled.div`
  width: 46px;
  height: 46px;
  position: fixed;
  bottom: 10px;
  right: 6px;
  z-index: 2;
  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
