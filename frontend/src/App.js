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
const CreateAdForm = lazy(() => import("./components/adverts/CreateAdForm"));
const EditAdForm = lazy(() => import("./components/adverts/EditAdForm"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const CreateRegister = lazy(() => import("./components/auth/register"));
const Recovery = lazy(() => import("./components/recovery/recovery"));
const PasswordNew = lazy(() => import("./components/recovery/newpass"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/adverts" element={<AdvertsList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<CreateRegister />} />
            <Route path="/" element={<Navigate to="/adverts" />} />
            <Route path="/create-advert" element={<CreateAdForm />} />
            <Route path="/edit/:id" element={<EditAdForm />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/restore-password" element={<PasswordNew />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
