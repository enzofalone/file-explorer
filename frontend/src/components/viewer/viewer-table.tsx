'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Entry, useViewerStore } from '@/state/viewer';
import { useEffect, useState } from 'react';
import { useDirectoryStore } from '@/state/directory';
import { ExecuteFile } from '../../../wailsjs/go/main/App';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Entry[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<Entry, TValue>) {
  const {
    selectedEntries,
    removeSelectedEntry,
    addSelectedEntry,
    clearSelectedEntries,
  } = useViewerStore();
  const { addDirectoryStack, directoryStack } = useDirectoryStore();
  const [entriesMap, setEntriesMap] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowClick = (e: MouseEvent, data: Entry) => {
    if (e.ctrlKey && !selectedEntries[data.name]) {
      addSelectedEntry(data);
    } else if (!e.ctrlKey && selectedEntries[data.name] && !data.isDirectory) {
      ExecuteFile(`${directoryStack[directoryStack.length - 1]}\\${data.name}`);
    } else if (!e.ctrlKey && selectedEntries[data.name]) {
      addDirectoryStack(
        `${directoryStack[directoryStack.length - 1]}\\${data.name}`
      );
    } else if (e.ctrlKey && selectedEntries[data.name]) {
      removeSelectedEntry(data);
    } else if (!selectedEntries[data.name]) {
      clearSelectedEntries();
      addSelectedEntry(data);
    }
  };

  useEffect(() => {
    // convert data array to hashmap
    data.forEach((entry) => {
      setEntriesMap(() => {
        return { ...entriesMap, [entry.name]: entry };
      });
    });
  }, []);

  return (
    <div className="border">
      <Table className="bg-slate-800">
        <TableHeader className="bg-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={
                  selectedEntries[row.original.name]?.name === row.original.name
                }
                className={
                  selectedEntries[row.original.name]?.name === row.original.name
                    ? 'bg-slate-500 hover:bg-slate-400'
                    : ''
                }
                onClick={(event: any) => onRowClick(event, row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
