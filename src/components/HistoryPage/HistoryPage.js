import Header from "../Header";
import Footer from "../Footer";
import GrayBackground from "../../common/GrayBackground";
import { progressPercentege } from "../TodayPage/TodayPage";
import Calendar from "react-calendar";
import { useState } from "react";
import styled from "styled-components";

export default function HistoryPage() {
  const [value, onChange] = useState(new Date());

  return (
    <GrayBackground>
      <Header />
      <Wrapper>{/* <Calendar onChange={onChange} value={value} /> */}</Wrapper>
      <Footer progressPercentege={progressPercentege} />
    </GrayBackground>
  );
}

const Wrapper = styled.div`
  margin: 0 30px;
  padding-top: 30px;
  width: calc(100% - 60px);
`;
