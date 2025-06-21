import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Market from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Market />} />
      </Routes>
    </Router>
  );
}

export default App;
