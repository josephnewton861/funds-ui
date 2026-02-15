import Rating from './Rating';

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

type TableProps = {
  fund: Fund;
};

const Table = ({ fund }: TableProps) => {
  return (
    <div className="container-fluid mt-2 mb-2">
      <table className="table table-striped table-hover">
        <thead className="table">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Market Code</th>
            <th scope="col">Last Price</th>
            <th scope="col">Last Price Date</th>
            <th scope="col">Ongoing Charge</th>
            <th scope="col">Sector</th>
            <th scope="col">Currency</th>
            <th scope="col">Analyst Rating</th>
            <th scope="col">SRRI</th>
            <th scope="col">Rating Label</th>
          </tr>
        </thead>
        <tbody>
            <tr key={fund.id}>
              <td>{fund.name}</td>
              <td>{fund.marketCode}</td>
              <td>{fund.lastPrice}</td>
              <td>{fund.lastPriceDate}</td>
              <td>{fund.ongoingCharge}</td>
              <td>{fund.sectorName}</td>
              <td>{fund.currency}</td>
              <td><Rating rating={fund.analystRating} length={5} /></td>
              <td>{fund.srri ?? ""}</td>
              <td>{fund.analystRatingLabel}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;