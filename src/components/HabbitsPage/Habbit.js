import { useContext, useState } from "react";
import styled from "styled-components";
import { HabbitContext } from "../../contexts/HabbitContext";

export default function Habbit() {
  const [days, setDays] = useState([
    { id: 7, day: "D", selected: false },
    { id: 1, day: "S", selected: false },
    { id: 2, day: "T", selected: false },
    { id: 3, day: "Q", selected: false },
    { id: 4, day: "Q", selected: false },
    { id: 5, day: "S", selected: false },
    { id: 6, day: "S", selected: false },
  ]);

  const [form, setForm] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const { hideHabbit, setHideHabbit, newHabbit, setNewHabbit } =
    useContext(HabbitContext);
  function selectDay(dayId) {
    setSelectedDays(
      days.filter((value) => {
        if (value.selected === true) {
          if (value.selected === true) {
            return value.id;
          }
        }
      })
    );
    let arroz = selectedDays.map((value) => {
      if (value.selected === true) {
        return value.id;
      }
    });
    console.log(arroz);
    setNewHabbit({
      ...newHabbit,
      days: [
        selectedDays.map((value) => {
          return value.id;
        }),
      ],
    });
    console.log(selectedDays);
    const newDays = days.map((value) => {
      if (value.id === dayId) {
        if (!value.selected) {
          setNewHabbit({ ...newHabbit }, days.push(days.day));
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
      }
      return { ...value };
    });
    setDays(newDays);
  }

  function updateNewHabbit({ value, name }) {
    console.log(value, name);
    setForm({
      ...form,
      [name]: value,
    });

    setNewHabbit({ ...newHabbit, name: value });
  }

  function createHabbit() {
    if (hideHabbit) {
      setHideHabbit(false);
    } else {
      setHideHabbit(true);
    }
  }

  function saveHabbit() {
    console.log(newHabbit);
    if (!form.newHabbit) {
      alert("Por favor, digite um hábito válido!");
    }
    if (
      days.filter((value) => {
        if (value.selected === true) {
          return true;
        } else return false;
      }).length === 0
    ) {
      alert("Por favor, selecione pelo menos um dia da semana para o hábito!");
    }
  }
  return (
    <HidingContainer hidden={hideHabbit}>
      <HabbitContainer>
        <div>
          <input
            placeholder="nome do hábito"
            name="newHabbit"
            type="text"
            onChange={(e) => {
              updateNewHabbit({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <WeekDaysContainer>
            {days.map((value) => {
              return (
                <WeekDay
                  key={value.id}
                  onClick={() => {
                    selectDay(value.id);
                  }}
                  selected={value.selected}
                >
                  {value.day}
                </WeekDay>
              );
            })}
          </WeekDaysContainer>
        </div>
        <div>
          <HabbitOptionsContainer>
            <span onClick={createHabbit}>Cancelar</span>
            <SaveHabbitButton onClick={saveHabbit}>Salvar</SaveHabbitButton>
          </HabbitOptionsContainer>
        </div>
      </HabbitContainer>
    </HidingContainer>
  );
}

const HabbitContainer = styled.div`
  margin-top: 30px;
  min-height: 180px;
  background-color: #ffffff;
  border-radius: 5px;

  > div {
    flex-direction: column;
    display: flex;
    padding: 18px;
  }

  input {
    width: 100%;
    height: 36px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    color: #666666;
    font-weight: 400;
    font-size: 20px;
    padding-left: 12px;
    margin-bottom: 6px;
    font-family: "Lexend Deca", sans-serif;
    word-wrap: break-word;
  }
  input::placeholder {
    font-weight: 500;
    color: #dbdbdb;
  }

  input:focus {
    outline: none;
  }
`;

const WeekDaysContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WeekDay = styled.div`
  color: ${(props) => (props.selected ? "#ffffff" : "#dbdbdb")};
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "#ffffff")};
  font-weight: 400;
  font-size: 20px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  cursor: pointer;
`;

const HabbitOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 100px;

  span {
    padding-right: 30px;
    color: #52b6ff;
    cursor: pointer;
  }
`;

const SaveHabbitButton = styled.div`
  width: 84px;
  height: 36px;
  background-color: #52b6ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  line-height: 50px;
  color: #ffffff;
  cursor: pointer;
`;

const HidingContainer = styled.div`
  display: ${(props) => (props.hidden ? "none" : "")};
`;
