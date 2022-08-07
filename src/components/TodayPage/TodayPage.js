import Header from "../Header";
import Footer from "../Footer";
import GrayBackground from "../../common/GrayBackground";
import todaydate from "../../common/todaydate";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getTodayHabbits } from "../../services/trackit";
import TodayHabbit from "./TodayHabbit";

let progressPercentege = 0;
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
    });
    promise.catch((err) => {
      console.log("não deu certo a requisição");
    });
  }, [render, usertoken]);

  function habbitsDoneQuantity() {
    let quantityDone = 0;
    if (todayHabbits[0]) {
      todayHabbits.forEach((value) => {
        if (value.done === true) {
          quantityDone++;
        }
      });
    }
    progressPercentege = Math.round((quantityDone / todayHabbits.length) * 100);
    return progressPercentege;
  }

  const areThereTodayHabbits = isNaN(habbitsDoneQuantity());

  return (
    <GrayBackground>
      <Header />

      <Title
        isDone={habbitsDoneQuantity()}
        areThereTodayHabbits={areThereTodayHabbits}
      >
        <Date>{todaydate}</Date>
        <h2>
          {isNaN(habbitsDoneQuantity())
            ? "Você ainda não possui hábitos cadastrados para o dia de hoje!"
            : ""}
        </h2>
        <p>
          {habbitsDoneQuantity() === 0 && !isNaN(habbitsDoneQuantity())
            ? "Nenhum hábito concluído ainda"
            : `${habbitsDoneQuantity()}% dos hábitos concluídos`}
        </p>
      </Title>

      <HabbitsContainer>
        {!todayHabbits[0]
          ? ""
          : todayHabbits.map((value) => (
              <TodayHabbit
                key={value.id}
                habbit={value}
                habbitName={value.name}
                habbitDone={value.done}
                habbitId={value.id}
                habbitCurrentSequence={value.currentSequence}
                habbitHighestSequence={value.highestSequence}
                render={render}
                setRender={setRender}
              />
            ))}
      </HabbitsContainer>
      <Footer progressPercentege={habbitsDoneQuantity()} />
    </GrayBackground>
  );
}

const Title = styled.div`
  position: fixed;
  top: 72px;
  display: flex;
  width: calc(100%);
  margin: 0 30px;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  background-color: #e5e5e5;

  p {
    margin-top: 12px;
    color: ${(props) => (props.isDone !== 0 ? "#8FC549" : "#bababa")};
    display: ${(props) => (props.areThereTodayHabbits ? "none" : "inherit")};
    font-size: 18px;
  }

  h2 {
    width: calc(100% - 60px);
    margin-top: 12px;
    color: #bababa;
    font-size: 18px;
  }
`;

const Date = styled.div`
  margin-top: 30px;
  color: #126ba5;
  font-size: 23px;
`;

const HabbitsContainer = styled.div`
  padding-top: 110px;
  margin: 0 30px;
  padding-bottom: 80px;
`;

export { progressPercentege };
