import { useViewerStore } from '@/state/viewer';
import { DataTable } from './viewer-table';
import { viewerColumns } from './viewer-columns';

type Props = {};

const Viewer = (props: Props) => {
  const { entries } = useViewerStore();
  return (
    <div className='overflow-y-auto w-full flex-1 h-full'>
      <DataTable columns={viewerColumns} data={entries} />
    </div>
  );
};

export default Viewer;
