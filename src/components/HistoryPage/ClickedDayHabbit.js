import styled from "styled-components";
import { getHabbitsHistory } from "../../services/trackit";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect } from "react";
import { HabbitContext } from "../../contexts/HabbitContext";
import { useNavigate } from "react-router-dom";

export default function ClickedDayHabbit({ dateClicked }) {
  const navigate = useNavigate();
  const usertoken = useContext(UserContext).userdata.token;
  const config = {
    headers: { Authorization: `Bearer ${usertoken}` },
  };

  const { clickedDayHabbits, setClickedDayHabbits } = useContext(HabbitContext);
  useEffect(() => {
    const promise = getHabbitsHistory(config);
    promise.then((res) => {
      setClickedDayHabbits(
        res.data.filter((value) => {
          if (value.day === dateClicked) {
            return value.habits;
          } else return false;
        })
      );
    });
    promise.catch((err) => {
      console.log("erro de requisição");
      navigate("/");
    });
  }, [dateClicked]);

  if (clickedDayHabbits.length !== 0) {
    return (
      <Wrapper>
        {clickedDayHabbits[0].habits.map((value) => (
          <DayHabbit
            key={value.id}
            habbitName={value.name}
            iconType={value.done}
          />
        ))}
      </Wrapper>
    );
  } else return null;
}

function DayHabbit({ habbitName, iconType }) {
  return (
    <DayHabbitContainer iconType={iconType}>
      <h2>{habbitName}</h2>
      <ion-icon
        name={iconType === true ? "checkbox" : "close-circle"}
      ></ion-icon>
    </DayHabbitContainer>
  );
}

const Wrapper = styled.div`
  margin: 20px 30px;
  position: relative;
`;

const DayHabbitContainer = styled.div`
  min-height: 64px;
  position: relative;
  flex-direction: column;
  display: flex;
  padding: 18px;
  background-color: #ffffff;
  margin-top: 20px;
  border-radius: 5px;

  h2 {
    color: #666666;
    font-size: 20px;
    font-family: "Lexend Deca";
    max-width: calc(100vw - 140px);
    word-wrap: break-word;
    padding-top: 4px;
  }

  ion-icon {
    position: absolute;
    right: 6px;
    top: 4px;
    font-size: 56px;
    fill: ${(props) => (props.iconType ? "green" : "rgb(241, 80, 80)")};
  }
`;
