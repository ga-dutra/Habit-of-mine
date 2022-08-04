import styled from "styled-components";
import AddHabbitButton from "./AddHabbitButton";
import Footer from "./Footer";
import Header from "./Header";
import GrayBackground from "../common/GrayBackground";

export default function HabbitsPage() {
  return (
    <GrayBackground>
      <Header />
      <div>
        <p>Meus hábitos</p>
        <AddHabbitButton></AddHabbitButton>
      </div>
      <Footer />
    </GrayBackground>
  );
}

const Background = styled.div`
  width: 100vw;
  height: calc(100vh - 140px);
  background-color: #e5e5e5;
`;
