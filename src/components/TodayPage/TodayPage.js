import Header from "../Header";
import Footer from "../Footer";
import GrayBackground from "../../common/GrayBackground";
import todaydate from "../../common/todaydate";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getTodayHabbits } from "../../services/trackit";
import TodayHabbit from "./TodayHabbit";

export default function TodayPage() {
  const [render, setRender] = useState(1);
  const usertoken = useContext(UserContext).userdata.token;
  const [todayHabbits, setTodayHabbits] = useState({});
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    const promise = getTodayHabbits(config);
    promise.then((res) => {
      setTodayHabbits(res.data);
      console.log(todayHabbits);
      console.log("deu certo a requisição");
    });
    promise.catch((err) => {
      console.log("não deu certo a requisição");
    });
  }, [render]);
  return (
    <GrayBackground>
      <Header />
      <Title>
        <Date>{todaydate}</Date>
        <p>Nenhum hábito concluído ainda</p>
      </Title>
      <HabbitsContainer>
        {!todayHabbits[0]
          ? ""
          : todayHabbits.map((value) => (
              <TodayHabbit
                key={value.id}
                habbitName={value.name}
                habbitDone={value.done}
                habbitCurrentSequence={value.currentSequence}
                habbitHighestSequence={value.highestSequence}
                render={render}
                setRender={setRender}
              />
            ))}
      </HabbitsContainer>
      <Footer />
    </GrayBackground>
  );
}

const Title = styled.div`
  position: fixed;
  display: flex;
  height: 80px;
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

const HabbitsContainer = styled.div`
  padding-top: 100px;
  margin: 0 30px;
  padding-bottom: 80px;
`;
