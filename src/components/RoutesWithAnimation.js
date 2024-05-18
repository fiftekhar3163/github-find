import { Route, Routes } from "react-router-dom";
import SearchPage from "./SearchPage";
import ResultPage from "./ResultPage";
import { useLocation } from "react-router-dom";
export function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<SearchPage />} />
      <Route path="/result/:username" element={<ResultPage />} />
      <Route path="*" element={<SearchPage />} />
    </Routes>
  );
}
