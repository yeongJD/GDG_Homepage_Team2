import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import gdgLogo from '@/assets/gdg_logo.png';

const Header = () => {
  return (
    <header className="bg-white border-b border-grey-2 h-[100px]">
      <nav className="w-full h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={gdgLogo} alt="GDG Logo" className="h-6 sm:h-7 md:h-8" />
        </Link>
        <ul className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <li>
            <Link to={ROUTES.INTRO} className="text-sm sm:text-base text-grey-12 hover:text-brand-blue transition-colors">
              소개
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ACTIVITY} className="text-sm sm:text-base text-grey-12 hover:text-brand-blue transition-colors">
              활동
            </Link>
          </li>
          <li>
            <Link to={ROUTES.MEMBER} className="text-sm sm:text-base text-grey-12 hover:text-brand-blue transition-colors">
              멤버
            </Link>
          </li>
          <li>
            <Link to={ROUTES.LOGIN} className="text-sm sm:text-base text-grey-12 hover:text-brand-blue transition-colors">
              로그인
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
