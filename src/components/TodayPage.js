import Header from "./Header";
import Footer from "./Footer";
import GrayBackground from "../common/GrayBackground";
import todaydate from "../common/todaydate";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getTodayHabbits } from "../services/trackit";

let todayHabbits = {};
export default function TodayPage() {
  const usertoken = useContext(UserContext).userdata.token;
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    const promise = getTodayHabbits(config);
    promise.then((res) => {
      todayHabbits = res.data;
      console.log(todayHabbits);
      console.log("deu certo a requisição");
    });
    promise.catch((err) => {
      console.log("não deu certo a requisição");
    });
  }, []);
  return (
    <GrayBackground>
      <Header />
      <Wrapper>
        <Date>{todaydate}</Date>
        <p>Nenhum hábito concluído ainda</p>
      </Wrapper>
      <Footer />
    </GrayBackground>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: calc(100% - 60px);
  margin: 0 30px;
  flex-direction: column;
  align-items: flex-start;

  p {
    margin-top: 12px;
    color: #bababa;
    font-size: #bababa;
  }
`;

const Date = styled.div`
  margin-top: 30px;
  color: #126ba5;
  font-size: 23px;
`;
