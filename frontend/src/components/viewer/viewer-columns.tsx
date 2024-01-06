import { getSizeLabel } from '@/lib/size';
import { Entry } from '@/state/viewer';
import { ColumnDef } from '@tanstack/react-table';
import Icon from '../ui/icon';

export const viewerColumns: ColumnDef<Entry>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,
    cell: ({ row }) => {
      const { name, isDirectory } = row.original;
      const split = name.split('.');
      const extension = isDirectory ? 'folder' : split[split.length - 1];

      return (
        <div className="flex flex-row">
          <Icon extension={extension} />
          <span className="ml-3">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'modTime',
    header: 'Last Modification',
    enableSorting: true,
  },
  {
    accessorKey: 'size',
    header: 'Size',
    enableSorting: true,
    cell: ({ row }) => {
      const { isDirectory, size } = row.original;
      const formattedSize = getSizeLabel(size);

      return isDirectory ? <></> : <div>{formattedSize}</div>;
    },
  },
];
