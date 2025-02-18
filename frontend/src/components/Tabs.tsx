import { useNavigate } from 'react-router-dom';
import Stack from './Stack/Stack';

export type TabType = {
  title?: string | React.ReactNode;
  path: string;
  component: React.ReactNode;
};

export const Tabs = ({ tabs }: { tabs: TabType[] }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const activeTab = tabs.find((tab) => tab.path === currentPath);

  return (
    <Stack className="w-full h-full" direction="col">
      <Stack className="w-full border-b" direction="row" alignItems="start">
        {tabs.map((item) => (
          <div
            key={item.path}
            className={`text-lg px-2 py-1 mx-2 border-b-2 ${item.path === currentPath ? 'border-green-700' : ''} cursor-pointer`}
            onClick={() => {
              navigate(item.path);
            }}
          >
            {item.title}
          </div>
        ))}
      </Stack>
      <div className="w-full h-full">
        {activeTab?.component || <div>Page not found</div>}
      </div>
    </Stack>
  );
};
