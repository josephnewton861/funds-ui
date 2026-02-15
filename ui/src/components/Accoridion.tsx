import Table from './Table';

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

type AccoridionProps = {
  funds: Fund[];
};

const Accoridion = ({ funds }: AccoridionProps) => {
  return (
    <div className="container-fluid mt-5 mb-5 px-0">
      <div className="accordion" id="fundsAccordion">
        {funds.map((fund) => (
          <div key={fund.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${fund.id}`}
                aria-expanded="false"
                aria-controls={`collapse${fund.id}`}
              >
                {`${fund.name} (${fund.marketCode})`}
              </button>
            </h2>
            <div
              id={`collapse${fund.id}`}
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                <p className="mt-3">
                  <strong>Objective:</strong> {fund.objective}
                </p>
                <Table fund={fund} />
                <button className="btn btn-primary mt-3">View breakdown Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accoridion;