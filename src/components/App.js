import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import GlobalStyle from "../styles/globalStyles";
import HabbitsPage from "./HabbitsPage/HabbitsPage";
import TodayPage from "./TodayPage";
import HistoryPage from "./HistoryPage";
import { UserStorage } from "../contexts/UserContext";
import { HabbitStorage } from "../contexts/HabbitContext";

export default function App() {
  return (
    <>
      <UserStorage>
        <HabbitStorage>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/habitos" element={<HabbitsPage />} />
              <Route path="/hoje" element={<TodayPage />} />
              <Route path="/historico" element={<HistoryPage />} />
            </Routes>
          </BrowserRouter>
        </HabbitStorage>
      </UserStorage>
    </>
  );
}
