import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import Stack from './components/Stack/Stack';
import { AppRoutes } from './content/AppRoutes';
import './i18n.ts';

function App() {
  return (
    <Stack className="w-screen h-screen" direction="col">
      <Navbar />
      <Stack className="w-full h-full relative" direction="row">
        <Sidebar />
        <Stack className="w-full h-full relative">
          <Stack className="w-full h-full absolute flex-1">
            <AppRoutes />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
