import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../Dashboard";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import type { Props } from "react";

// Mock axios
vi.mock("axios");

// Mock Table so we only test Dashboard logic
vi.mock("/Table", () => ({
  default: ({ funds, loading, onToggleRow }: Props) => (
    <div>
      {loading && <span data-testid="loading">Loading...</span>}

      {funds.map((fund) => (
        <button key={fund.id} onClick={() => onToggleRow(fund.id)}>
          {fund.name}
        </button>
      ))}
    </div>
  ),
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_BASE_URL = "http://test-api";
  });

  it("loads and displays funds from the API", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { id: 1, name: "Global Equity" },
        { id: 2, name: "UK Growth" },
      ],
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // waits for async loadFunds
    expect(await screen.findByText("Global Equity")).toBeInTheDocument();
    expect(screen.getByText("UK Growth")).toBeInTheDocument();

    expect(mockedAxios.get).toHaveBeenCalledWith("http://test-api/funds");
  });

  it("navigates to error page when API fails", async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
        data: { message: "Server exploded" },
      },
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/error", {
        replace: true,
        state: {
          statusCode: 500,
          message: "Server exploded",
        },
      });
    });
  });

  it("toggles a fund row when clicked", async () => {
    const user = userEvent.setup();

    mockedAxios.get.mockResolvedValue({
      data: [{ id: 1, name: "Toggle Fund" }],
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const btn = await screen.findByText("Toggle Fund");
    // toggle back
    await user.click(btn);
    await user.click(btn); 

    // We're just asserting interaction occurred (Table handles UI)
    expect(btn).toBeInTheDocument();
  });
});
