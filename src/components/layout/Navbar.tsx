import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import coinTrackerLogo from "../../assets/images/coin-tracker.png";
import { useSearchStore } from "../../store/useSearchStore";
import useThemeStore from "../../store/useThemeStore";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isActive = location.pathname;
  const search = useSearchStore((s) => s.search);
  const setSearch = useSearchStore((s) => s.setSearch);
  const { theme, toggleTheme } = useThemeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    e.currentTarget.style.width = "15rem";
    e.currentTarget.style.transition = "all 1.2s cubic-bezier(0.5, 0, 0.5, 1)";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`w-full flex row items-center justify-between sticky top-[-5px] z-[100000] dark:bg-slate-600 dark:text-neutral-200 transition-colors duration-200 ${
          scrolled ? "bg-gray-300/80 backdrop-blur-md" : "bg-gray-400/30"
        } mb-8 px-6 py-4`}
      >
        <div className="flex items-center pl-[50px] gap-6">
          <div className="w-[10em]  select-none">
            <Link to="/">
              <img
                className="w-full h-auto"
                src={coinTrackerLogo}
                alt="CoinTracker Logo"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <h3
                className={`text-lg transition-colors duration-200 cursor-pointer ${
                  isActive === "/"
                    ? "text-blue-500 font-medium"
                    : "text-gray-600 dark:text-neutral-200"
                } hover:text-blue-600`}
              >
                Market
              </h3>
            </Link>
            <Link to="/watchlist">
              <h3
                className={`text-lg transition-colors duration-200 cursor-pointer ${
                  isActive === "/watchlist"
                    ? "text-blue-500 font-medium"
                    : "text-gray-600 dark:text-neutral-200"
                } hover:text-blue-600`}
              >
                Watchlist
              </h3>
            </Link>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="text-sm border px-3 py-1 rounded bg-gray-100 dark:bg-slate-700 dark:text-white"
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
        <form className="w-full max-w-md md:w-auto pr-[100px]">
          <input
            type="text"
            placeholder="🔍 Search..."
            className="pl-4 outline-none h-[42px] rounded text-white bg-gradient-to-r from-blue-300 to-slate-400 placeholder-white shadow-inner "
            value={search}
            onChange={handleChange}
          />
        </form>
      </nav>
    </>
  );
};
export default Navbar;
