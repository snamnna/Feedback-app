import { cleanup, render } from "@testing-library/react";
import CourseCard from "./CourseCard";

const course = {
  name: "Course",
  description: "Description",
  image: "image.png",
};

describe("CourseCard", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const { container } = render(<CourseCard course={course} />);
    expect(container).toBeTruthy();
  });

  describe("CourseCard content", () => {
    it("displays the course name", () => {
      const { getByText } = render(<CourseCard course={course} />);
      const courseName = getByText(course.name);
      expect(courseName).toBeInTheDocument();
    });

    it("displays the course description", () => {
      const { getByText } = render(<CourseCard course={course} />);
      const courseDescription = getByText(course.description);
      expect(courseDescription).toBeInTheDocument();
    });

    it("displays the course image", () => {
      const { getByTestId } = render(<CourseCard course={course} />);
      const courseImage = getByTestId("course-image");
      expect(courseImage).toBeInTheDocument();
    });
  });
});
