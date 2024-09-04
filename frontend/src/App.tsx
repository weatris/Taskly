import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import Stack from './components/Stack';

function App() {
  return (
    <Stack className="w-screen h-screen" direction="col">
      <Navbar />
      <Stack className="w-full h-full grow">
        <Sidebar />
        <>content</>
      </Stack>
    </Stack>
  );
}

export default App;
