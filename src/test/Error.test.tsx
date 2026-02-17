import { render, screen } from "@testing-library/react";
import Error from "../Error";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom"; // Needed for Link / Router context

// Mock react-router-dom useLocation hook
const mockUseLocation = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

describe("Error page", () => {
  it("renders default 404 page when no state is provided", () => {
    mockUseLocation.mockReturnValue({ state: undefined });
    
    // Mock react router with memory router
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText("Error 404")).toBeInTheDocument(); // Default status
    expect(screen.getByText("Page not found.")).toBeInTheDocument(); // Default message
    expect(screen.getByRole("link", { name: /Return Home/i })).toBeInTheDocument(); // Return home link
  });

  it("renders provided status and message from location.state", () => {
    mockUseLocation.mockReturnValue({
      state: { statusCode: 500, message: "Server error occurred" },
    });
    // Mock react router with memory router
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText("Error 500")).toBeInTheDocument(); // Custom status
    expect(screen.getByText("Server error occurred")).toBeInTheDocument(); // Custom message
    expect(screen.getByRole("link", { name: /Return Home/i })).toBeInTheDocument(); // Return home link
  });
});
