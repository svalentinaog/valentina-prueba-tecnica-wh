interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="
          px-4 py-2 
          bg-white 
          border border-gray-300 
          rounded-lg 
          text-gray-700 
          font-medium 
          hover:bg-gray-50 
          cursor-pointer
          disabled:opacity-50 
          disabled:cursor-not-allowed
          transition-colors
        "
      >
        Anterior
      </button>

      <span className="text-gray-600 font-medium">
        Página <span className="text-gray-900">{currentPage}</span> de{" "}
        {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2 
          bg-white 
          border border-gray-300 
          rounded-lg 
          text-gray-700 
          font-medium 
          hover:bg-gray-50 
          cursor-pointer
          disabled:opacity-50 
          disabled:cursor-not-allowed
          transition-colors
        "
      >
        Siguiente
      </button>
    </div>
  );
};
