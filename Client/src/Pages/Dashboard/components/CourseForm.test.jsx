import { render, fireEvent } from "@testing-library/react";
import CourseForm from "./CourseForm";
import "../../../setupTest";

describe("CourseForm Component", () => {
  const mockOnSubmit = vi.fn();
  const mockSetCourseName = vi.fn();
  const mockSetCourseDescription = vi.fn();

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <CourseForm
        onSubmit={mockOnSubmit}
        courseName=""
        setCourseName={mockSetCourseName}
        courseDescription=""
        setCourseDescription={mockSetCourseDescription}
      />
    );
    const formElement = getByTestId("course-form");
    expect(formElement).toBeTruthy();
  });

  it("calls the onSubmit callback when the create button is clicked", () => {
    const { getByRole } = render(
      <CourseForm
        onSubmit={mockOnSubmit}
        courseName=""
        setCourseName={mockSetCourseName}
        courseDescription=""
        setCourseDescription={mockSetCourseDescription}
      />
    );

    fireEvent.click(getByRole("button", { name: "Create" }));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("updates input and textarea values correctly", () => {
    const { getByPlaceholderText } = render(
      <CourseForm
        onSubmit={mockOnSubmit}
        courseName=""
        setCourseName={mockSetCourseName}
        courseDescription=""
        setCourseDescription={mockSetCourseDescription}
      />
    );

    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "New Course" },
    });
    expect(mockSetCourseName).toHaveBeenCalledWith("New Course");

    fireEvent.change(getByPlaceholderText("Description"), {
      target: { value: "Course Description" },
    });
    expect(mockSetCourseDescription).toHaveBeenCalledWith("Course Description");
  });
});
