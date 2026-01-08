import MemberCard from '@/components/MemberCard';

  return (
      >
        >
    </div>
  );
const Member = () => {

  return (
    <main className="container max-w-[1041px] mx-auto px-4 relative min-h-screen">

      {/* Page Title */}
      <div className="absolute top-[260px] left-4 flex items-center gap-4">
        <h1 className="text-[40px] font-semibold leading-[150%]">Members</h1>
        
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