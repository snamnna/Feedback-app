import { renderWithProviders, screen, userEvent } from "@/utils/test-utils";
import { vi } from "vitest";
import Login from './Login';


describe('Login Component', () => {
  const handleSubmit = vi.fn();
    beforeEach(() => {
        handleSubmit.mockClear();
    });

    test("renders login component", () => {
        renderWithProviders(
            <Login
                handleSubmit={handleSubmit}
            />
        );
        const loginForm = screen.getByTestId("login");
        expect(loginForm).toBeInTheDocument();

    });

    test("renders login form with correct fields", () => {
        renderWithProviders(
            <Login
                handleSubmit={handleSubmit}
            />
        );
        const usernameField = screen.getByLabelText("Username");
        const passwordField = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button");

        expect(usernameField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();

        expect(usernameField).toHaveAttribute("type", "text");
        expect(passwordField).toHaveAttribute("type", "password");
        expect(loginButton).toHaveAttribute("type", "submit");
    });

    test("renders login form with correct labels", () => {
        renderWithProviders(
            <Login
                handleSubmit={handleSubmit}
            />
        );

        const usernameLabel = screen.getByText("Username");
        const passwordLabel = screen.getByText("Password");
        const loginButton = screen.getByRole("button");

        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();

        expect(usernameLabel).toHaveAttribute("for", "login-username");
        expect(passwordLabel).toHaveAttribute("for", "login-password");
        expect(loginButton).toHaveAttribute("type", "submit");
    });

    test("submits the form", () => {
        renderWithProviders(
            <Login
                handleSubmit={handleSubmit}
            />
        );
        const usernameField = screen.getByPlaceholderText("Username");
        const passwordField = screen.getByPlaceholderText("Password");
        const button = screen.getByText("Sign In");

        userEvent.type(usernameField, "username");
        userEvent.type(passwordField, "password");

        userEvent.type(usernameField, "username").then(() => {
            expect(usernameField).toHaveValue("username");
        });

        userEvent.type(passwordField, "password").then(() => {
            expect(passwordField).toHaveValue("password");
        });

        vi.spyOn(handleSubmit, "getMockImplementation").mockReturnValue = vi.fn();

        userEvent.click(button).then(() => {
            expect(handleSubmit).toHaveBeenCalledTimes(1);
        });
    });

});
