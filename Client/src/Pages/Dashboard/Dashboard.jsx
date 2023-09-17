import { DashboardHeader } from "./components/DashboardHeader";
import { CoursesSection } from "./components/CoursesSection";

const Dashboard = () => {
  return (
    <div className={"relative w-full overflow-hidden"}>
      <DashboardHeader />
      <CoursesSection />
    </div>
  );
};

export default Dashboard;
