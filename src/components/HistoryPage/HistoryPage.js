import Header from "../Header";
import Footer from "../Footer";
import GrayBackground from "../../common/GrayBackground";
import { progressPercentege } from "../TodayPage/TodayPage";
import Calendar from "react-calendar";
import { useState, useContext } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import { HabbitContext } from "../../contexts/HabbitContext";
import ClickedDayHabbit from "./ClickedDayHabbit";

export default function HistoryPage() {
  const [date, setDate] = useState(new Date());
  const { habbitsDiary } = useContext(HabbitContext);
  const [dateClicked, setDateClicked] = useState("");

  function dayEfficiency(a) {
    let efficiency;
    habbitsDiary.forEach((item) => {
      if (String(item.day) === String(a)) {
        efficiency = item.efficiency;
      } else {
        return;
      }
    });
    if (efficiency === 0) efficiency = "red";
    else if (efficiency === 1) efficiency = "green";
    else efficiency = "";
    console.log(`eficiency: ${efficiency}`);
    return efficiency;
  }

  const onChange = (date) => {
    setDate(date);
    let day = "";
    let month = "";
    if (String(date.getDate()).length === 1) {
      day += `0${date.getDate()}`;
    } else {
      day += `${date.getDate()}`;
    }
    if (String(date.getMonth() + 1).length === 1) {
      month += `0${date.getMonth() + 1}`;
    } else {
      month += `${date.getMonth() + 1}`;
    }
    setDateClicked(`${day}/${month}/${date.getFullYear()}`);
  };

  return (
    <GrayBackground>
      <Header />
      <Wrapper>
        <Title>Histórico</Title>
        <CalendarContainer>
          <Calendar
            locale="pt-br"
            tileClassName={({ date, view }) =>
              view === "month"
                ? [
                    dayEfficiency(
                      `${date.getDate()}/${Number(date.getMonth() + 1)}`
                    ),
                    "all",
                  ]
                : null
            }
            onChange={onChange}
            value={date}
          />
        </CalendarContainer>
      </Wrapper>
      <ClickedDayHabbit dateClicked={dateClicked}></ClickedDayHabbit>
      <Footer progressPercentege={progressPercentege} />
    </GrayBackground>
  );
}

const Wrapper = styled.div`
  margin: 0 30px;
  padding-top: 30px;
  width: calc(100% - 60px);
`;

const Title = styled.div`
  color: #126ba5;
  font-size: 23px;
  padding-bottom: 30px;
`;

const CalendarContainer = styled.div`
  margin-left: calc((100vw - 410px) / 2);
  @media (max-width: 410px) {
    margin: 0 calc((100vw - 410px) / 2);
  }
`;
