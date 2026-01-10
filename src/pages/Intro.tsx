import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Activity from '@/pages/Activity';

const Intro = () => {
  const location = useLocation();

  // [스크롤 로직] 외부에서 #해시를 달고 들어오면 해당 위치로 스르륵 이동
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // 렌더링 타이밍을 위해 살짝 딜레이 후 이동
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // 카드 데이터
  const cards = [
    { 
      category: 'APP', desc: 'IOS / Swift / Git / React', 
      gradientStyle: 'linear-gradient(149.93deg, #5CA0FF 1.66%, #A6DEFF 100%)' 
    },
    { 
      category: 'AI', desc: 'Python / TensorFlow / Pytorch', 
      gradientStyle: 'linear-gradient(149.93deg, #FFE879 1.66%, #FFF4C2 100%)' 
    },
    { 
      category: 'Design', desc: 'Figma / UI / UX', 
      gradientStyle: 'linear-gradient(149.93deg, #FF9EC7 1.66%, #FFD5E7 100%)' 
    },
    { 
      category: 'Front\nEnd', desc: 'HTML / CSS / React', 
      gradientStyle: 'linear-gradient(149.93deg, #FF9C9C 1.66%, #FFD7D7 100%)' 
    },
    { 
      category: 'Back\nEnd', desc: 'Java / Spring / DB', 
      gradientStyle: 'linear-gradient(149.93deg, #94F0A1 1.66%, #DCFFC3 100%)' 
    },
  ];

  return (
    <div className="w-full">
      <section className="relative flex flex-col items-center w-full min-h-screen mx-auto pt-[400px] pb-[200px] overflow-hidden">
        {/* 배경 이미지 */}
        <img 
          src="src\assets\home_background.png" 
          alt="Background" 
          className="absolute top-0 left-0 w-full h-auto -z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]" 
        />
        
        {/* --- 1. 텍스트 섹션 (Framer Motion 적용) --- */}
        
        {/* 1) 메인 타이틀: We are GDG Seoultech */}
        <motion.h1 
          className="font-semibold text-[80px] leading-[80px] text-center mb-[80px]"
          style={{ fontFamily: 'Pretendard' }}
          
          // 애니메이션 설정
          variants={slideUp}       // 가져온 slideUp 효과 적용
          initial="hidden"         // 처음엔 숨김 상태
          whileInView="visible"    // 화면에 보이면 실행
          viewport={{ once: true }}// 한 번만 실행
          transition={{ duration: 0.6, delay: 0.1 }} // 0.1초 뒤 시작
        >
          We are<br />
          <span className="font-bold">GDG Seoultech</span>
        </motion.h1>

        {/* 2) 서브 타이틀: 함께 배우고... */}
        <motion.h2 
          className="font-medium text-[22px] leading-[1.5] text-center mb-[40px]"
          style={{ fontFamily: 'Pretendard' }}
          
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }} // 0.3초 뒤 시작 (위보다 0.2초 늦게)
        >
          함께 배우고, 만들며, 성장하는 서울과기대 개발자 커뮤니티
        </motion.h2>

        {/* 3) 설명 글: GDG는... */}
        <motion.p 
          className="font-medium text-[22px] leading-[1.5] text-center text-grey-7 whitespace-pre-line mb-[172px]"
          style={{ fontFamily: 'Pretendard' }}
          
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }} // 0.5초 뒤 시작 (가장 늦게)
        >
          GDG는 Google Developer Groups의 약자로, 구글 기술에 관심 있는 개발자들과 디자이너가 모여<br/>
          서로 배우고 정보를 공유하는 커뮤니티 입니다. 안드로이드, 클라우드, 웹 등 구글 기술과 API를 주제로<br/>
          다양한 스터디, 워크숍, 밋업 등을 진행하며 1년동안 서로 성장합니다.
        </motion.p>


        {/* --- 2. 카드 섹션 --- */}
        {/* 카드는 전체가 살짝 투명도 0 -> 1로 나타나게 fadeIn 적용해볼까요? */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 max-w-[1041px]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }} // 텍스트 다 나온 뒤에 스르륵 등장
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative w-[331px] h-[425px] rounded-[20px] overflow-hidden transition-all duration-300 shadow-lg"
              style={{ background: card.gradientStyle }}
            >
              {/* 기본 상태 */}
              <div className="absolute p-8 flex flex-col justify-start h-full w-full">
                <h3 className="text-[40px] font-bold text-black/60 group-hover:opacity-0 transition-opacity duration-300 whitespace-pre-line mb-[12px]">
                  {card.category}
                </h3>
                <p className="mt-2 text-[16px] font-medium text-grey-9 leading-[1.5] group-hover:opacity-0 transition-opacity duration-300">
                  {card.desc}
                </p>
              </div>

              {/* Hover 상태 (검은 배경) */}
              <div className="absolute inset-0 bg-[#2F2F2F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-center p-6 text-left">
                <p className="text-white/80 text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Activity 섹션 */}
      <Activity />

    </div>
  );
};

export default Intro;