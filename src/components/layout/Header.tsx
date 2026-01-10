import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { googleAuthUtils } from '@/utils/googleAuth.utils';
import gdgLogo from '@/assets/gdg_logo.png';
import profileImg from '@/assets/profile.svg';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  // '활동' 이동 로직
  const handleNavigation = (sectionId: string) => {
    // 1. 현재 Intro 페이지에 있다면? -> 바로 해당 위치로 부드럽게 스크롤
    if (location.pathname === ROUTES.INTRO) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } 
    // 2. 다른 페이지라면? -> Intro 페이지로 이동하면서 #해시값 전달 (Intro 페이지에서 useEffect가 받아서 처리함)
    else {
      navigate(`${ROUTES.INTRO}#${sectionId}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    googleAuthUtils.redirectToGoogle();
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate(ROUTES.HOME);
  };

  const handleProfileEdit = () => {
    navigate(ROUTES.PROFILE);
    setShowDropdown(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 h-[100px] z-50 ${isHomePage ? 'bg-transparent' : 'bg-white border-b border-grey-2'}`}>
      <nav className="w-full h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={gdgLogo} alt="GDG Logo" className="h-6 sm:h-7 md:h-8" />
        </Link>
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-[95px]">
            <li>
              <button 
                onClick={() => handleNavigation('intro-section')}
                className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors"
              >
                소개
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('target-5th-session')}
                className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors"
              >
                활동
              </button>
            </li>
            <li>
              <Link to={ROUTES.MEMBER} className={`text-body-bold transition-colors ${location.pathname === ROUTES.MEMBER ? 'text-grey-10' : 'text-grey-7 hover:text-grey-10'}`}>
                멤버
              </Link>
            </li>
          </ul>
        </div>

        {!isAuthenticated ? (
          <button
            onClick={handleLogin}
            className="text-body-bold text-grey-7 hover:text-grey-10 transition-colors"
          >
            로그인
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-transparent"
            >
              <img
                src={user?.imageUrl || profileImg}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[140px] z-50">
                <button
                  onClick={handleProfileEdit}
                  className="w-full text-left px-4 py-2 text-body-medium text-grey-4 hover:bg-grey-1 transition-colors"
                >
                  프로필 수정
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-body-medium text-red-r3 hover:bg-grey-1 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
