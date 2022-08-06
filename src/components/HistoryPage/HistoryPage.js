import Header from "../Header";
import Footer from "../Footer";
import GrayBackground from "../../common/GrayBackground";
import { progressPercentege } from "../TodayPage/TodayPage";
import Calendar from "react-calendar";
import { useState } from "react";

export default function HistoryPage() {
  const [value, onChange] = useState(new Date());

  return (
    <GrayBackground>
      <Header />
      <div>{/* <Calendar onChange={onChange} value={value} /> */}</div>
      <Footer progressPercentege={progressPercentege} />
    </GrayBackground>
  );
}
