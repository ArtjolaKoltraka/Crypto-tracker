import Pagination from "react-js-pagination";

interface CustomPaginationProps {
  data: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
  };
  setActivePage: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  data,
  setActivePage,
}) => {
  return data.total > 10 ? (
    <div className="pagination-block mt-2">
      <Pagination
        activePage={data.current_page}
        itemsCountPerPage={data.per_page}
        totalItemsCount={data.total}
        pageRangeDisplayed={5}
        onChange={(e) => setActivePage(e)}
        itemClass="page-item"
        linkClass="page-link"
        hideFirstLastPages={true}
        itemClassPrev="prev-item"
        itemClassNext="next-item"
        prevPageText={<i className="icon left-pagination-icon" />}
        nextPageText={<i className="icon right-pagination-icon" />}
      />
      {/* <div className="pagination-results">
        {`Page number : ${data.current_page} - ${data.last_page}`}
      </div> */}
    </div>
  ) : null;
};

export default CustomPagination;
