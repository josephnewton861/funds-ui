// src/test/table.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "../components/Table";
import { vi } from "vitest";

// Mock child components
vi.mock("../components/Breakdown", () => ({
  default: ({ fundId }) => <div data-testid={`breakdown-${fundId}`}>Breakdown {fundId}</div>,
}));
vi.mock("../components/Rating", () => ({
  default: ({ rating }) => <span data-testid="rating">{rating}</span>,
}));
vi.mock("../components/TooltipLabel", () => ({
  default: ({ label }) => <span data-testid={`tooltip-${label}`}>{label}</span>,
}));

describe("Table Component", () => {
    // Sample fund data for testing
  const sampleFunds = [
    {
      id: 1,
      name: "Fund A",
      marketCode: "EQ1",
      lastPrice: 100,
      lastPriceDate: "2026-02-16",
      ongoingCharge: 0.5,
      sectorName: "Equity",
      currency: "USD",
      analystRating: 4,
      srri: 3,
      analystRatingLabel: "Good",
      objective: "Growth",
    },
    {
      id: 2,
      name: "Fund B",
      marketCode: "EQ2",
      lastPrice: 200,
      lastPriceDate: "2026-02-15",
      ongoingCharge: 0.75,
      sectorName: "Bond",
      currency: "EUR",
      analystRating: 3,
      srri: 2,
      analystRatingLabel: "Average",
      objective: "Income",
    },
  ];

  it("renders loading state", () => {
    render(<Table funds={[]} loading selectedFundId={null} onToggleRow={vi.fn()} />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("renders no funds message", () => {
    render(<Table funds={[]} loading={false} selectedFundId={null} onToggleRow={vi.fn()} />);
    expect(screen.getByText("No funds available")).toBeInTheDocument();
  });

  it("renders list of funds", () => {
    render(<Table funds={sampleFunds} selectedFundId={null} onToggleRow={vi.fn()} />);
    expect(screen.getByText("Fund A")).toBeInTheDocument();
    expect(screen.getByText("Fund B")).toBeInTheDocument();
    expect(screen.getAllByTestId("rating")).toHaveLength(2);
    expect(screen.getAllByTestId("tooltip-marketCode")).toHaveLength(1); // column header
  });

  it("calls onToggleRow when button is clicked", async () => {
    const user = userEvent.setup();
    const onToggleRow = vi.fn();

    render(<Table funds={sampleFunds} selectedFundId={null} onToggleRow={onToggleRow} />);

    const buttons = screen.getAllByRole("button", { name: /View breakdown/i });
    await user.click(buttons[0]);

    expect(onToggleRow).toHaveBeenCalledWith(1);
  });

  it("renders Breakdown row when selected", () => {
    render(<Table funds={sampleFunds} selectedFundId={1} onToggleRow={vi.fn()} />);

    expect(screen.getByTestId("breakdown-1")).toBeInTheDocument();
  });
});
