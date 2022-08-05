import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react/cjs/react.development";

export default function TodayHabbit({
  habbitName,
  habbitDone,
  habbitCurrentSequence,
  habbitHighestSequence,
  render,
  setRender,
}) {
  return (
    <Wrapper>
      <h2>{habbitName}</h2>
      <h3>{`Sequência atual: ${habbitCurrentSequence}`}</h3>
      <h3>{`Seu recorde: ${habbitHighestSequence}`}</h3>
      <ion-icon name="checkbox"></ion-icon>
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
    fill: green;
    fill: #e7e7e7;
    cursor: pointer;
  }
`;
