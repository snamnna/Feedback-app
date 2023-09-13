import { CoursesSection, Header } from "./components/Header";

const Dashboard = () => {
  return (
    <div className={"p-8"}>
      <Header />
      <CoursesSection />
    </div>
  );
};

export default Dashboard;
