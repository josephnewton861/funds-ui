import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "./components/Table";

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

const Dashboard = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [funds, setFunds] = useState<Fund[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFundId, setSelectedFundId] = useState<number | null>(null);

    // Retrieves the days fund data from DB
    const loadFunds = useCallback(async () => {
        setLoading(true);
        try {
        const res = await axios.get<Fund[]>(`${baseUrl}/funds`);
        setFunds(res.data ?? []);
        } catch (err: any) {
        const status = err?.response?.status ?? 500;
        const data = err?.response?.data;
        const serverMsg = (data && (data.message || data.error)) ||
            err?.message ||
            "An unexpected error occurred";

        navigate("/error", {
            replace: true,
            state: { statusCode: status, message: serverMsg },
        });
        } finally {
        setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        // Fetch funds when Dashboard renders
        loadFunds();
    }, [loadFunds]);

    const toggleRow = (id: number) =>
        setSelectedFundId((current) => (current === id ? null : id));

    return (
        <div className="mt-3">
            <div className="alert alert-light border shadow-sm mb-4">
                <h4 className="fw-bold mb-2">
                    <i className="bi bi-info-circle-fill me-2 text-primary"></i>
                    Fund Dashboard Overview
                </h4>

                <p className="mb-0 text-secondary">
                    This dashboard helps you explore each investment fund option more clearly.  
                    Use the table below to review performance, charges, and risk metrics.  
                    Click <strong>View breakdown</strong> to see a detailed asset allocation,
                    holdings, and fund documents.
                </p>
            </div>
            <Table
                funds={funds}
                loading={loading}
                selectedFundId={selectedFundId}
                onToggleRow={toggleRow}
            />
        </div>
    );
};

export default Dashboard;