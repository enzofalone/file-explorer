import { useDirectoryStore } from '@/state/directory';
import { Input } from '../ui/input';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { GetDirectoryContent } from '../../../wailsjs/go/main/App';
import { Entry, useViewerStore } from '@/state/viewer';
import { Button } from '../ui/button';
type Props = {};

const Directory = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { addDirectoryStack, directoryStack, popDirectoryStack } =
    useDirectoryStore();
  const { changeEntries, clearSelectedEntries } = useViewerStore();
  const [dirVal, setDirVal] = useState(
    directoryStack[directoryStack.length - 1]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && isActive) {
      setDirVal(event.target.value);
    }
  };

  const submitDirectory = (e: FormEvent) => {
    e.preventDefault();

    addDirectoryStack(dirVal);
  };

  const onBackButton = () => {
    if (directoryStack.length > 1) {
      popDirectoryStack();
    }
  };

  const fetchDirectoryEntries = async () => {
    const entriesResponse = await GetDirectoryContent(
      directoryStack[directoryStack.length - 1]
    );

    // if error, directory does not exist
    if (entriesResponse.error) {
      console.error(
        entriesResponse.error,
        directoryStack[directoryStack.length - 1]
      );
      popDirectoryStack();
      return;
    }
    changeEntries(entriesResponse.entries as unknown as Entry[]);
  };

  // Fetch entries if new directory
  useEffect(() => {
    if (directoryStack.length > 0) {
      fetchDirectoryEntries();
      clearSelectedEntries();
      setDirVal(directoryStack[directoryStack.length - 1]);
    }
  }, [directoryStack]);

  return (
    <div className="w-full h-full text-white border-0 flex flex-row ">
      <Button
        className="bg-slate-900 hover:bg-slate-800"
        onClick={onBackButton}
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#e6e6e6"
          stroke="#e6e6e6"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              fill="#e3e3e3"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            />

            <path
              fill="#e3e3e3"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            />
          </g>
        </svg>
      </Button>
      <form onSubmit={submitDirectory} className='w-full'>
        <Input
          type="text"
          placeholder="Some directory url..."
          value={dirVal}
          onChange={onChange}
          className="border-0"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </form>
    </div>
  );
};

export default Directory;
