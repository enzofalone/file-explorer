import { useViewerStore } from '@/state/viewer';

type Props = {};

const Indicator = (props: Props) => {
  const { selectedEntries } = useViewerStore();

  const plural = Object.keys(selectedEntries).length > 1 ? 's' : '';
  const selectedEntriesLength = Object.keys(selectedEntries).length;

  return (
    <div className="w-full bg-slate-900 p-2 h-8">
      {selectedEntriesLength > 0
        ? `${selectedEntriesLength} item${plural} selected (Press CTRL while clicking to select multiple)`
        : ''}
    </div>
  );
};

export default Indicator;
