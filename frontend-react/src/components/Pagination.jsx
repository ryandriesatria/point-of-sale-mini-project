import React from "react";

function Pagination({ table }) {
    return (
        <div className='flex gap-2'>
            <button
                className={`${
                    !table.getCanPreviousPage()
                        ? "bg-gray-100"
                        : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
                } rounded p-1`}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <span className='w-5 h-5'>{"<<"}</span>
            </button>
            <button
                className={`${
                    !table.getCanPreviousPage()
                        ? "bg-gray-100"
                        : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
                } rounded p-1`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <span className='w-5 h-5'>{"<"}</span>
            </button>
            <span className='flex items-center gap-1'>
                <input
                    min={1}
                    max={table.getPageCount()}
                    type='number'
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                        table.setPageIndex(page);
                    }}
                    className='border p-1 rounded w-10'
                />
                of {table.getPageCount()}
            </span>
            <button
                className={`${
                    !table.getCanNextPage()
                        ? "bg-gray-100"
                        : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
                } rounded p-1`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <span className='w-5 h-5'>{">"}</span>
            </button>
            <button
                className={`${
                    !table.getCanNextPage()
                        ? "bg-gray-100"
                        : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
                } rounded p-1`}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <span className='w-5 h-5'>{">>"}</span>
            </button>
        </div>
    );
}

export default Pagination;
