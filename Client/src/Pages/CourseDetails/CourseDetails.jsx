import { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../features/courseApi";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LectureCard from "./components/LectureCard";
import { useSelector } from "react-redux";
import courseService from "../../services/courseService";

const placeholderLectures = [
  {
    id: 1,
    name: "lecture 1",
    feedback: "bad",
  },
  {
    id: 2,
    name: "lecture 2",
    feedback: "bad",
  },
  {
    id: 3,
    name: "lecture 3",
    feedback: "bad",
  },
  {
    id: 4,
    name: "lecture 4",
    feedback: "bad",
  },
  {
    id: 5,
    name: "lecture 5",
    feedback: "bad",
  },
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const { data, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [search, setSearch] = useState("");
  const [enrollmentStatus, setEnrollmentStatus] = useState("APPROVED"); //VÄLIAIKASESTI APPROVED TÄÄLLÄ KUN EI VIELÄ TOIMI
  const token = useSelector((state) => state.auth.token);

  //TODO: hae kurssista luennot ja filtteröi ne / laita ne esille

  const filterLectures = placeholderLectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const { course, courseEnrollment } = data;
      setCourse(course);

      //Yritystä enrollmentstatuksen hakuun.Pitäskö pystyä hakee tokenilla vrt userId jos ei, mitenhän saan käyttöön userid
      const findEnrollmentStatus = courseEnrollment.find(
        (enrollment) => enrollment.user.id === token
      );
      //jos kurssin ilmottautumisista löytyy käyttäjä lisätään status
      if (findEnrollmentStatus) {
        setEnrollmentStatus(enrollmentStatus.status);
      }
    }
  }, [data]);

  const handleEnroll = async (e) => {
    e.preventDefault();
    const enroll = await courseService.courseEnrollment(course.id, token);
    console.log("enroll");
    //TODO: joku viesti et on tehty pyyntö ja sit joku systeemi et ei voi pyytää montaa kertaa et pääsis kurssille
  };

  //jos Enrollmentstatus on approved näytetään kurssin luennot
  if (enrollmentStatus === "APPROVED") {
    return (
      <div className="bg-secondary p-5">
        <div className="flex justify-between mx-20 ">
          <h1 className="my-2 text-xl font-bold">
            {" "}
            Lectures for course {course.name}
          </h1>
          <input
            className="border border-gray-300 rounded-md"
            type="text"
            placeholder="Search Lectures"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <LectureList lectures={filterLectures} />
      </div>
    );
  }
  return (
    <div className="mx-10 my-20">
      <div className="text-center my-30 max-w-full max-h-xl bg-secondary-content rounded-md p-5 shadow-md">
        <h1 className="my-2 text-3xl font-bold">Details for {course.name}</h1>
        <p className="my-2 mx-5">
          {" "}
          tähän tulee tekstiä kun hommat toimii
          {course.description}
        </p>
        <button onClick={() => handleEnroll()} className="btn btn-primary my-2">
          Request to join the course
        </button>
      </div>
    </div>
  );
};

const LectureList = ({ lectures }) => {
  const navigate = useNavigate();
  const handleClick = (lectureId) => {
    // redirect to lecture details page
    navigate(`/lectures/${lectureId}`);
  };

  return (
    <div>
      <ul className="flex flex-col mt-3">
        {lectures.map((lecture) => (
          <li
            className="mx-20"
            key={lecture.id}
            onClick={() => handleClick(lecture.id)}
          >
            <LectureCard lecture={lecture} />
          </li>
        ))}
      </ul>
    </div>
  );
};

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      feedback: PropTypes.string.isRequired,
    })
  ),
};

export default CourseDetails;
