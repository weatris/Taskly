import { Navbar } from './components/Navbar';
import { Stack } from './components/basic/Stack/Stack';
import { AppRoutes } from './content/AppRoutes';
import { useStateProvider } from './stateProvider/useStateProvider';

function App() {
  const { showNavbar } = useStateProvider().state.config;
  return (
    <Stack className="w-screen h-screen" direction="col">
      {showNavbar && <Navbar />}
      <Stack className="w-full flex-1 overflow-auto">
        <AppRoutes />
      </Stack>
    </Stack>
  );
}

export default App;
