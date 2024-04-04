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
import Table from "../components/Table";
import Pagination from "../components/Pagination";

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
                            max={endDate}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type='date'
                            className='block  px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus-within:outline-none'
                        />
                        <span>-</span>
                        <input
                            min={startDate}
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
                    <Table table={table} />
                    <div className='flex mt-2 items-center gap-2 text-xs justify-end'>
                        <Pagination table={table} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TransactionHistoryPage;
