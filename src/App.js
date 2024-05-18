// import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result/:username" element={<ResultPage />} />
        <Route path="*" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
