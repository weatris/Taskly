import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import Stack from './components/Stack/Stack';
import './i18n.ts';
import { t } from 'i18next';

function App() {
  return (
    <Stack className="w-screen h-screen" direction="col">
      <Navbar />
      <Stack className="w-full h-full grow">
        <Sidebar />
        <>{t('headerTitle')}</>
      </Stack>
    </Stack>
  );
}

export default App;
