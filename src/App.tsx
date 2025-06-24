import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Market from "./pages/Market";
import Footer from "./components/Footer";

function App() {
  const Watchlist = lazy(() => import("./pages/Watchlist"));
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Market />} />
        <Route
          path="/watchlist"
          element={
            <Suspense fallback={null}>
              <Watchlist />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
