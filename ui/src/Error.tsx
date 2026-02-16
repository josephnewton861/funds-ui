import { useLocation, Link } from "react-router-dom";

type ErrorState = {
  message?: string;
  statusCode?: number;
  from?: string;
};

export default function ErrorPage() {
  const location = useLocation();
  const state = (location.state || {}) as ErrorState;

  const status = state.statusCode ?? 404;
  const message = state.message ?? "Page not found.";

  return (
    <div className="container d-flex justify-content-center">
      <div className="text-center p-4 mt-5 border rounded shadow-sm bg-light" style={{ maxWidth: 500 }}>
        <h1 className="display-4 text-danger">Error {status}</h1>

        <p className="lead mb-4">{message}</p>

        {state.from && (
          <Link to={state.from} className="d-block mb-2 text-primary">
            Go back
          </Link>
        )}

        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
}