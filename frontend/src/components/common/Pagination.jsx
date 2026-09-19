import React from 'react';
import Button from './Button';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, onItemsPerPageChange }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = startPage + maxPages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            padding: '4px 10px',
            border: '1px solid var(--border)',
            background: currentPage === i ? 'var(--primary)' : 'white',
            color: currentPage === i ? 'white' : 'var(--text-primary)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        Showing {startItem}-{endItem} of {totalItems} members
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <select 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--border)' }}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button variant="secondary" size="sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
            Prev
          </Button>
          {renderPageNumbers()}
          <Button variant="secondary" size="sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
