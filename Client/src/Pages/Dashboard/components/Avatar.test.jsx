import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Avatar } from "./Avatar";
describe("Avatar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Avatar />);
    expect(container).toBeTruthy();
  });

  it("displays the first letter of username", () => {
    const user = { username: "test" };
    const { getByText } = render(<Avatar user={user} />);

    const firstLetterElement = getByText("t");
    expect(firstLetterElement).toBeInTheDocument();
  });

  it("displays the default prop", () => {
    const { getByText } = render(<Avatar />);

    const defaultLetterElement = getByText("U");
    expect(defaultLetterElement).toBeInTheDocument();
  });
});
