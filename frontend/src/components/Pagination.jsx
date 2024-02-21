import React from "react";

const Pagination = ({
  totalPost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex flex-col gap-3 mt-4">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage
                ? "bg-violet-500 px-4 py-2 rounded-md"
                : "bg-purple-300"
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
