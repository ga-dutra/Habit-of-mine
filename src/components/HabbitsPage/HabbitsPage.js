import styled from "styled-components";
import AddHabbitButton from "../AddHabbitButton";
import Footer from "../Footer";
import Header from "../Header";
import GrayBackground from "../../common/GrayBackground";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Habbit from "./Habbit";

export default function HabbitsPage() {
  const navigate = useNavigate();
  const userdata = useContext(UserContext).userdata;

  // useEffect(() => {
  //   if (userdata === {}) {
  //     console.log("entrei");
  //     navigate("/");
  //   }
  // }, [useContext(UserContext).userdata]);

  return (
    <GrayBackground>
      <Header />
      <Wrapper>
        <Title>
          <h1>Meus hábitos</h1>
          <AddHabbitButton></AddHabbitButton>
        </Title>
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </p>
        <Habbit />
      </Wrapper>
      <Footer />
    </GrayBackground>
  );
}

const Wrapper = styled.div`
  width: calc(100% - 60px);
  margin: 0 30px;

  p {
    margin-top: 28px;
    color: #666666;
    font-size: 18px;
  }
`;

const Title = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: #126ba5;
    font-size: 23px;
  }
`;
