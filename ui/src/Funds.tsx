import './App.css';
import Header from './components/Header';
import Error from './Error';
import { Routes, Route } from "react-router-dom";
import TooltipInitialiser from './components/TooltipInitialiser';
import Dashboard from './Dashboard';


const Funds = () => {
  return (
    <>
      <Header />
      <div>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<Error />} />
          </Routes>
          <TooltipInitialiser />
      </div>
    </>
  );
};

export default Funds;