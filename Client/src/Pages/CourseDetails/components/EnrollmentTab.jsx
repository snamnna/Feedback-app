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
      try {
        const enrollmentData = await courseService.getEnrollments(
          courseId,
          token
        );
        setEnrolls(enrollmentData);
      } catch (error) {
        console.error("Enrollments retrieval failed:", error);
      }
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
      // Poista hyväksytty ilmoittautuminen tilasta
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
      // Poista hylätty ilmoittautuminen tilasta
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
      <ul>
        {enrollments.map((enrollment) => (
          <li
            key={enrollment.userId}
            className="m-5 border-b flex flex-row p-3"
          >
            <p>
              Username: {enrollment.username} id: {enrollment.userId}
            </p>
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
    </div>
  );
};

export default EnrollmentTab;
