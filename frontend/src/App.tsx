import { useEffect } from 'react';
import { ThemeProvider } from './components/theme-provider';
import Directory from './components/header/directory';
import { GetHomeDirectory } from '../wailsjs/go/main/App';
import { useDirectoryStore } from './state/directory';
import Viewer from './components/viewer/viewer';
import Indicator from './components/indicator/indicator';

function App() {
  const { addDirectoryStack } = useDirectoryStore();

  const fetchHomeDirectory = async () => {
    const directoryResponse = await GetHomeDirectory();
    if (directoryResponse.error) {
      console.error(directoryResponse.error);
      return;
    }
    addDirectoryStack(directoryResponse.url);
  };

  useEffect(() => {
    fetchHomeDirectory();
  }, []);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className="max-h-screen bg-slate-950 flex flex-col">
        <Directory />
        <Viewer />
        <Indicator/>
      </div>
    </ThemeProvider>
  );
}

export default App;
