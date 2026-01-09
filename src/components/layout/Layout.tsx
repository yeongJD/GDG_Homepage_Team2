import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ROUTES } from '@/constants/routes';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;
