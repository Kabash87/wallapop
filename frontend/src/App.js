import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const AdvertsList = lazy(() => import("./components/adverts/AdvertsList"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/adverts" element={<AdvertsList />} />
            <Route path="/" element={<Navigate to="/adverts" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
