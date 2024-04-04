import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

function ProductListPage() {
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const {
        data: products,
        isLoading,
        error,
        mutate,
    } = useSWR(`http://localhost:8080/product`, fetcher);

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((row) => row.id, {
            id: "id",
            cell: (info) => info.getValue(),
            header: () => <span>ID Produk</span>,
        }),
        columnHelper.accessor((row) => row.title, {
            id: "title",
            cell: (info) => info.getValue(),
            header: () => <span>Nama Produk</span>,
        }),
        columnHelper.accessor((row) => row.price, {
            id: "total_amount",
            cell: (info) => toRupiah(info.getValue()),
            header: () => <span>Harga Satuan</span>,
        }),
        columnHelper.accessor((row) => row.category.name, {
            id: "category_name",
            cell: (info) => info.getValue(),
            header: () => <span>Kategori</span>,
        }),
        columnHelper.accessor((row) => row.id, {
            id: "action",
            cell: (info) => (
                <div className='flex gap-2 justify-between'>
                    <Link to={`/product/${info.getValue()}`}>
                        <button className='btn-default text-xs m-0 py-2'>
                            Detail
                        </button>
                    </Link>
                    <Link to={`/product/${info.getValue()}/edit`}>
                        <button className='btn-warning text-xs m-0 py-2 text-black'>
                            Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => handleClickDelete(info.getValue())}
                        className='btn-danger text-xs m-0 py-2'
                    >
                        Hapus
                    </button>
                </div>
            ),
            header: () => <span>Action</span>,
            enableSorting: false,
            size: 100,
        }),
    ];

    const table = useReactTable({
        data: isLoading ? [] : products,
        columns,

        state: {
            sorting,
            globalFilter,
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
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
    });

    function handleClickDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:8080/product/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            icon: "success",
                        });
                        mutate();
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            html:
                                "Terjadi kesalahan!<br>" +
                                "Produk telah tercatat di riwayat transaksi",
                        });
                    });
            }
        });
    }
    return (
        <Layout activePage={3}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        Daftar Produk
                    </span>
                    <div className='flex items-center gap-4'>
                        <input
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            type='search'
                            className='block  px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus-within:outline-none'
                            placeholder='Search ...'
                        />
                        <div className='border-black border-l-[1px] h-8'></div>
                        <Link to={"/product/add"}>
                            <button className='btn-default text-xs m-0'>
                                Tambah Produk
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='flex flex-col mt-6 h-[95%] justify-between'>
                    <Table table={table} />
                    <div className='flex items-center gap-2 text-xs justify-end'>
                        <Pagination table={table} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductListPage;
