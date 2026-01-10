import { useState, useMemo } from 'react';
import MemberCard from '@/components/MemberCard';
import { allGenerations, getMembersByRole } from '@/data';
import { Member as MemberType } from '@/types/member.types';

// -------------------------------------------------------
// [1] 기수 토글 버튼
// -------------------------------------------------------
interface BatchToggleProps {
  selectedGen: string;
  onSelect: (gen: string) => void;
}

function BatchToggle({ selectedGen, onSelect }: BatchToggleProps) {
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

// -------------------------------------------------------
// [2] 전체 멤버 페이지 (메인)
// -------------------------------------------------------

const Member = () => {
  const [generation, setGeneration] = useState('5기');

  // 선택된 기수 번호
  const genNumber = useMemo(() => parseInt(generation.replace('기', '')), [generation]);

  // 선택된 기수의 멤버 데이터 가져오기
  const currentMembers = useMemo(() => {
    const genData = allGenerations.find(g => g.generation === genNumber);
    return genData?.members || [];
  }, [genNumber]);

  // role별로 멤버 분류
  const leadMembers = useMemo(() => getMembersByRole(currentMembers, 'lead'), [currentMembers]);
  const coreMembers = useMemo(() => getMembersByRole(currentMembers, 'core'), [currentMembers]);
  const devrelMembers = useMemo(() => getMembersByRole(currentMembers, 'devrel'), [currentMembers]);
  const members = useMemo(() => getMembersByRole(currentMembers, 'member'), [currentMembers]);

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
        {leadMembers.length > 0 && (
          <section>
            <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">LEAD</h2>
            <div className="flex flex-wrap gap-6">
              {leadMembers.map((member: MemberType) => (
                <MemberCard key={member.id} member={member} generation={genNumber} />
              ))}
            </div>
          </section>
        )}

        {/* [SECTION 2] CORE */}
        {coreMembers.length > 0 && (
          <section>
            <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">CORE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreMembers.map((member: MemberType) => (
                <MemberCard key={member.id} member={member} generation={genNumber} />
              ))}
            </div>
          </section>
        )}

        {/* [SECTION 3] DEVREL */}
        {devrelMembers.length > 0 && (
          <section>
            <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">DEVREL</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devrelMembers.map((member: MemberType) => (
                <MemberCard key={member.id} member={member} generation={genNumber} />
              ))}
            </div>
          </section>
        )}

        {/* [SECTION 4] MEMBER */}
        {members.length > 0 && (
          <section>
            <h2 className="font-semibold text-[60px] leading-[72px] tracking-[0px] mb-6">MEMBER</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member: MemberType) => (
                <MemberCard key={member.id} member={member} generation={genNumber} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
};

export default Member;