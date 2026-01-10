import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import homeBackground from "@/assets/home_background.png";
import { motion } from "framer-motion";

const HEADER_H = 100;

// 요소 단위 순차 등장 (stagger)
const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.9,
    },
  },
};



const firstItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut", delay: 0.25  },
  },
};

// ✅ 2~마지막 요소는 "같은 딜레이"로 동시에 등장
const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut", delay: 0.9 }, // 여기만 조절
  },
};



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* 배경 레이어 - 헤더 뒤까지 덮음 */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBackground})` }}
      />

      {/* 헤더 아래 영역 전체 중앙 */}
      <section
        className="flex w-full items-center justify-center"
        style={{ height: `calc(100vh - ${HEADER_H}px)` }}
      >
        {/*  애니메이션 */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={firstItem}
            className="text-[40px] font-medium leading-[48px] text-[#8B8A82]"
          >
            Learn together. Build better.
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-[48px] text-[100px] font-bold leading-[90px] text-[#2F2F2F]"
          >
            GDG Seoultech
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-[24px] text-[26px] font-medium leading-[36px] text-[#565653]"
          >
            Google Developer Group at Seoul National University of Science & Technology
          </motion.p>

          <motion.button
            variants={item}
            onClick={() => navigate(ROUTES.INTRO)}
            className="mt-[48px] inline-flex items-center gap-2 rounded-full bg-white px-6 py-5
                       text-[22px] font-semibold leading-[33px] text-[#595959]
                       outline outline-1 outline-grey-9 outline-offset-[-1px]
                       hover:bg-grey-1 transition-colors"
          >
            5기 활동 보러가기 <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
