import { useState } from 'react';
import Table from './Table';
import axios from 'axios';
import ProgresBar from './ProgressBar';
import { formatValues } from '../utils/utils';

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
  portfolioAssets?: {
    id: number;
    value: number;
    label: string;
  }[];
  documents?: {
    id: number;
    name: string;
    url: string;
    type: string;
  }[];
  holdings?: { id: number; name: string; weighting: number }[];
};

type AccordionProps = {
  funds: Fund[];
};

const Accordion = ({ funds }: AccordionProps) => {
  // holds the fetched breakdown for ONE fund at a time
  const [breakdownDetails, setBreakdownDetails] = useState<Fund | null>(null);
  const [selectedFundId, setSelectedFundId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBreakdownDetails = async (fundId: number) => {
    try {
      setLoading(true);
      setSelectedFundId(fundId);

      const fund = await fetchAllFundDetails(fundId);

      if (!fund) throw new Error('Fund not found');

      setBreakdownDetails(fund);
    } catch (error) {
      console.error('Error fetching fund details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFundDetails = async (fundId: number): Promise<Fund> => {
    const response = await axios.get(`http://localhost:3000/funds/${fundId}`);
    return response.data;
  };

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

                <button
                  onClick={() => handleBreakdownDetails(fund.id)}
                  disabled={loading && selectedFundId === fund.id}
                  className="btn btn-primary mt-3"
                >
                  {loading && selectedFundId === fund.id
                    ? 'Loading...'
                    : 'View breakdown Details'}
                </button>

                {selectedFundId === fund.id && breakdownDetails && (
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <h5>Portfolio Assets</h5>
                      <Doughnut portfolioAssets={breakdownDetails?.portfolioAssets}/>
                      {/* {breakdownDetails.portfolioAssets?.map((asset) => (
                        <div key={asset.id}>
                          <p>
                            {asset.label}: {asset.value}%
                          </p>
                        </div>
                      ))} */}
                    </div>

                    <div className="col-md-6">
                      <h5>Top 10 Holdings</h5>
                      {breakdownDetails.holdings?.map((holding) => (
                        <div key={holding.id}>
                          <p>
                            {holding.name}: {formatValues(holding.weighting)}%
                          </p>
                          <ProgresBar percentage={holding.weighting} />
                        </div>
                      ))}
                    </div>

                    {/* <div className="col-md-4">
                      <h5>Documents</h5>
                      {breakdownDetails.documents?.map((doc) => (
                        <div key={doc.id}>
                          <a href={doc.url} target="_blank" rel="noreferrer">
                            {doc.name}
                          </a>
                        </div>
                      ))}
                    </div> */}
                  </div>
                  
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
