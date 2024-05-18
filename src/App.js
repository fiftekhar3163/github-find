// import Home from "./components/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import ResultPage from "./components/ResultPage";
import { motion, AnimatePresence } from "framer-motion";
import { LocationProvider } from "./components/LocationProvider";
import { RoutesWithAnimation } from "./components/RoutesWithAnimation";
function App() {
  return (
    <HashRouter basename="/">
      <LocationProvider>
        <RoutesWithAnimation />
      </LocationProvider>
    </HashRouter>
  );
}

export default App;
