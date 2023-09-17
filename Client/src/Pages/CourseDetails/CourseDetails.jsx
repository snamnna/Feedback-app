import { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../features/courseApi";
import { useParams } from "react-router";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const { data, error, isLoading } = useGetCourseByIdQuery(courseId);

  useEffect(() => {
    if (data) {
      setCourse(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Course Details</h1>
      {course.name}
    </div>
  );
};

export default CourseDetails;
