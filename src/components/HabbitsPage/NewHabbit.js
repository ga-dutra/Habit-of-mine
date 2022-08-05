import { useContext, useState } from "react";
import styled from "styled-components";
import { HabbitContext } from "../../contexts/HabbitContext";
import { postNewHabbit } from "../../services/trackit";
import { UserContext } from "../../contexts/UserContext";
import LoadingAnimation from "../../common/LoadingAnimation";

export default function NewHabbit({ renderiza, setRenderiza }) {
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
  const { hideHabbit, setHideHabbit, newHabbit, setNewHabbit } =
    useContext(HabbitContext);
  const usertoken = useContext(UserContext).userdata.token;
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function selectDay(dayId) {
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

    const selectedDays = newDays.filter((value) => {
      if (value.selected === true) {
        return value.id;
      }
    });
    const selectedDaysIds = selectedDays.map((value) => {
      if (value.selected === true) {
        return value.id;
      }
    });

    setNewHabbit({
      ...newHabbit,
      days: selectedDaysIds,
    });
  }

  function updateNewHabbit({ value, name }) {
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
  function postHabbit(body) {
    setIsLoading(true);
    console.log(body);

    const config = {
      headers: { Authorization: `Bearer ${usertoken}` },
    };
    const promise = postNewHabbit(body, config);
    promise.then((res) => {
      console.log("requisição de criação de hábito com sucesso");
      setInputValue("");
      setDays(
        days.map((value) => {
          return {
            ...value,
            selected: false,
          };
        })
      );
      setHideHabbit(true);
      setRenderiza(renderiza + 1);
    });
    promise.catch((err) => {
      console.log("erro na criação de hábito");
      alert(
        "Ocorreu um erro ao salvar o novo hábito. Por favor, cheque as informações."
      );
      setIsLoading(false);
    });
  }

  function saveHabbit() {
    console.log(newHabbit);
    if (!form.newHabbit) {
      alert("Por favor, digite um hábito válido!");
    } else if (
      days.filter((value) => {
        if (value.selected === true) {
          return true;
        } else return false;
      }).length === 0
    ) {
      alert("Por favor, selecione pelo menos um dia da semana para o hábito!");
    } else postHabbit(newHabbit);
  }

  const loadingAnimation = LoadingAnimation();

  return (
    <HidingContainer hidden={hideHabbit}>
      <HabbitContainer>
        <div>
          <input
            disabled={isLoading}
            placeholder="nome do hábito"
            name="newHabbit"
            value={inputValue}
            type="text"
            onChange={(e) => {
              setInputValue(e.target.value);
              updateNewHabbit({ name: e.target.name, value: e.target.value });
            }}
            required
          ></input>
          <WeekDaysContainer>
            {days.map((value) => {
              return (
                <WeekDay
                  enabled={isLoading}
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
          <HabbitOptionsContainer enabled={isLoading}>
            <span onClick={createHabbit} disabled={isLoading}>
              Cancelar
            </span>
            <SaveHabbitButton onClick={saveHabbit}>
              {isLoading ? loadingAnimation : "Salvar"}
            </SaveHabbitButton>
          </HabbitOptionsContainer>
        </div>
      </HabbitContainer>
    </HidingContainer>
  );
}

const HabbitContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  height: 164px;
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
  border: 1.75px solid #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  pointer-events: ${(props) => (props.enabled ? "none" : "inherit")};
  cursor: ${(props) => (props.enabled ? "inherit" : "pointer")};
  opacity: ${(props) => (props.enabled ? "0.7" : "1.0")};
`;

const HabbitOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 100px;
  margin-top: -16px;
  pointer-events: ${(props) => (props.enabled ? "none" : "inherit")};
  opacity: ${(props) => (props.enabled ? "0.7" : "1.0")};
  span {
    padding-right: 30px;
    color: #52b6ff;
    cursor: ${(props) => (props.enabled ? "inherit" : "pointer")};
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
  cursor: ${(props) => (props.enabled ? "inherit" : "pointer")};
`;

const HidingContainer = styled.div`
  display: ${(props) => (props.hidden ? "none" : "")};
`;

export { WeekDaysContainer, WeekDay };
