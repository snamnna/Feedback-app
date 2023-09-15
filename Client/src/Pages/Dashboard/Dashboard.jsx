import { Header } from "./components/Header";
import { CoursesSection } from "./components/CoursesSection";

const Dashboard = () => {
  return (
    <div className={"relative w-full overflow-hidden"}>
      <Header />
      <CoursesSection />
    </div>
  );
};

export default Dashboard;
