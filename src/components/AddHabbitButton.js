import styled from "styled-components";
import { HabbitContext } from "../contexts/HabbitContext";
import { useContext } from "react";

export default function AddHabbitButton() {
  const { setHideHabbit } = useContext(HabbitContext);

  function showNewHabbit() {
    setHideHabbit(false);
  }

  return (
    <Button onClick={showNewHabbit}>
      <div>+</div>
    </Button>
  );
}

const Button = styled.div`
  width: 40px;
  height: 40px;
  background-color: #52b6ff;
  border-radius: 5px;
  color: #ffffff;
  font-size: 28px;
  display: flex;
  position: relative;
  cursor: pointer;

  div {
    position: absolute;
    left: 11.5px;
    top: 3.5px;
  }
`;
