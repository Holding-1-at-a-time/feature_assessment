import { Sidebar, MainContent } from 'shadcn-ui';
import 'tailwindcss/tailwind.css';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar className="w-full md:w-1/4 bg-gray-800 text-white">
        {/* Sidebar content */}
      </Sidebar>
      <MainContent className="w-full md:w-3/4 p-4">
        {children}
      </MainContent>
    </div>
  );
};

export default Layout;