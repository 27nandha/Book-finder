function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-4 py-2 font-semibold text-gray-800">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
