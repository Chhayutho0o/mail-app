import { usePagination, DOTS } from "@/hooks/usePagination";
import { Icons } from "../commons/icons";
import { cn } from "@/lib/utils";

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-4 my-4 justify-center w-full">
      <button
        className="rounded-md disabled:pointer-events-none disabled:opacity-50 w-10 h-10 hover:bg-accent justify-center items-center flex outline-none"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <Icons.chevronLeft strokeWidth={2} className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-2">
        {paginationRange.map((pageNumber: any, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <div
                className="w-10 h-10 justify-center items-center flex bg-transparent cursor-default outline-none"
                key={index}
              >
                &#8230;
              </div>
            );
          }
          return (
            <button
              key={index}
              className={cn(
                "rounded-md w-10 h-10 text-sm font-bold outline-none",
                pageNumber === currentPage
                  ? "bg-accent  opacity-100"
                  : "hover:bg-accent"
              )}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="rounded-md disabled:pointer-events-none disabled:opacity-50 w-10 h-10 hover:bg-accent justify-center items-center flex outline-none"
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <Icons.chevronRight strokeWidth={2} className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
