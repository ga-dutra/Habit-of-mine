import styled from "styled-components";
import AddHabbitButton from "../AddHabbitButton";
import Footer from "../Footer";
import Header from "../Header";
import GrayBackground from "../../common/GrayBackground";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import NewHabbit from "./NewHabbit";
import Habbit from "./Habbit";
import { getAllHabbits } from "../../services/trackit";
import { progressPercentege } from "../TodayPage/TodayPage";

export default function HabbitsPage() {
  const usertoken = useContext(UserContext).userdata.token;
  const [render, setRender] = useState(1);

  const [allHabbits, setAllHabbits] = useState({});
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    const promise = getAllHabbits(config);
    promise.then((res) => {
      setAllHabbits(res.data);
    });
    promise.catch((err) => {
      console.log("erro na requisição de hábitos");
    });
  }, [render, usertoken]);

  return (
    <GrayBackground>
      <Header />
      <Wrapper>
        <Title>
          <h1>Meus hábitos</h1>
          <AddHabbitButton></AddHabbitButton>
        </Title>
        <p>
          {!allHabbits[0]
            ? "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
            : ""}
        </p>
        <NewHabbit render={render} setRender={setRender} />
        {!allHabbits[0]
          ? ""
          : allHabbits.map((value) => (
              <Habbit
                key={value.id}
                habbitName={value.name}
                habbitDays={value.days}
                habbitId={value.id}
                habbit={value}
                render={render}
                setRender={setRender}
              />
            ))}
      </Wrapper>
      <Footer progressPercentege={progressPercentege} />
    </GrayBackground>
  );
}

const Wrapper = styled.div`
  width: calc(100vw - 60px);
  margin: 0 30px;
  background-color: #e5e5e5;
  padding-bottom: 80px;
  p {
    padding-top: 110px;
    margin-top: 28px;
    color: #666666;
    font-size: 18px;
    max-width: 200px;
    word-wrap: break-word;
  }
`;

const Title = styled.div`
  position: fixed;
  width: calc(100% - 60px);
  height: 80px;
  padding-top: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  background-color: #e5e5e5;

  h1 {
    color: #126ba5;
    font-size: 23px;
  }
`;
