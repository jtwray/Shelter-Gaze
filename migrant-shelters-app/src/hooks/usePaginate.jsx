import { useState, useEffect } from "react";

const usePagination = (data, pageSize, CardComponent) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [shelters, setShelters] = useState([]);
  const [availablePages, setAvailablePages] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const pages = chunkArray(data, pageSize);
      setAvailablePages(pages);
      setCurrentPage(1);
    }
  }, [data, pageSize]);

  useEffect(() => {
    if (availablePages.length > 0) {
      setShelters(availablePages[currentPage - 1] || []);
    }
  }, [availablePages, currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, availablePages.length));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const PaginationControls = () => (
    <div>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Back
      </button>
      {currentPage > 3 && (
        <>
          <button onClick={() => setCurrentPage(startPage - 5)}>...</button>
        </>
      )}
      {Array.from({ length: availablePages.length }, (_, index) => {
        const pageNumber = index + 1;
        if (pageNumber >= startPage && pageNumber <= endPage) {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
              style={{
                textDecoration:
                  currentPage === pageNumber ? "underline" : "none",
              }}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}
      {currentPage < availablePages - 2 && (
        <>
          <button onClick={() => setCurrentPage(startPage + 5)}>...</button>
        </>
      )}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === availablePages.length}
      >
        Forward
      </button>
    </div>
  );

  const PageOfCards = () => (
    <div>
      {shelters.map((item, idx) => (
        <CardComponent key={item.id} {...item} idx={idx} />
      ))}
    </div>
  );

  // Calculate startPage and endPage based on currentPage
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, availablePages.length);

  return { PaginationControls, PageOfCards };
};

const chunkArray = (array, size) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

export { usePagination };
