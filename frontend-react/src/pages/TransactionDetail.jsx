import { Link, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import useSWR from "swr";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import { toRupiah } from "../util/formatter";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import Table from "../components/Table";

function TransactionDetailPage() {
    const { id } = useParams();

    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const { data: transaction, isLoading: isLoadingTransaction } = useSWR(
        `http://localhost:8080/transaction/${id}`,
        fetcher
    );

    const { data: transaction_detail, isLoading: isLoadingTransactionDetail } =
        useSWR(`http://localhost:8080/transaction/${id}/detail`, fetcher);

    const [sorting, setSorting] = useState([]);
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((row) => row.product.id, {
            id: "product_id",
            cell: (info) => info.getValue(),
            header: () => <span>ID Produk</span>,
        }),
        columnHelper.accessor((row) => row.product.title, {
            id: "product_title",
            cell: (info) => info.getValue(),
            header: () => <span>Nama Produk</span>,
        }),
        columnHelper.accessor((row) => row.product.price, {
            id: "product_price",
            cell: (info) => toRupiah(info.getValue()),
            header: () => <span>Harga Satuan</span>,
        }),
        columnHelper.accessor((row) => row.quantity, {
            id: "quantity",
            cell: (info) => info.getValue(),
            header: () => <span>Quantity</span>,
        }),
        columnHelper.accessor((row) => row.subtotal, {
            id: "subtotal",
            cell: (info) => toRupiah(info.getValue()),
            header: () => <span>Subtotal</span>,
        }),
    ];

    const table = useReactTable({
        data: isLoadingTransactionDetail ? [] : transaction_detail,
        columns,
        state: {
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Layout activePage={2}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        Detail Transaksi
                    </span>
                    <Link to={"/history"}>
                        <button className='btn-default'>Kembali</button>
                    </Link>
                </div>
                <hr className='my-3 border-black' />
                {isLoadingTransaction ? (
                    <MoonLoader color='#111827' className=' ' />
                ) : (
                    <div className='grid grid-cols-2 w-1/3 font-poppins mt-6 gap-4'>
                        <span>ID Transaksi</span>
                        <span>: {transaction.id}</span>
                        <span>Tanggal Transaksi</span>
                        <span>
                            :{" "}
                            {new Date(
                                transaction.transactionDate
                            ).toLocaleString()}
                        </span>
                        <span>Total Harga</span>
                        <span>: {toRupiah(transaction.totalAmount)}</span>
                        <span>Total Bayar</span>
                        <span>: {toRupiah(transaction.totalPay)}</span>
                    </div>
                )}
                <div className='h-[60%] overflow-y-auto mt-10'>
                    <Table table={table} />
                </div>
            </div>
        </Layout>
    );
}

export default TransactionDetailPage;
