import styled from "styled-components";
import { WeekDaysContainer, WeekDay } from "./NewHabbit";
import { useState, useContext } from "react";
import { deleteHabbit } from "../../services/trackit";
import { UserContext } from "../../contexts/UserContext";

export default function Habbit({
  habbitName,
  habbitDays,
  habbitId,
  habbit,
  setRender,
  render,
}) {
  const [removeHabbit, setRemoveHabbit] = useState(false);
  const usertoken = useContext(UserContext).userdata.token;
  const days = [
    { id: 7, day: "D", selected: false },
    { id: 1, day: "S", selected: false },
    { id: 2, day: "T", selected: false },
    { id: 3, day: "Q", selected: false },
    { id: 4, day: "Q", selected: false },
    { id: 5, day: "S", selected: false },
    { id: 6, day: "S", selected: false },
  ];

  const newDays = days.map((value) => {
    if (habbitDays.includes(value.id)) {
      return {
        ...value,
        selected: true,
      };
    } else {
      return {
        ...value,
        selected: false,
      };
    }
  });

  function postDeletedHabbit() {
    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    const body = habbit;
    const promise = deleteHabbit(body, habbitId, config);
    promise.then((res) => {
      setRender(render + 1);
    });
    promise.catch((err) => {
      alert("não foi possível deletar o hábito");
    });
  }

  return (
    <Wrapper>
      {removeHabbit ? (
        <DeleteHabbitButton>
          <span
            onClick={() => {
              setRemoveHabbit(false);
            }}
          >
            Cancelar
          </span>
          <div onClick={() => postDeletedHabbit()}>
            <h3>Apagar</h3>
          </div>
        </DeleteHabbitButton>
      ) : (
        <ion-icon
          onClick={() => {
            setRemoveHabbit(true);
          }}
          name="trash-outline"
        ></ion-icon>
      )}

      <div>
        <h2>{habbitName}</h2>
        <WeekDaysContainer>
          {newDays.map((value) => {
            return (
              <WeekDay key={value.id} selected={value.selected}>
                <div>{value.day}</div>
              </WeekDay>
            );
          })}
        </WeekDaysContainer>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 14px;
  min-height: 90px;
  background-color: #ffffff;
  border-radius: 5px;

  > div {
    flex-direction: column;
    display: flex;
    padding: 18px;
    cursor: inherit !important ;
  }

  ion-icon {
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  h2 {
    color: #666666;
    font-size: 20px;
    font-family: "Lexend Deca";
    margin-bottom: 10px;
    max-width: calc(100vw - 20px);
    word-wrap: break-word;
  }

  div {
    cursor: default;
  }
`;

const DeleteHabbitButton = styled.div`
  position: absolute;
  font-size: 17px;
  top: 10px;
  right: 2px;
  display: flex;

  div {
    cursor: pointer;
    width: 80px;
    height: 28px;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #ffffff;
    margin-top: -8px;
  }
  h3 {
    margin-top: -4px;
  }

  span {
    color: #52b6ff;
    cursor: pointer;
    margin: 0 0 22px 4px;
    margin-top: -10px;
  }
`;
