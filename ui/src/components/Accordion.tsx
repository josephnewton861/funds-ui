import { useState } from 'react';
import Table from './Table';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import { formatValues } from '../utils/utils';
import DoughnutChart from './DoughnutChart';
import AdditionalInfo from './AdditionalInfo';

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

type FundBreakdown = {
  portfolioAssets?: Fund['portfolioAssets'];
  documents?: Fund['documents'];
  holdings?: Fund['holdings'];
};

type AccordionProps = {
  funds: Fund[];
};

const Accordion = ({ funds }: AccordionProps) => {
  const [breakdownDetails, setBreakdownDetails] = useState<Record<number, FundBreakdown>>({});
  const [selectedFundId, setSelectedFundId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBreakdownDetails = async (fundId: number) => {
    if (breakdownDetails[fundId]) {
      setSelectedFundId(fundId);
      return;
    }

    try {
      setLoading(true);
      setSelectedFundId(fundId);

      const fund = await fetchAllFundDetails(fundId);

      const breakdown: FundBreakdown = {
        portfolioAssets: fund.portfolioAssets,
        documents: fund.documents,
        holdings: fund.holdings
      };

      setBreakdownDetails(prev => ({
        ...prev,
        [fundId]: breakdown
      }));
    } catch (error) {
      console.error('Error fetching fund details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFundDetails = async (fundId: number): Promise<Fund> => {
    console.log(`Fetching details for fund ID: ${fundId}`);
    const response = await axios.get(`http://localhost:3000/funds/${fundId}`);
    console.log('Fetched fund details:', response.data);
    return response.data;
  };

  return (
    <div className="container-fluid mt-5 mb-5 px-0">
      <div className="accordion" id="fundsAccordion">
        {funds.map((fund) => {
          const details = breakdownDetails[fund.id];

          return (
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

              <div id={`collapse${fund.id}`} className="accordion-collapse collapse">
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
                    {loading && selectedFundId === fund.id ? 'Loading...' : 'View breakdown Details'}
                  </button>

                  {selectedFundId === fund.id && details && (
                    <>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <h5>Portfolio Assets</h5>
                          {details.portfolioAssets?.length > 0 && (
                            <DoughnutChart values={details.portfolioAssets} />
                          )}
                        </div>

                        <div className="col-md-6">
                          <h5>Top 10 Holdings</h5>
                          {details.holdings?.map((holding) => (
                            <div key={holding.id}>
                              <p>
                                {holding.name}: {formatValues(holding.weighting)}%
                              </p>
                              <ProgressBar percentage={holding.weighting} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <h5>Additional Fund Information:</h5>
                      {details.documents?.map((document) => (
                        <AdditionalInfo document={document} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
