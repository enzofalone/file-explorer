import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DirectoryState {
  directory: string;
  directoryStack: string[];
  addDirectoryStack: (currentDirectory: string) => void;
  changeDirectory: (newDirectory: string) => void;
  popDirectoryStack: () => void;
}

export const useDirectoryStore = create<DirectoryState>()(
  devtools(
    (set) => ({
      directory: '',
      directoryStack: [],
      addDirectoryStack: (current: string) =>
        set((state) => ({
          directoryStack: [...state.directoryStack, current],
        })),
      popDirectoryStack: () =>
        set((state) => {
          return {
            directoryStack: state.directoryStack.slice(
              0,
              state.directoryStack.length - 1
            ),
          };
        }),
      changeDirectory: (to: string) => set((state) => ({ directory: to })),
    }),
    {
      name: 'directory-storage',
    }
  )
);
