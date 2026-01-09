import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import homeBackground from '@/assets/home_background.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 배경 레이어 - 헤더 뒤까지 덮음 */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBackground})` }}
      />

      <div className="flex flex-col items-center h-[calc(100vh-100px)]">
        <p className="text-title-medium text-exclusion-yg1 mt-[260px]">
          Learn together. Build better.
        </p>

        <h1 className="text-title-bold text-grey-12 mt-[138px]">
          GDG Seoultech
        </h1>

        <p className="text-body-medium text-exclusion-yg2 mt-4">
          Google Developer Group at Seoul National University of Science & Technology
        </p>

        <button
          onClick={() => navigate(ROUTES.INTRO)}
          className="mt-[205px] px-8 py-3 bg-white border-2 border-grey-9 rounded-full text-body-semibold text-grey-9 hover:bg-grey-1 transition-colors"
        >
          5기 활동 보러가기 →
        </button>
      </div>
    </>
  );
};

export default Home;