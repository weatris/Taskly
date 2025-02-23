import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Stack } from './components/Stack/Stack';
import { AppRoutes } from './content/AppRoutes';
import './i18n.ts';

function App() {
  return (
    <Stack className="w-screen h-screen" direction="col">
      <Navbar />
      <Stack className="w-full h-full" direction="row">
        {/* <Sidebar /> */}
        <Stack className="w-full h-full">
          <Stack className="w-full h-full flex-1">
            <AppRoutes />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
