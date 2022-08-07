import styled from "styled-components";
import AddHabbitButton from "../AddHabbitButton";
import Footer from "../Footer";
import Header from "../Header";
import GrayBackground from "../../common/GrayBackground";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import NewHabbit from "./NewHabbit";
import Habbit from "./Habbit";
import { getAllHabbits, getTodayHabbits } from "../../services/trackit";
import { useNavigate } from "react-router-dom";

export default function HabbitsPage() {
  const usertoken = useContext(UserContext).userdata.token;
  const [render, setRender] = useState(1);
  const [todayHabbits, setTodayHabbits] = useState({});
  const [allHabbits, setAllHabbits] = useState({});
  const navigate = useNavigate();

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
      navigate("/");
    });
  }, [render, usertoken, navigate]);

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
      navigate("/");
    });
  }, [render, usertoken, navigate]);

  function habbitsDoneQuantity() {
    let progressPercentege = 0;
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
            ? "Você ainda não possui hábitos cadastrados. Adicione um hábito para começar a trackear!"
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
      <Footer progressPercentege={habbitsDoneQuantity()} />
    </GrayBackground>
  );
}

const Wrapper = styled.div`
  width: calc(100vw - 60px);
  margin: 0 30px;
  background-color: #e5e5e5;
  padding-bottom: 80px;
  p {
    padding-top: 80px;
    padding-bottom: 16px;
    margin-top: 28px;
    color: #666666;
    font-size: 18px;
    width: 100%;
    word-wrap: break-word;
    line-height: 20px;
  }
`;

const Title = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  padding: 0 30px;
  width: 100%;
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
    margin-right: 30px;
  }
`;
