import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../styles/globalStyles";
import HabbitsPage from "./HabbitsPage";
import TodayPage from "./TodayPage";
import HistoryPage from "./HistoryPage";

export default function App() {
  return (
    <>
      <UserContext.Provider>
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
      </UserContext.Provider>
    </>
  );
}
