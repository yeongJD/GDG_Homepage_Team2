import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import gdgLogo from '@/assets/gdg_logo.png';

const Header = () => {
  return (
    <header className="bg-transparent h-[100px]">
      <nav className="w-full h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={gdgLogo} alt="GDG Logo" className="h-6 sm:h-7 md:h-8" />
        </Link>
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-[95px]">
            <li>
              <Link to={ROUTES.INTRO} className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors">
                소개
              </Link>
            </li>
            <li>
              <Link to={ROUTES.ACTIVITY} className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors">
                활동
              </Link>
            </li>
            <li>
              <Link to={ROUTES.MEMBER} className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors">
                멤버
              </Link>
            </li>
          </ul>
        </div>
        <Link to={ROUTES.LOGIN} className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors">
          로그인
        </Link>
      </nav>
    </header>
  );
};

export default Header;
