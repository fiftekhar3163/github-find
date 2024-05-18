// import Home from "./components/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result/:username" element={<ResultPage />} />
        <Route path="*" element={<SearchPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
