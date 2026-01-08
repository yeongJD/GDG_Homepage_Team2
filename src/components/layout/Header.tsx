import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const Header = () => {
  return (
    <header className="bg-white border-b border-grey-2">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={ROUTES.HOME} className="text-2xl font-bold text-brand-blue">
            GDG
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link to={ROUTES.ABOUT} className="text-grey-12 hover:text-brand-blue transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to={ROUTES.PROJECTS} className="text-grey-12 hover:text-brand-blue transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TEAM} className="text-grey-12 hover:text-brand-blue transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link to={ROUTES.CONTACT} className="text-grey-12 hover:text-brand-blue transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
