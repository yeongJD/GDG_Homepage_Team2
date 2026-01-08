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
              <Link to={ROUTES.INTRO} className="text-grey-12 hover:text-brand-blue transition-colors">
                소개
              </Link>
            </li>
            <li>
              <Link to={ROUTES.ACTIVITY} className="text-grey-12 hover:text-brand-blue transition-colors">
                활동
              </Link>
            </li>
            <li>
              <Link to={ROUTES.MEMBER} className="text-grey-12 hover:text-brand-blue transition-colors">
                멤버
              </Link>
            </li>
            <li>
              <Link to={ROUTES.LOGIN} className="text-grey-12 hover:text-brand-blue transition-colors">
                로그인
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
