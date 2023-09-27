import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import courseService from "../../../services/courseService";

const ParticipantsTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const courseId = course.id;
  const [participants, setParticipants] = useState([]);

  const phparticipants = [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
    { id: 4, username: "user4" },
    { id: 5, username: "user5" },
  ];

  //TODO: ei toimi vielä oikein
  useEffect(() => {
    const getParticipants = async () => {
      console.log(courseId);
      const participantsData = await courseService.getCourseStudents(courseId);
      setParticipants(participantsData);
    };
    getParticipants();
  }, [courseId]);

  return (
    <div className="text-center max-w-xl mx-auto flex flex-col items-center">
      <h1 className="font-bold text-xl">Participants</h1>
      <ul>
        {/*VAIHDA PARTICIPANTSIIN KUN SE TOIMII*/}
        {phparticipants.map((user) => (
          <li key={user.id} className="m-5 border-b p-3">
            Username: {user.username} id: {user.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsTab;
