import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoughnutChart from './DoughnutChart';
import ProgressBar from './ProgressBar';
import AdditionalInfo from './AdditionalInfo';
import { formatValues } from '../utils/utils';

type FundDetails = {
  portfolioAssets?: { id: number; value: number; label: string }[];
  documents?: { id: number; name: string; url: string; type: string }[];
  holdings?: { id: number; name: string; weighting: number }[];
};

type Props = { fundId: number };

const Breakdown = ({ fundId }: Props) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;


  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<FundDetails | null>(null);

  // In memory cache for this component instance to avoid refetching the same fundId
  const cacheRef = useRef<Map<number, FundDetails>>(new Map());

  const loadFundDetails = useCallback(
    async (id: number, controller: AbortController) => {
      // Use cached data if we already fetched this fund
      const cached = cacheRef.current.get(id);
      if (cached) {
        setDetails(cached);
        return;
      }

      setLoading(true);
      try {
        // Pass controller.signal so axios can cancel the request if aborted
        const res = await axios.get(`${baseUrl}/funds/${id}`, {
          signal: controller.signal,
        });

        const d: FundDetails = {
          portfolioAssets: res.data?.portfolioAssets ?? [],
          documents: res.data?.documents ?? [],
          holdings: res.data?.holdings ?? [],
        };

        cacheRef.current.set(id, d); // Cache for subsequent visits to same fundId
        setDetails(d);
      } catch (err: any) {
        // Ignore cancelled requests (fundId changed or component unmounted)
        if (axios.isCancel(err)) return;

        // Navigate to error page
        const status = err?.response?.status ?? 500;
        const data = err?.response?.data;
        const serverMsg =
          (data && (data.message || data.error)) ||
          err?.message ||
          'An unexpected error occurred';

        navigate('/error', {
          replace: true,
          state: { statusCode: status, message: serverMsg },
        });
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    // AbortController lets us cancel the in-flight request if fundId changes or component unmounts
    const controller = new AbortController();

    loadFundDetails(fundId, controller);

    // Cancel the request to prevent stale updates
    return () => controller.abort();
  }, [fundId, loadFundDetails]);

  if (loading && !details) return <div>Loading…</div>;
  if (!details) return <div className="text-muted">No data</div>;

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <h5>Portfolio Assets</h5>
          {details.portfolioAssets?.length ? (
            <DoughnutChart values={details.portfolioAssets} />
          ) : (
            <p className="text-muted">No data</p>
          )}
        </div>

        <div className="col-md-4">
          <h5>Top 10 Holdings</h5>
          <div style={{ height: '500px', overflowY: 'auto' }}>
            {details.holdings?.map((h) => (
              <div key={h.id} className="mb-2">
                <p className="mb-1">
                  {h.name}: {formatValues(h.weighting)}%
                </p>
                <ProgressBar percentage={h.weighting} />
              </div>
            ))}
            {!details.holdings?.length && (
              <p className="text-muted">No holdings data</p>
            )}
          </div>
        </div>

        <div className="col-md-4 text-break">
          <h5>Useful Information</h5>
          {details.documents?.map((d) => (
            <AdditionalInfo key={d.id} document={d} />
          ))}
        </div>
      </div>

      {!details.documents?.length && (
        <p className="text-muted">No documents available</p>
      )}
    </>
  );
};

export default Breakdown;