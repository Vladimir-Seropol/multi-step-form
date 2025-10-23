import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormProvider";
import Step1 from "./components/pages/Step1";
import Step2 from "./components/pages/Step2";
import Step3 from "./components/pages/Step3";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route
            path="/step2"
            element={
              <ProtectedRoute requiredFields={['firstName','lastName','phone','gender']}>
                <Step2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/step3"
            element={
              <ProtectedRoute requiredFields={['workPlace','address']}>
                <Step3 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
