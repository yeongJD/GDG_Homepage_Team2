
interface SessionCardProps {
  title: string;
  desc: string;
  image?: string; // 이미지가 없을 수도 있으니 선택 사항으로
}

const SessionCard = ({ title, desc, image }: SessionCardProps) => {
  return (
    <div className="w-[419px] h-[566px] bg-blue-b1 rounded-[20px] overflow-hidden flex flex-col shadow-sm shrink-0">
      
      {/* 이미지 영역 (체크무늬 대신 회색 박스 or 실제 이미지) */}
      <div className="w-full h-[279px] relative overflow-hidden bg-white border-b border-gray-100 shrink-0">
        <img 
          src={image || "src/assets/pattern_placeholder.png"} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex-1 flex flex-col items-start justify-start text-left px-[32px] pt-[32px] pb-[92px]">
        <h3 className="text-[40px] font-semibold text-black mb-[12px]">{title}</h3>
        <p className="text-[22px] text-gray-500 leading-relaxed">
          {desc}
        </p>
      </div>

    </div>
  );
};

export default SessionCard;