import React, { useState } from "react";
import useMarketData from "../hooks/useMarketData";
import CustomPagination from "../helpers/CustomPagination";
import CoinTable from "../components/CoinTable";

const Market: React.FC = () => {
  const perPage = 20;
  const [activePage, setActivePage] = useState(1);
  const {
    data: coins,
    total,
    loading,
    error,
  } = useMarketData(perPage, activePage);
  const lastPage = Math.ceil(total / perPage);

  return (
    <>
      <div className="flex flex-col items-center px-12 mb-5 ">
        <CoinTable coins={coins} loading={loading} error={error} />
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
