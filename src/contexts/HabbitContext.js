import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getHabbitsHistory } from "../services/trackit";

const HabbitContext = createContext();
let habbitsDiary = [];

const HabbitStorage = ({ children }) => {
  const [hideHabbit, setHideHabbit] = useState(true);
  const [newHabbit, setNewHabbit] = useState({ name: "", days: [] });
  const [render, setRender] = useState(1);
  const usertoken = useContext(UserContext).userdata.token;
  const [clickedDayHabbits, setClickedDayHabbits] = useState([]);
  // creates habbits diary that's consumed in HistoryPage

  const userStored = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let config = {};
    if (userStored) {
      config = {
        headers: { Authorization: `Bearer ${userStored.token}` },
      };
    } else {
      config = {
        headers: { Authorization: `Bearer ${usertoken}` },
      };
    }
    const promise = getHabbitsHistory(config);
    promise.then((res) => {
      if (habbitsDiary !== res.data) {
        res.data.forEach((element) => {
          let habbitsDone = 0;
          let aux = 0;
          element.habits.forEach((item) => {
            if (item.done === true) {
              habbitsDone++;
            }
          });
          if (habbitsDone === element.habits.length) {
            aux = 1;
          }
          let day = "";
          if (String(element.day)[3] === "0") {
            day += String(element.day.slice(0, 3));
            day += String(element.day[4]);
          } else {
            day += String(element.day.slice(0, 5));
          }
          if (String(element.day)[0] === "0") {
            day = day.slice(1);
          }
          habbitsDiary.push({
            day,
            efficiency: aux,
          });
        });
      }
    });

    promise.catch((err) => {
      console.log("não deu certo a requisição");
    });
  }, [render]);

  return (
    <HabbitContext.Provider
      value={{
        hideHabbit,
        setHideHabbit,
        newHabbit,
        setNewHabbit,
        habbitsDiary,
        render,
        setRender,
        clickedDayHabbits,
        setClickedDayHabbits,
      }}
    >
      {children}
    </HabbitContext.Provider>
  );
};

export { HabbitContext, HabbitStorage };
