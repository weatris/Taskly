import { Navbar } from './components/Navbar';
import { Stack } from './components/basic/Stack/Stack';
import { AppRoutes } from './content/AppRoutes';

function App() {
  return (
    <Stack className="w-screen h-screen" direction="col">
      <Navbar />
      <Stack className="w-full h-full">
        <Stack className="w-full h-full flex-1">
          <AppRoutes />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
