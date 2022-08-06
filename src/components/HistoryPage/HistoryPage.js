import Header from "../Header";
import Footer from "../Footer";
import GrayBackground from "../../common/GrayBackground";
import { progressPercentege } from "../TodayPage/TodayPage";

export default function HistoryPage() {
  return (
    <GrayBackground>
      <Header />
      <Footer progressPercentege={progressPercentege} />
    </GrayBackground>
  );
}
