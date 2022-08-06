import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useState, useContext } from "react";
import { validateHabbit, unvalidateHabbit } from "../../services/trackit";

export default function TodayHabbit({
  habbit,
  habbitName,
  habbitDone,
  habbitId,
  habbitCurrentSequence,
  habbitHighestSequence,
  render,
  setRender,
}) {
  const usertoken = useContext(UserContext).userdata.token;
  const [isDone, setIsDone] = useState(habbitDone);
  function checkHabbit() {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    if (!isDone) {
      const promise = validateHabbit(config, habbitId);
      promise.then((res) => {
        console.log("hábito validado com sucesso");
        setIsDone(true);
        setRender(render + 1);
      });
      promise.catch((err) => {
        console.log("erro ao tentar validar hábito");
      });
    } else {
      const promise = unvalidateHabbit(config, habbitId);
      promise.then((res) => {
        console.log("hábito invalidado com sucesso");
        setIsDone(false);
        setRender(render + 1);
      });
      promise.catch((err) => {
        console.log("erro ao tentar invalidar hábito");
      });
    }
  }

  return (
    <Wrapper isDone={isDone}>
      <h2>{habbitName}</h2>
      <h3>{`Sequência atual: ${habbitCurrentSequence}`}</h3>
      <h3>{`Seu recorde: ${habbitHighestSequence}`}</h3>
      <ion-icon onClick={checkHabbit} name="checkbox"></ion-icon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 14px;
  width: calc(100%);
  min-height: 90px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 18px;
  position: relative;

  h2 {
    color: #666666;
    font-size: 20px;
    font-family: "Lexend Deca";
    margin-bottom: 10px;
    max-width: calc(100% - 20px);
    word-wrap: break-word;
  }

  h3 {
    color: #666666;
    font-size: 14px;
    padding-bottom: 2px;
  }

  ion-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 76px;
    fill: ${(props) => (props.isDone ? "green" : "#e5e5e5")};

    cursor: pointer;
  }
`;
