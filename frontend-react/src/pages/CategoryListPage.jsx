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

function CategoryListPage() {
    const fetcher = (url) => axios.get(url).then((res) => res.data.data);

    const {
        data: categories,
        isLoading,
        error,
        mutate,
    } = useSWR(`http://localhost:8080/category/product_count`, fetcher);

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((row) => row.id, {
            id: "id",
            cell: (info) => info.getValue(),
            header: () => <span>ID Kategori</span>,
        }),
        columnHelper.accessor((row) => row.name, {
            id: "name",
            cell: (info) => info.getValue(),
            header: () => <span>Nama Kategori</span>,
        }),
        columnHelper.accessor((row) => row.product_count, {
            id: "product_count",
            cell: (info) => info.getValue(),
            header: () => <span>Jumlah Produk Terkait</span>,
        }),
        columnHelper.accessor((row) => row.id, {
            id: "action",
            cell: (info) => (
                <div className='flex gap-2 justify-between'>
                    <Link to={`/category/${info.getValue()}`}>
                        <button className='btn-default text-xs m-0 py-2'>
                            Detail
                        </button>
                    </Link>
                    <Link to={`/category/${info.getValue()}/edit`}>
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
        data: isLoading ? [] : categories,
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
                    .delete(`http://localhost:8080/category/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Category has been deleted.",
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
                                "Kategori memiliki produk terkait yang telah tercatat di database.",
                        });
                    });
            }
        });
    }
    return (
        <Layout activePage={4}>
            <div className='bg-white m-5 ml-20 p-10 rounded-2xl h-[94.5vh]'>
                <div className='flex justify-between items-center'>
                    <span className='font-franklin text-2xl'>
                        Daftar Kategori
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
                        <Link to={"/category/add"}>
                            <button className='btn-default text-xs m-0'>
                                Tambah Kategori
                            </button>
                        </Link>
                    </div>
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

export default CategoryListPage;
