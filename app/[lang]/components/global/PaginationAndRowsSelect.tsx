import React from "react";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { getDictionary } from "../../../../get-dictionary";
import { selectStyle, selectTheme } from "../../../../styles/selectStyles";

type propsType = {
  pageCount: number;
  setCurrentPage: (e: any) => void;
  setRowsPerPage: (e: any) => void;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};
const PaginationAndRowsSelect = ({
  pageCount,
  setCurrentPage,
  setRowsPerPage,
  dictionary,
}: propsType) => {
  return (
    <div className="flex flex-row py-4 justify-between items-center">
      <Select
        placeholder={dictionary["rowsNumber"]}
        options={[
          { label: 1, value: 1 },
          { label: 2, value: 2 },
        ]}
        className=" border-gray-200 shadow  "
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={selectStyle}
        theme={selectTheme}
        onChange={(option: any) => {
          setRowsPerPage(option?.value);
          //setCurrentPage(0);
        }}
      />
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={({ selected }: any) => {
          setCurrentPage(selected);
        }}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PaginationAndRowsSelect;
