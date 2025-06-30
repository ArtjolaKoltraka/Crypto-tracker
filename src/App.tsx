import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Market from "./pages/Market";
import Footer from "./components/layout/Footer";
import CoinDetailsPage from "./pages/CoinDetailsPage";

function App() {
  const Watchlist = lazy(() => import("./pages/Watchlist"));
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Market />} />
            <Route path="coins/:code" element={<CoinDetailsPage />} />
            <Route
              path="/watchlist"
              element={
                <Suspense fallback={null}>
                  <Watchlist />
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
