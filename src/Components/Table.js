import React from 'react';
import { useTable,useSortBy,usePagination } from 'react-table';
import { SortDownIcon, SortUpIcon, SortIcon } from "./shared/Icon";
import { Button, PageButton } from "./shared/Button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon
  } from "@heroicons/react/solid";

export function StatusPill({ value }) {
    return (
      <span
        className="text-green"
      >
        {value}
      </span>
    );
  }
const Table = ({columns, data}) => {
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   page,
   rows,
   prepareRow,
   previousPage,
   setPageSize,
   nextPage,
   canPreviousPage,
   canNextPage,
   state,
   pageOptions,
   gotoPage,
   pageCount,
 } = useTable({ columns, data }, useSortBy, usePagination);
 state.pageSize = 5;
 return (
     <div>
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {/* <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="group pr-6 py-3 text-left text-0sm font-medium text-white uppercase tracking-wider"
                            >
                                <div className="flex items-center justify-between">
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (
                                        column.isSortedDesc ? (
                                            <SortDownIcon className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            <SortUpIcon className="w-4 h-4 text-gray-400" />
                                        )
                                        ) : (
                                        <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                        )}
                                    </span>
                                </div>
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                    {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <td
                                    {...cell.getCellProps()}
                                        className="text-white pr-6 py-4 text-1sm whitespace-nowrap"
                                >
                                    {cell.render('Cell')}
                                </td>
                            )
                            })}
                        </tr>
                    )
                    })}
                    </tbody>
                </table> */}
                 <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-gray-400" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="text-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
       <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>
     </div>
 );
}

export default Table;