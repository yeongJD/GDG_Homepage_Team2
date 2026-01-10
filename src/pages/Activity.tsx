import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/animations';
import { useState } from 'react';
import SessionCard from '@/components/SessionCard';

// -------------------------------------------------------
// [1] 기수 토글 버튼 (분리된 파일로 만들었을 때 파일을 못찾는 이슈가 있어서 한 파일에 작성)
// -------------------------------------------------------
function BatchToggle({ selectedGen, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const batches = ['5기', '4기', '3기', '2기', '1기'];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xl font-bold"
      >
        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-[50px] text-lg">
          {selectedGen} {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute top-[50px] left-0 bg-white
          w-[276px] h-auto py-6 rounded-[16px] 
          border border-[#D8D8D8] 
          shadow-[0px_1px_12px_0px_rgba(0,0,0,0.1)]
          flex flex-col justify-center items-start pl-8 gap-4
          z-50"
        >
          {batches.map((batch) => (
            <li 
              key={batch}
              onClick={() => {
                onSelect(batch);
                setIsOpen(false);
              }}
              className="cursor-pointer text-xl font-medium transition-colors
                text-gray-400 hover:text-black"
            >
              {batch}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const Activity = () => {

  const [selectedGen, setSelectedGen] = useState('5기');

  // 기수 텍스트 변환 헬퍼 함수 ('5기' -> '5th', '1기' -> '1st')
  const getSessionTitle = (gen: string) => {
    const num = gen.replace('기', ''); // 숫자만 추출
    if (num === '1') return '1st';
    if (num === '2') return '2nd';
    if (num === '3') return '3rd';
    return `${num}th`; // 4th, 5th...
  };

  // 활동 데이터 배열
  const activities = [
    {
      id: 1,
      title: "정규 세션 중심의\n학습과 교류",
      desc: "매주 정규 세션에서 각 파트의 지식을 공유하며 성장합니다.\n파트 간 교류를 통해 한 분야에 국한되지 않고, 다양한 기술과 관점을 함께 배울 수 있습니다.",
      image: "src/assets/images/activity_session.png",
      layout: "image-left", 
    },
    {
      id: 2,
      title: "학교를 넘어 확장되는\nGDG 커뮤니티",
      desc: "타 학교 GDG와의 연합 세션을 통해 교류하고, 해커톤과\n오프라인 행사를 통해 다양한 학교의 학생들과 연결됩니다.",
      image: "src/assets/images/activity_community.png",
      layout: "image-right", 
    },
    {
      id: 3,
      title: "전 세계와 함께하는\nSolution Challenge",
      desc: "구글 주최의 글로벌 개발자 대회로, 참가자들이 구글 기술을\n활용해 UN 지속가능발전목표(SDGs) 중 하나를 해결하는\n혁신적인 앱이나 서비스를 개발하는 것을 목표로 합니다.",
      image: "src/assets/images/activity_solution.png",
      layout: "image-left",
    },
    {
      id: 4,
      title: "GDG출신 선배들의\n실무 특강",
      desc: "GDG 활동 이후 현업에서 활약 중인 선배들의 특강과 세미나를 통해, 실무 현장의 이야기와 취업 준비에 도움이 되는 인사이트를 얻을 수 있습니다.",
      image: "src/assets/images/activity_lecture.png",
      layout: "image-right",
    },
  ];

  // 5th Session 카드에 들어갈 데이터 (나중에 DB에서 가져오겠지만 지금은 하드코딩)
  const sessionList = [
    { id: 1, title: 'Text', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', image: "" },
    { id: 2, title: 'Text', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', image: "" },
    { id: 3, title: 'Text', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', image: "" },
    { id: 4, title: 'Text', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', image: "" },
    ];

  return (
    <section className="w-full flex flex-col items-center py-[100px] bg-white">
      
      {/* ==========================================
          Part 1: What We Do 섹션
      ========================================== */}
      <div className="w-full max-w-[1041px] px-6">
        
        {/* 타이틀 영역 */}
        <motion.div 
          className="mb-[60px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={slideUp}
        >
          <h2 className="text-[60px] font-bold leading-[1.2] mb-6 text-black text-left">
            What<br />We Do
          </h2>
          <p className="text-[22px] text-gray-600 leading-[1.5] max-w-[1041px] text-left">
            GDG SeoulTech는 매주 정규 세션을 통해 각자의 지식과 경험을 나눕니다.<br />
            또한 다른 GDG 소속 학교들과의 연합 행사, 해커톤을 통해 더 넓은 개발자 커뮤니티로 연결됩니다.
          </p>
        </motion.div>

        {/* 활동 카드 리스트 */}
        <div className="flex flex-col gap-[40px] max-w-[1041px]">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              // [애니메이션] 스크롤 내릴 때마다 하나씩 올라옴
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // 20% 정도 보이면 실행
              transition={{ duration: 0.6, delay: index * 0.1 }} // 순차적으로 올라오게 delay
              variants={slideUp}
              
              // [스타일] layout에 따라 flex-row 또는 flex-row-reverse 결정
              className={`
                flex w-full h-[320px] rounded-[30px] overflow-hidden 
                bg-[#F2F4F6]
                ${activity.layout === 'image-right' ? 'flex-row-reverse' : 'flex-row'}
              `}
            >
              
              {/* 1. 이미지 영역 (41.3%) */}
              <div className="w-[41.3%] h-full relative overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* 2. 텍스트 영역 (나머지) */}
              <div className="flex-1 p-10 flex flex-col justify-center">
                <h3 className="text-[30px] font-semibold mb-4 whitespace-pre-line text-left leading-[1.3]">
                  {activity.title}
                </h3>
                <p className="text-grey-8 leading-[1.5] text-[22px] whitespace-pre-line text-left">
                  {activity.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>


      {/* ==========================================
          Part 2: 5th Session (네비게이션 타겟)
      ========================================== */}
      <div id="target-5th-session" className="w-full max-w-[1000px] px-6 mt-[200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={slideUp}
        >

          <h2 className="text-[60px] font-semibold leading-[1.2] mb-4 text-left">
            {getSessionTitle(selectedGen)}<br/>
            Session
          </h2>
          
          <p className="text-[22px] font-medium leading-[1.5] tracking-[0] text-[#6D6D6D] mb-[28px] text-left">
            {selectedGen}의 주요 활동들을 확인해보세요
          </p>

          {/* 기수 선택 토글 버튼 */}
          <div className="mb-[80px]">
             <BatchToggle 
                selectedGen={selectedGen} 
                onSelect={setSelectedGen} 
             />
          </div>
        </motion.div>
        
      </div>
      {/* 가로 스크롤 컨테이너 */}
      <div 
        className="
          w-full 
          overflow-x-auto 
          flex gap-6 
          snap-x snap-mandatory 
          pb-8 
          mb-[368px]
          pl-6 xl:pl-[calc((100vw-1000px)/2+24px)]
        "
      >
        {sessionList.map((session) => (    
          <div key={session.id} className="snap-center">
            <SessionCard 
              key={session.id}
              title={session.title}
              desc={session.desc}
              image={session.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activity;