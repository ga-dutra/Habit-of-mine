import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useState, useContext } from "react";
import { validateHabbit, unvalidateHabbit } from "../../services/trackit";

export default function TodayHabbit({
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
  const isCurrentSequenceHighest =
    habbitCurrentSequence >= habbitHighestSequence &&
    habbitCurrentSequence !== 0;
  function checkHabbit() {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    if (!isDone) {
      const promise = validateHabbit(config, habbitId);
      promise.then((res) => {
        setIsDone(true);
        setRender(render + 1);
      });
      promise.catch((err) => {
        alert("erro ao tentar validar hábito");
      });
    } else {
      const promise = unvalidateHabbit(config, habbitId);
      promise.then((res) => {
        setIsDone(false);
        setRender(render + 1);
      });
      promise.catch((err) => {
        alert("erro ao tentar invalidar hábito");
      });
    }
  }

  return (
    <Wrapper
      isDone={isDone}
      isCurrentSequenceHighest={isCurrentSequenceHighest}
    >
      <h2>{habbitName}</h2>
      <h3>
        Sequência atual:{" "}
        <span>
          {`${habbitCurrentSequence} dia`}
          {habbitCurrentSequence > 1 ? "s" : ""}
        </span>
      </h3>
      <h3>
        Seu recorde:{" "}
        <span>
          {`${habbitHighestSequence} dia`}
          {habbitHighestSequence > 1 ? "s" : ""}
        </span>
      </h3>
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
    max-width: calc(100% - 56px);
    word-wrap: break-word;
  }

  h3 {
    color: #666666;
    font-size: 14px;
    padding-bottom: 2px;
  }

  span {
    color: ${(props) =>
      props.isCurrentSequenceHighest ? "#8FC549" : "#666666"};
  }

  ion-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 76px;
    fill: ${(props) => (props.isDone ? "#8FC549" : "#e5e5e5")};

    cursor: pointer;
  }
`;
