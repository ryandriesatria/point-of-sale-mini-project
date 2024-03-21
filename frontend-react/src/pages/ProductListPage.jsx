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
import Swal from "sweetalert2";

function ProductListPage() {
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const {
        data: products,
        isLoading,
        error,
        mutate,
    } = useSWR(`http://localhost:8080/product`, fetcher);

    const [sorting, setSorting] = useState([]);
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
        }),
    ];

    const table = useReactTable({
        data: isLoading ? [] : products,
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
                                "Something went wrong!<br>" +
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
                    <Link to={"/product/add"}>
                        <button className='btn-default text-xs m-0'>
                            Tambah Produk
                        </button>
                    </Link>
                </div>

                <div className='flex flex-col mt-6 h-[95%] justify-between'>
                    <table className=' border w-full font-poppins text-sm '>
                        <thead className='text-left'>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            className='py-4 px-5 bg-gray-700 text-gray-100 hover:cursor-pointer hover:bg-gray-800 select-none w-[18%]'
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
                    <div className='flex items-center gap-2 text-xs justify-end'>
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

export default ProductListPage;
