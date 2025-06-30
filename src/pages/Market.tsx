import React, { useEffect, useState } from "react";
import useMarketData from "../hooks/useMarketData";
import CustomPagination from "../helpers/CustomPagination";
import CoinTable from "../components/coin_table/CoinTable";
import { useSearchStore } from "../store/useSearchStore";

const Market: React.FC = () => {
  const perPage = 20;
  const [activePage, setActivePage] = useState(1);
  const search = useSearchStore((s) => s.search.trim().toLowerCase());
  const {
    data: coins,
    pagination,
    loading,
    error,
  } = useMarketData(perPage, activePage);

  useEffect(() => {
    setActivePage(1);
  }, [search]);

  return (
    <>
      <div className="flex flex-col items-center px-12 mb-5 ">
        <CoinTable coins={coins} loading={loading} error={error} />
        <CustomPagination data={pagination} setActivePage={setActivePage} />
      </div>
    </>
  );
};
export default Market;
