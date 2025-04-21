import { useState, useEffect } from "react";
import { Box } from "@radix-ui/themes";

const usePagination = (data, pageSize, CardComponent, setLoading) => {
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
    const updatePage = async () => {
      if (availablePages.length > 0) {
        setLoading?.(true);
        // Artificial delay for smooth transition
        await new Promise(resolve => setTimeout(resolve, 300));
        setShelters(availablePages[currentPage - 1] || []);
        setLoading?.(false);
      }
    };
    updatePage();
  }, [availablePages, currentPage]);

  const PaginationControls = () => (
    <Box className="pagination-controls">
      <button
        className="pagination-btn"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        title="First page"
      >
        {"<<"}
      </button>
      <button
        className="pagination-btn"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        title="Previous page"
      >
        {"<"}
      </button>

      {currentPage > 3 && (
        <>
          <button className="pagination-btn" onClick={() => setCurrentPage(1)}>1</button>
          {currentPage > 4 && <span>...</span>}
        </>
      )}

      {Array.from({ length: availablePages.length }, (_, index) => {
        const pageNumber = index + 1;
        if (
          pageNumber === currentPage ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <button
              key={pageNumber}
              className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNumber)}
              title={`Page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}

      {currentPage < availablePages.length - 2 && (
        <>
          {currentPage < availablePages.length - 3 && <span>...</span>}
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(availablePages.length)}
          >
            {availablePages.length}
          </button>
        </>
      )}

      <button
        className="pagination-btn"
        onClick={() => setCurrentPage(prev => Math.min(availablePages.length, prev + 1))}
        disabled={currentPage === availablePages.length}
        title="Next page"
      >
        {">"}
      </button>
      <button
        className="pagination-btn"
        onClick={() => setCurrentPage(availablePages.length)}
        disabled={currentPage === availablePages.length}
        title="Last page"
      >
        {">>"}
      </button>
    </Box>
  );

  const PageOfCards = () => (
    <div className="cards-grid">
      {shelters.map(CardComponent)}
    </div>
  );

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
