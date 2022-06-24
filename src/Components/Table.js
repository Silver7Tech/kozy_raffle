import React from 'react';
import { useTable,useSortBy } from 'react-table';
import { SortDownIcon, SortUpIcon, SortIcon } from "./shared/Icon";

export function StatusPill({ value }) {
    return (
      <span
        className="text-green"
      >
        {value}
      </span>
    );
  }
const TableComponent = ({columns, data}) => {
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({ columns, data }, useSortBy);
 return (
     <>
       <table {...getTableProps()} className="block">
         <thead >
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()} >
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps(column.getSortByToggleProps())}
                       className="group pr-12 py-3 text-left text-0sm font-medium text-white uppercase tracking-wider"
                   >
                     <div className="flex items-center justify-between">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
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
         <tbody {...getTableBodyProps()} className="divide-y divide-gray-200 block">
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                            className="text-white pr-12 py-4 text-1sm whitespace-nowrap"
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
     </>
 );
}

export default TableComponent;