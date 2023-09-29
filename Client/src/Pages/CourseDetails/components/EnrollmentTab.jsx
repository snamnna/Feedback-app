import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import courseService from "../../../services/courseService";

const EnrollmentTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const courseId = course.id;
  const [enrollments, setEnrolls] = useState([]);
  const [enrollmentsAvailable, setEnrollmentsAvailable] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getEnrollments = async () => {
      console.log(courseId);
      const EnrollmentData = await courseService.getEnrollments(
        courseId,
        token
      );

      // Update if there is enrollments available
      setEnrollmentsAvailable(EnrollmentData.length > 0);

      setEnrolls(EnrollmentData);
    };
    getEnrollments();
  }, [courseId, token]);

  const acceptEnroll = async (userId) => {
    try {
      const response = await courseService.acceptEnrollment(
        courseId,
        userId,
        token
      );

      setEnrolls((prevEnrolls) =>
        prevEnrolls.filter((enroll) => enroll.userId !== userId)
      );

      console.log("Enrollment accepted:", response);
    } catch (error) {
      console.error("Enrollment acceptance failed:", error);
    }
  };

  const rejectEnroll = async (userId) => {
    try {
      const response = await courseService.rejectEnrollment(
        courseId,
        userId,
        token
      );

      setEnrolls((prevEnrolls) =>
        prevEnrolls.filter((enroll) => enroll.userId !== userId)
      );

      console.log("Enrollment rejected:", response);
    } catch (error) {
      console.error("Enrollment rejection failed:", error);
    }
  };

  return (
    <div className="text-center max-w-xl mx-auto flex flex-col items-center">
      <h1 className="font-bold text-xl">Enrollments</h1>
      {enrollmentsAvailable ? (
        <ul>
          <li>Enrolled students, please accept or reject:</li>
          {enrollments.map((enrollment) => (
            <li
              key={enrollment.userId}
              className="m-5 border-b flex flex-row p-3"
            >
              <p>id: {enrollment.userId}</p>
              <button
                className="btn btn-primary btn-xs mx-2"
                onClick={() => acceptEnroll(enrollment.userId)}
              >
                Accept
              </button>
              <button
                className="btn btn-danger btn-xs mx-2"
                onClick={() => rejectEnroll(enrollment.userId)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No enrollments available.</p>
      )}
    </div>
  );
};

export default EnrollmentTab;
