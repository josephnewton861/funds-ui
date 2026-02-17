import type { JSX } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Breakdown from "./Breakdown";
import Rating from "./Rating";
import { formatValues } from "../utils/utils";
import TooltipLabel from "./TooltipLabel";

type Fund = {
  id: number;
  name: string;
  marketCode: string;
  lastPrice: number;
  lastPriceDate: string;
  ongoingCharge: number;
  sectorName: string;
  currency: string;
  objective: string;
  analystRating: number;
  srri: number;
  analystRatingLabel: string;
};

type Props = {
  funds: Fund[];
  loading?: boolean;
  selectedFundId: number | null;
  onToggleRow: (id: number) => void;
};

const Table = ({ funds, loading = false, selectedFundId, onToggleRow }: Props) => {
  // Render loading state if requested
  if (loading && !funds.length) {
    return (
      <div className="container-fluid mt-2 mb-2">
        <div className="text-muted text-start">Loading…</div>
      </div>
    );
  }

  if (!loading && !funds.length) {
    return (
      <div className="container-fluid mt-2 mb-2">
        <div className="text-muted text-start">No funds available</div>
      </div>
    );
  }
  
  // Build the main rows and an optional details row per fund
  const rows: JSX.Element[] = [];
  for (const fund of funds) {
    const isOpen = selectedFundId === fund.id;
    const isBreakdownVisible = isOpen ? "Hide breakdown" : "View breakdown";

    rows.push(
      <tr key={`row-${fund.id}`}>
        <td>{fund.name}</td>
        <td>
          <span>{fund.marketCode}</span>
        </td>
        <td>
          <span>{formatValues(fund.lastPrice)}</span>
        </td>
        <td>{fund.lastPriceDate}</td>
        <td>
          <span>{formatValues(fund.ongoingCharge)}</span>
        </td>
        <td>
          <span>{fund.sectorName}</span>
        </td>
        <td>
          <span>{fund.currency}</span>
        </td>
        <td>
          <span>
            <Rating rating={fund.analystRating} length={5} />
          </span>
        </td>
        <td>
          <span>{fund.srri}</span>
        </td>
        <td>{fund.analystRatingLabel}</td>
        <td className="text-end">
          <button
            type="button"
            className="btn btn-link p-0 text-primary"
            onClick={() => onToggleRow(fund.id)}
            aria-expanded={isOpen}
            aria-controls={`details-${fund.id}`}
          >
            {isBreakdownVisible}
          </button>
        </td>
      </tr>
    );

    if (isOpen) {
      rows.push(
        <tr key={`details-${fund.id}`}>
          <td colSpan={11} className="bg-light-subtle">
            <div id={`details-${fund.id}`} className="p-3 border rounded">
              <Breakdown fundId={fund.id} />
            </div>
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="container-fluid mt-2 mb-2">
      <table className="table table-striped table-hover">
        <thead className="table">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">
              Market Code
              <TooltipLabel label="marketCode" />
            </th>
            <th scope="col">
              Last Price
              <TooltipLabel label="lastPrice" />
            </th>
            <th scope="col">Last Price Date</th>
            <th scope="col">
              Ongoing Charge
              <TooltipLabel label="ongoingCharge" />
            </th>
            <th scope="col">
              Sector
              <TooltipLabel label="sector" />
            </th>
            <th scope="col">
              Currency
              <TooltipLabel label="currency" />
            </th>
            <th scope="col">
              Analyst Rating
              <TooltipLabel label="rating" />
            </th>
            <th scope="col">
              SRRI
              <TooltipLabel label="srri" />
            </th>
            <th scope="col">
              Rating Label
              <TooltipLabel label="ratingLabel" />
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;