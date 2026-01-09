import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import homeBackground from "@/assets/home_background.png";

const HEADER_H = 100;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* 배경 레이어 - 헤더 뒤까지 덮음 */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBackground})` }}
      />

      {/* ✅ 헤더 아래 영역 전체를 중앙 정렬 */}
      <section
        className="flex w-full items-center justify-center"
        style={{ height: `calc(100vh - ${HEADER_H}px)` }}
      >
        {/* ✅ 가운데 정렬될 “콘텐츠 묶음” */}
        <div className="flex flex-col items-center text-center">
          {/* Learn together... */}
          <p className="text-[40px] font-medium leading-[90px] text-[#8B8A82]">
            Learn together. Build better.
          </p>

          {/* Title */}
          <h1 className="mt-8 text-[100px] font-bold leading-[90px] text-[#2F2F2F]">
            GDG Seoultech
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-[26px] font-medium leading-[90px] text-[#565653]">
            Google Developer Group at Seoul National University of Science & Technology
          </p>

          {/* Button */}
          <button
            onClick={() => navigate(ROUTES.INTRO)}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-5
                       text-[22px] font-semibold leading-[33px] text-[#595959]
                       outline outline-1 outline-grey-9 outline-offset-[-1px]
                       hover:bg-grey-1 transition-colors"
          >
            5기 활동 보러가기 <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
