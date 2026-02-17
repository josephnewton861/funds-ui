// src/test/breakdown.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import Breakdown from "../components/Breakdown";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock child components
vi.mock("../components/DoughnutChart", () => ({
  default: ({ values }) => (
    <div data-testid="doughnut-chart">{values.length}</div>
  ),
}));
vi.mock("../components/ProgressBar", () => ({
  default: ({ percentage }) => (
    <div data-testid="progress-bar">{percentage}</div>
  ),
}));
vi.mock("../components/AdditionalInfo", () => ({
  default: ({ document }) => (
    <div data-testid="additional-info">{document.name}</div>
  ),
}));

describe("Breakdown Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_BASE_URL = "http://test-api";
  });

  it("shows loading initially and then renders fetched data", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        portfolioAssets: [{ id: 1, value: 50, label: "Bonds" }],
        holdings: [{ id: 1, name: "Stock A", weighting: 20 }],
        documents: [{ id: 1, name: "Doc A", url: "", type: "KIID" }],
      },
    });

    render(
      <MemoryRouter>
        <Breakdown fundId={1} />
      </MemoryRouter>
    );

    // Initially shows loading
    expect(screen.getByText("Loading…")).toBeInTheDocument();

    // Wait for data to load
    expect(await screen.findByTestId("doughnut-chart")).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
    expect(screen.getByTestId("additional-info")).toHaveTextContent("Doc A");
  });

  it("shows 'No data' if API returns empty", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    render(
      <MemoryRouter>
        <Breakdown fundId={2} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No data")).toBeInTheDocument();
    });
  });

  it("navigates to error page on API error", async () => {
    mockedAxios.get.mockRejectedValue({
      response: { status: 500, data: { message: "Server exploded" } },
    });

    render(
      <MemoryRouter>
        <Breakdown fundId={3} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/error", {
        replace: true,
        state: { statusCode: 500, message: "Server exploded" },
      });
    });
  });

  it("uses cached data if fundId already loaded", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        portfolioAssets: [{ id: 1, value: 50, label: "Equity" }],
      },
    });

    const { rerender } = render(
      <MemoryRouter>
        <Breakdown fundId={1} />
      </MemoryRouter>
    );

    // Wait for first load
    await screen.findByTestId("doughnut-chart");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    // Rerender with same fundId, should use cache
    rerender(
      <MemoryRouter>
        <Breakdown fundId={1} />
      </MemoryRouter>
    );

    await screen.findByTestId("doughnut-chart");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
