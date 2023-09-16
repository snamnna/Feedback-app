import { DashboardHeader } from "./components/DashboardHeader";
import { CoursesSection } from "./components/CoursesSection";
import { useEffect } from "react";
import courseService from "../../services/courseService";

const Dashboard = () => {
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await courseService.getCourses();
        console.log("Courses:", courses);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchCourses().then(() => console.log("Courses fetched"));
  }, []);

  return (
    <div className={"relative w-full overflow-hidden"}>
      <DashboardHeader />
      <CoursesSection />
    </div>
  );
};

export default Dashboard;
