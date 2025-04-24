import { useState, useEffect, useCallback } from "react";
import { Box } from "@radix-ui/themes";
import { useViewport } from './useViewport';

const usePagination = (data, pageSize, CardComponent, setLoading) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [shelters, setShelters] = useState([]);
  const [availablePages, setAvailablePages] = useState([]);
  const { size } = useViewport();

  // Determine responsive page size
  const getResponsivePageSize = () => {
    switch (size) {
      case 'xs-': 
      case 'xs': return 1; // Show 1 card per page on smallest screens
      case 'sm': return 2; // Show 2 cards per page on small screens
      default: return pageSize; // Use provided pageSize for larger screens
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const responsivePageSize = getResponsivePageSize();
      const pages = chunkArray(data, responsivePageSize);
      setAvailablePages(pages);
      setCurrentPage(1);
    }
  }, [data, size]);

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
  }, [availablePages, currentPage, setLoading]);

  const PaginationControls = () => {
    // Determine number of page buttons based on viewport size
    const getVisibleButtonCount = () => {
      switch (size) {
        case 'xs-': return 1; // Just current page
        case 'xs': return 3; // Current +/- 1
        case 'sm': return 3; // Current +/- 1
        case 'md': return 5; // Current +/- 2
        default: return 7; // Current +/- 3 for larger screens
      }
    };

    const maxVisiblePages = getVisibleButtonCount();

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
    const showFirstLastButtons = size !== 'xs-' && size !== 'xs'; // Hide first/last on mobile

    return (
      <Box className="pagination-controls" style={{
        display: 'flex',
        flexDirection: size === 'xs-' || size === 'xs' ? 'column' : 'row',
        gap: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <Box style={{ 
          display: 'flex', 
          gap: '4px',
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {showFirstLastButtons && (
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="First page"
              style={{
                minWidth: size === 'sm' ? '1.8rem' : '2rem',
                height: size === 'sm' ? '1.8rem' : '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {"<<"}
            </button>
          )}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            title="Previous page"
            style={{
              minWidth: size === 'sm' ? '1.8rem' : '2rem',
              height: size === 'sm' ? '1.8rem' : '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {"<"}
          </button>

          <button
            className="pagination-btn ellipsis"
            style={{ 
              visibility: showStartEllipsis ? 'visible' : 'hidden',
              minWidth: size === 'sm' ? '1.8rem' : '2rem',
              height: size === 'sm' ? '1.8rem' : '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => {
              const newPage = Math.max(1, visiblePageNumbers[0] - maxVisiblePages);
              setCurrentPage(newPage);
            }}
            title="Previous set of pages"
          >
            ...
          </button>

          {visiblePageNumbers.map(pageNumber => (
            <button
              key={pageNumber}
              className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNumber)}
              title={`Page ${pageNumber}`}
              style={{
                minWidth: size === 'sm' ? '1.8rem' : '2rem',
                height: size === 'sm' ? '1.8rem' : '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: size === 'xs' ? '13px' : '14px'
              }}
            >
              {pageNumber}
            </button>
          ))}

          <button
            className="pagination-btn ellipsis"
            style={{ 
              visibility: showEndEllipsis ? 'visible' : 'hidden',
              minWidth: size === 'sm' ? '1.8rem' : '2rem',
              height: size === 'sm' ? '1.8rem' : '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => {
              const newPage = Math.min(totalPages, visiblePageNumbers[visiblePageNumbers.length - 1] + 1);
              setCurrentPage(newPage);
            }}
            title="Next set of pages"
          >
            ...
          </button>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            title="Next page"
            style={{
              minWidth: size === 'sm' ? '1.8rem' : '2rem',
              height: size === 'sm' ? '1.8rem' : '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {">"}
          </button>

          {showFirstLastButtons && (
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Last page"
              style={{
                minWidth: size === 'sm' ? '1.8rem' : '2rem',
                height: size === 'sm' ? '1.8rem' : '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {">>"}
            </button>
          )}
        </Box>
        
        {/* Show page indicator on small screens */}
        {(size === 'xs-' || size === 'xs') && (
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--gray-11)', 
            marginTop: '4px',
            textAlign: 'center'
          }}>
            Page {currentPage} of {totalPages}
          </div>
        )}
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
