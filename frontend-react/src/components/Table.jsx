import { flexRender } from "@tanstack/react-table";
import React from "react";

function Table({ table }) {
    return (
        <table className=' border w-full font-poppins text-sm table-fixed '>
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

                                {header.column.getIsSorted() === "asc" ? (
                                    <span> 🔼</span>
                                ) : header.column.getIsSorted() === "desc" ? (
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
    );
}

export default Table;
