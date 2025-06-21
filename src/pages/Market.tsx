import React, { useState } from "react";
import useMarketData from "../hooks/useMarketData";
import useCoinIcons from "../hooks/useCoinIcons";
import CoinCard from "../components/CoinCard";
import CustomPagination from "../components/CustomPagination";

const Market: React.FC = () => {
  const perPage = 20;
  const [activePage, setActivePage] = useState(1);

  const {
    data: coins,
    total,
    loading,
    error,
  } = useMarketData(perPage, activePage);

  const { icons } = useCoinIcons();
  const lastPage = Math.ceil(total / perPage);

  if (loading) return <p>Loading market data…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="flex flex-col items-center px-12 mb-5 ">
        <div className="w-full max-h-[350px] overflow-y-auto  rounded-md bg-neutral-50 shadow-md">
          <table
            role="table"
            className="table-fixed min-w-[600px] w-full text-sm"
          >
            <thead className="hidden md:table-header-group">
              <tr>
                <th
                  style={{ width: "15%" }}
                  className="bg-white text-center uppercase text-neutral-700 text-xs font-semibold px-6 py-4 first:rounded-tl-md"
                >
                  Image
                </th>
                <th
                  style={{ width: "25%" }}
                  className="bg-white text-left uppercase text-neutral-700 text-xs font-semibold px-6 py-4"
                >
                  Name
                </th>
                <th
                  style={{ width: "20%" }}
                  className="bg-white text-left uppercase text-neutral-700 text-xs font-semibold px-6 py-4"
                >
                  Price USD
                </th>
                <th
                  style={{ width: "15%" }}
                  className="bg-white text-left uppercase text-neutral-700 text-xs font-semibold px-6 py-4"
                >
                  24h
                </th>
                <th
                  style={{ width: "15%" }}
                  className="bg-white text-center uppercase text-neutral-700 text-xs font-semibold px-6 py-4 last:rounded-tr-md"
                >
                  Add to Watchlist
                </th>
              </tr>
            </thead>

            <tbody>
              {coins.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-neutral-500 h-100 bg-white"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                coins.map((coin) => (
                  <CoinCard
                    key={coin.id}
                    coin={{
                      id: coin.id!,
                      symbol: coin.symbol!,
                      name: coin.name!,
                      price_usd: coin.price_usd!,
                      percent_change_24h: Number(coin.percent_change_24h),
                      image: icons[coin.symbol!.toLowerCase()],
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <CustomPagination
          data={{
            total,
            current_page: activePage,
            per_page: perPage,
            last_page: lastPage,
          }}
          setActivePage={setActivePage}
        />
      </div>
    </>
  );
};

export default Market;
