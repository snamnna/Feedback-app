import { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../features/courseApi";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LectureCard from "./components/LectureCard";

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

//TODO: perustiedot kurssista nätisti esille: nimi, kurssin ohjaaja(?) jne
// Request enrollment jos ei ole mukana kurssilla.

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const { data, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [search, setSearch] = useState("");

  //TODO: hae kurssista luennot ja filtteröi ne / laita ne esille

  const filterLectures = placeholderLectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const { course } = data;
      setCourse(course);
    }
  }, [data]);

  return (
    <div>
      <div className="flex justify-between mx-20 mt-5">
        <h1> Course Details for {course.name}</h1>

        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Search Lectures"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <LectureList lectures={filterLectures} />
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
      <ul className="flex flex-col max-w-10xl">
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
