import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import courseService from "../../../services/courseService";

const EnrollmentTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const courseId = course.id;
  const [enrollments, setEnrolls] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getEnrollments = async () => {
      console.log(courseId);
      const EnrollmentData = await courseService.getEnrollments(
        courseId,
        token
      );

      console.log("Enrollment data: ", EnrollmentData);

      setEnrolls(EnrollmentData.enrollments);
    };
    getEnrollments();
  }, [courseId, token]);

  const acceptEnroll = async (userId) => {
    try {
      const data = { courseId, userId, status: "APPROVED" };
      const response = await courseService.acceptEnrollment(data, token);
      console.log(response);

      setEnrolls((prevEnrolls) =>
        prevEnrolls.filter((enroll) => enroll.userId !== userId)
      );

      console.log("Enrollment accepted:", response);
    } catch (error) {
      console.error("Enrollment acceptance failed:", error);
    }
  };

  // Tämä toimii
  const deleteEnroll = async (userId) => {
    try {
      const data = { courseId, userId, status: "REJECTED" };
      const response = await courseService.acceptEnrollment(data, token);
      console.log(response);

      setEnrolls((prevEnrolls) =>
        prevEnrolls.filter((enroll) => enroll.userId !== userId)
      );

      console.log("Enrollment deleted:", response);
    } catch (error) {
      console.error("Enrollment delete failed:", error);
    }
  };

  return (
    <div className="text-center max-w-xl mx-auto flex flex-col items-center">
      <h1 className="font-bold text-xl">Enrollments</h1>
      {enrollments.length ? (
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
                onClick={() => deleteEnroll(enrollment.userId)}
              >
                Delete
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
