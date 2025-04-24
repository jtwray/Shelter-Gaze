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

  const PaginationControls = () => {
    const maxVisiblePages = pageSize; // Number of page buttons to show at once (excluding navigation)

    // Calculate the range of page numbers to display
    const getVisiblePageNumbers = () => {
      const totalPages = availablePages.length;

      if (totalPages <= maxVisiblePages) {
        // If we have fewer pages than our max, show all pages
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Calculate the middle position with current page centered when possible
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      // Adjust start if we're near the end to always show maxVisiblePages
      if (end === totalPages) {
        start = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePageNumbers = getVisiblePageNumbers();
    const totalPages = availablePages.length;
    const showStartEllipsis = visiblePageNumbers[0] > 1;
    const showEndEllipsis = visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages;

    return (
      <Box className="pagination-controls" style={{
        display: 'flex',
        gap: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* First page button */}
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          {"<<"}
        </button>

        {/* Previous page button */}
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          title="Previous page"
        >
          {"<"}
        </button>

        {/* Start ellipsis */}
        {(
          <button
            className="pagination-btn ellipsis"
            style={{ visibility: showStartEllipsis ? 'visible' : 'hidden' }}
            onClick={() => {
              const newPage = Math.max(1, visiblePageNumbers[0] - maxVisiblePages);
              setCurrentPage(newPage);
            }}
            title="Previous set of pages"
          >
            ...
          </button>
        )}

        {/* Page number buttons */}
        {visiblePageNumbers.map(pageNumber => (
          <button
            key={pageNumber}
            className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
            onClick={() => setCurrentPage(pageNumber)}
            title={`Page ${pageNumber}`}
            style={{
              minWidth: '2rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {pageNumber}
          </button>
        ))}

        {/* End ellipsis */}
        {(
          <button
            className="pagination-btn ellipsis"
            style={{ visibility: showEndEllipsis ? 'visible' : 'hidden' }}
            onClick={() => {
              const newPage = Math.min(totalPages, visiblePageNumbers[visiblePageNumbers.length - 1] + 1);
              setCurrentPage(newPage);
            }}
            title="Next set of pages"
          >
            ...
          </button>
        )}

        {/* Next page button */}
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          title="Next page"
        >
          {">"}
        </button>

        {/* Last page button */}
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
        >
          {">>"}
        </button>
      </Box>
    );
  };

  const PageOfCards = () => (
    <>
      {shelters.map(CardComponent)}
    </>
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
