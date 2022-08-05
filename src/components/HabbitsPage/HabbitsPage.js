import styled from "styled-components";
import AddHabbitButton from "../AddHabbitButton";
import Footer from "../Footer";
import Header from "../Header";
import GrayBackground from "../../common/GrayBackground";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewHabbit from "./NewHabbit";
import Habbit from "./Habbit";
import { getAllHabbits } from "../../services/trackit";

export default function HabbitsPage() {
  const navigate = useNavigate();
  const usertoken = useContext(UserContext).userdata.token;

  const [allHabbits, setAllHabbits] = useState({});
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    const promise = getAllHabbits(config);
    promise.then((res) => {
      setAllHabbits(res.data);
      console.log("sucesso na requisição de hábitos");
    });
    promise.catch((err) => {
      console.log("erro na requisição de hábitos");
    });
  }, []);

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
        <NewHabbit />
        {!allHabbits[0]
          ? ""
          : allHabbits.map((value) => (
              <Habbit
                key={value.id}
                habbitName={value.name}
                habbitDays={value.days}
              />
            ))}

        {/* {!allHabbits[0]
          ? allHabbits.map((value) => {
              <Habbit key={value.index} allHabbits={allHabbits} />;
            })
          : ""} */}
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
