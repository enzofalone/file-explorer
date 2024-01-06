import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ViewerState {
  entries: Entry[];
  changeEntries: (newEntries: Entry[]) => void;
  selectedEntries: Record<string, Entry>;
  addSelectedEntry: (newEntry: Entry) => void;
  removeSelectedEntry: (toDelete: Entry) => void;
  clearSelectedEntries: () => void;
  selectAllEntries: () => void;
  toggleSelectedEntries: () => void;
}

export type Entry = {
  name: string;
  size: number;
  type: string;
  isDirectory: boolean;
  modTime: string;
};

export const useViewerStore = create<ViewerState>()(
  devtools(
    persist(
      (set) => ({
        entries: [],
        selectedEntries: {} as any,
        changeEntries: (newEntries: Entry[]) =>
          set((state) => ({ ...state, entries: newEntries })),

        addSelectedEntry: (newEntry: Entry) =>
          set((state) => ({
            ...state,
            selectedEntries: {
              ...state.selectedEntries,
              [newEntry.name]: newEntry,
            },
          })),

        removeSelectedEntry: (toDelete: Entry) =>
          set((state) => {
            const keyToRemove = toDelete.name;
            const { [keyToRemove]: removedValue, ...newSelectedEntries } =
              state.selectedEntries;
            return {
              ...state,
              selectedEntries: newSelectedEntries,
            };
          }),
        clearSelectedEntries: () =>
          set((state) => ({ ...state, selectedEntries: {} as any })),
        selectAllEntries: () =>
          set((state) => {
            const newSelectedEntries: Record<string, Entry> = {};
            state.entries.forEach((entry) => {
              newSelectedEntries[entry.name] = entry;
            });
            return { ...state, selectedEntries: newSelectedEntries };
          }),
        toggleSelectedEntries: () =>
          set((state) => {
            if (
              Object.keys(state.selectedEntries).length === state.entries.length
            ) {
              return { ...state, selectedEntries: {} as any };
            } else {
              const newSelectedEntries: Record<string, Entry> = {};
              state.entries.forEach((entry) => {
                newSelectedEntries[entry.name] = entry;
              });
              return { ...state, selectedEntries: newSelectedEntries };
            }
          }),
      }),

      {
        name: 'viewer-storage',
      }
    )
  )
);
