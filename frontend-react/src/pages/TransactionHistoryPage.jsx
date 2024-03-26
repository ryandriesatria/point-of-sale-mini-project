import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import axios from "axios";
import useSWR from "swr";
import { toRupiah } from "../util/formatter";
import {
    Link,
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

function TransactionHistoryPage() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [searchParams] = useSearchParams();
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");

    const navigate = useNavigate();
    const fetcher = (url, params) =>
        axios
            .get(url, {
                params: params,
            })
            .then((res) => res.data.data);

    const {
        data: transactions,
        isLoading,
        mutate,
    } = useSWR(
        [`http://localhost:8080/transaction`, { start_date, end_date }],
        ([url, params]) => fetcher(url, params)
    );

    console.log(transactions);
    const [sorting, setSorting] = useState([
        {
            id: "transactionDate",
            desc: true,
        },
    ]);
    const columnHelper = createColumnHelper();

    const columns = React.useMemo(
        () => [
            columnHelper.accessor((row) => row.transactionDate, {
                id: "transactionDate",
                cell: (info) => new Date(info.getValue()).toLocaleString(),
                header: () => <span>Tanggal Transaksi</span>,
            }),
            columnHelper.accessor((row) => row.id, {
                id: "id",
                cell: (info) => info.getValue(),
                header: () => <span>ID Transaksi</span>,
            }),
            columnHelper.accessor((row) => row.totalAmount, {
                id: "totalAmount",
                cell: (info) => toRupiah(info.getValue()),
                header: () => <span>Total Harga</span>,
            }),
            columnHelper.accessor((row) => row.totalPay, {
                id: "totalPay",
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
                enableSorting: false,
            }),
        ],
        []
    );

    const table = useReactTable({
        data: React.useMemo(
            () => (isLoading ? [] : transactions),
            [transactions]
        ),
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

    function handleFilter(e) {
        e.preventDefault();
        navigate({
            pathname: "",
            search: createSearchParams({
                ...(startDate ? { start_date: startDate } : {}),
                ...(endDate ? { end_date: endDate } : {}),
            }).toString(),
        });
    }
    return (
        <Layout activePage={2}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        Riwayat Transaksi
                    </span>
                    <form
                        onSubmit={(e) => handleFilter(e)}
                        className='flex items-center gap-4 font-poppins'
                    >
                        <span>Filter by date :</span>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type='date'
                            className='block  px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus-within:outline-none'
                        />
                        <span>-</span>
                        <input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type='date'
                            className='block  px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus-within:outline-none'
                        />
                        <button
                            type='submit'
                            className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                        >
                            Filter
                        </button>
                    </form>
                </div>
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
