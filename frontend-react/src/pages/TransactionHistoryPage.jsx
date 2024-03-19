import React, { useState } from "react";
import Layout from "../layout/Layout";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import axios from "axios";
import useSWR from "swr";
import { toRupiah } from "../util/formatter";
import { Link } from "react-router-dom";

function TransactionHistoryPage() {
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);
    const [sorting, setSorting] = useState([]);

    const {
        data: transactions,
        isLoading,
        error,
    } = useSWR(`http://localhost:8080/transaction`, fetcher);

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((row) => row.transaction_date, {
            id: "transaction_date",
            cell: (info) => new Date(info.getValue()).toLocaleString(),
            header: () => <span>Tanggal Transaksi</span>,
        }),
        columnHelper.accessor((row) => row.id, {
            id: "id",
            cell: (info) => info.getValue(),
            header: () => <span>ID Transaksi</span>,
        }),
        columnHelper.accessor((row) => row.total_amount, {
            id: "total_amount",
            cell: (info) => toRupiah(info.getValue()),
            header: () => <span>Total Harga</span>,
        }),
        columnHelper.accessor((row) => row.total_pay, {
            id: "total_pay",
            cell: (info) => toRupiah(info.getValue()),
            header: () => <span>Total Bayar</span>,
        }),
        columnHelper.accessor((row) => row.id, {
            id: "action",
            cell: (info) => (
                <Link to={`/history/${info.getValue()}`}>
                    <button className='btn-default text-xs m-0 py-2'>
                        Detail Transaksi
                    </button>
                </Link>
            ),
            header: () => <span>Action</span>,
        }),
    ];

    const table = useReactTable({
        data: isLoading ? [] : transactions,
        columns,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 8,
            },
        },
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Layout activePage={2}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <span className='font-franklin text-2xl'>
                    Riwayat Transaksi
                </span>
                <div className='flex flex-col mt-6 h-[95%] justify-between'>
                    <table className=' border w-full font-poppins table-fixed text-sm '>
                        <thead className='text-left'>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            className='py-4 px-5 bg-gray-700 text-gray-100 hover:cursor-pointer hover:bg-gray-800 select-none'
                                            key={header.id}
                                            {...(header.column.getCanSort()
                                                ? {
                                                      onClick:
                                                          header.column.getToggleSortingHandler(),
                                                  }
                                                : {})}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                            {header.column.getIsSorted() ===
                                            "asc" ? (
                                                <span> 🔼</span>
                                            ) : header.column.getIsSorted() ===
                                              "desc" ? (
                                                <span> 🔽</span>
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className='border-b '>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className='py-4 px-5'>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex mt-2 items-center gap-2 text-xs justify-end'>
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
                                    value={
                                        table.getState().pagination.pageIndex +
                                        1
                                    }
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
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                            >
                                <span className='w-5 h-5'>{">>"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TransactionHistoryPage;
