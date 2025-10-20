import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormProvider";
import Step1 from "./components/forms/Step1";
import Step2 from "./components/forms/Step2";
import Step3 from "./components/forms/Step3";

const App = () => {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/step3" element={<Step3 />} />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
