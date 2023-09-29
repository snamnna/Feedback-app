import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import courseService from "../../../services/courseService";

const ParticipantsTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const courseId = course.id;
  const [participants, setParticipants] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getParticipants = async () => {
      console.log(courseId);
      const participantsData = await courseService.getCourseStudents(
        courseId,
        token
      );
      setParticipants(participantsData);
    };
    getParticipants();
  }, [courseId]);

  const handleRemoveStudent = async (userId) => {
    //TODO: tee loppuun
  };
  if (participants.length > 0) {
    return (
      <div className="text-center max-w-xl mx-auto flex flex-col items-center">
        <h1 className="font-bold text-xl">Participants</h1>
        <ul>
          {participants.map((user) => (
            <li key={user.id} className="m-5 border-b flex flex-row p-3">
              <p>
                Username: {user.username} id: {user.id}
              </p>
              <button
                className="btn btn-primary btn-xs mx-5"
                onClick={() => handleRemoveStudent(user.id)}
              >
                remove student
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <p className="border p-7 rounded-md mt-10 mb-20">No participants found</p>
    </div>
  );
};

export default ParticipantsTab;
