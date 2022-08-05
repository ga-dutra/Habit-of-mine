import styled from "styled-components";
import { WeekDaysContainer, WeekDay } from "./NewHabbit";
import { useState } from "react";

export default function Habbit({ habbitName, habbitDays }) {
  const days = [
    { id: 7, day: "D", selected: false },
    { id: 1, day: "S", selected: false },
    { id: 2, day: "T", selected: false },
    { id: 3, day: "Q", selected: false },
    { id: 4, day: "Q", selected: false },
    { id: 5, day: "S", selected: false },
    { id: 6, day: "S", selected: false },
  ];

  console.log(habbitDays);
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
  // return { ...value };

  return (
    <Wrapper>
      <ion-icon name="trash-outline"></ion-icon>
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
  margin-top: 30px;
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
    font-size: 17px;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  h2 {
    color: #666666;
    font-size: 20px;
    font-family: "Lexend Deca";
    margin-bottom: 10px;
  }

  div {
    cursor: default;
  }
`;
