import { useState } from 'react';
import MemberCard from '@/components/MemberCard';

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

const Member = () => {

  const [generation, setGeneration] = useState('1기');

  return (
    <main className="container max-w-[1041px] mx-auto px-4 relative min-h-screen">

      {/* Page Title */}
      <div className="absolute top-[260px] left-4 flex items-center gap-4">
        <h1 className="text-[40px] font-semibold leading-[150%]">Members</h1>
        
        {/* 기수 선택 토글 버튼 */}
        <BatchToggle 
          selectedGen={generation} 
          onSelect={setGeneration} 
        />
      </div>

      {/* 본문 컨텐츠 영역 */}
      <div className="pt-[480px] pb-20 flex flex-col gap-[160px]">
        
        {/* [SECTION 1] LEAD */}
        <section>
          {/* mb-6: 제목과 카드 사이 간격 24px */}
          <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">LEAD</h2>
          <div className="flex flex-wrap gap-6">
            <MemberCard name="김리더" part="PM" major='ITM'/>
          </div>
        </section>

        {/* [SECTION 2] CORE */}
        <section>
          <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">CORE</h2>
          
          {/* 반응형 그리드 시스템 (모바일 -> 태블릿 -> PC) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MemberCard name="박코어" part="Server" major='00' />
            <MemberCard name="이코어" part="Web" major='00'/>
            <MemberCard name="최코어" part="Android" major='00'/>
            <MemberCard name="정코어" part="Design" major='00'/>
          </div>
        </section>

        {/* [SECTION 3] DEVREL */}
        <section>
          <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">DEVREL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MemberCard name="홍길동" part="Evangelist" major='00'/>
            <MemberCard name="김철수" part="Content" major='00'/>
            <MemberCard name="이영희" part="Event" major='00'/>
          </div>
        </section>

        {/* [SECTION 4] MEMBER */}
        <section>
          <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">MEMBER</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MemberCard name="신입1" part="Member" major='00'/>
            <MemberCard name="신입2" part="Member" major='00'/>
            <MemberCard name="신입3" part="Member" major='00'/>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Member;