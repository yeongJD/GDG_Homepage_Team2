import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';

const Intro = () => {
  // 카드 데이터
  const cards = [
    { category: 'APP', desc: 'IOS / Swift / Git / React', gradient: 'linear-gradient(149.93deg, #5CA0FF 1.66%, #A6DEFF 100%)' },
    { category: 'AI', desc: 'Python / TensorFlow / Pytorch', gradient: 'linear-gradient(149.93deg, #FFE95C 1.66%, #FFF5A6 100%)' },
    { category: 'Design', desc: 'Figma / UI / UX', gradient: 'linear-gradient(149.93deg, #FF95C6 1.66%, #FFC6E0 100%)' },
    { category: 'Front\nEnd', desc: 'HTML / CSS / React', gradient: 'linear-gradient(149.93deg, #FF9595 1.66%, #FFC6C6 100%)' },
    { category: 'Back\nEnd', desc: 'Java / Spring / DB', gradient: 'linear-gradient(149.93deg, #95FF9F 1.66%, #C6FFCC 100%)' },
  ];

  return (
    <section className="relative flex flex-col items-center w-full min-h-screen mx-auto pt-[100px] pb-[200px] overflow-hidden">
      {/* 배경 이미지 */}
      <img 
        src="src\assets\images\home_background.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover -z-10" 
      />
      
      {/* --- 1. 텍스트 섹션 (Framer Motion 적용) --- */}
      
      {/* 1) 메인 타이틀: We are GDG Seoultech */}
      <motion.h1 
        className="font-semibold text-[80px] leading-[80px] text-center mb-8"
        style={{ fontFamily: 'Pretendard' }}
        
        // 애니메이션 설정
        variants={slideUp}       // 가져온 slideUp 효과 적용
        initial="hidden"         // 처음엔 숨김 상태
        whileInView="visible"    // 화면에 보이면 실행
        viewport={{ once: true }}// 한 번만 실행
        transition={{ duration: 0.6, delay: 0.1 }} // 0.1초 뒤 시작
      >
        We are<br />GDG Seoultech
      </motion.h1>

      {/* 2) 서브 타이틀: 함께 배우고... */}
      <motion.h2 
        className="font-medium text-[22px] leading-[1.5] text-center mb-8"
        style={{ fontFamily: 'Pretendard' }}
        
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }} // 0.3초 뒤 시작 (위보다 0.2초 늦게)
      >
        함께 배우고, 만들며, 성장하는 서울과기대 개발자 커뮤니티
      </motion.h2>

      {/* 3) 설명 글: GDG는... */}
      <motion.p 
        className="font-medium text-[22px] leading-[1.5] text-center text-gray-700 whitespace-pre-line max-w-[800px] mb-[100px]"
        style={{ fontFamily: 'Pretendard' }}
        
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }} // 0.5초 뒤 시작 (가장 늦게)
      >
        GDG는 Google Developer Groups의 약자로, 구글 기술에 관심 있는 개발자들과 디자이너가 모여
        서로 배우고 정보를 공유하는 커뮤니티 입니다. 안드로이드, 클라우드, 웹 등 구글 기술과 API를 주제로
        다양한 스터디, 워크숍, 밋업 등을 진행하며 1년동안 서로 성장합니다.
      </motion.p>


      {/* --- 2. 카드 섹션 --- */}
      {/* 카드는 전체가 살짝 투명도 0 -> 1로 나타나게 fadeIn 적용해볼까요? */}
      <motion.div 
        className="flex flex-wrap justify-center gap-6"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }} // 텍스트 다 나온 뒤에 스르륵 등장
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative w-[331px] h-[425px] rounded-[20px] overflow-hidden transition-all duration-300"
            style={{ background: card.gradient }}
          >
            {/* 기본 상태 */}
            <div className="absolute p-8 flex flex-col justify-start h-full w-full">
              <h3 className="text-3xl font-bold text-black/60 group-hover:opacity-0 transition-opacity duration-300">
                {card.category}
              </h3>
              <p className="mt-2 text-sm text-black/50 group-hover:opacity-0 transition-opacity duration-300">
                {card.desc}
              </p>
            </div>

            {/* Hover 상태 (검은 배경) */}
            <div className="absolute inset-0 bg-[#2F2F2F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                {card.category}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet,<br/>
                consectetur adipiscing elit
              </p>
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
};

export default Intro;