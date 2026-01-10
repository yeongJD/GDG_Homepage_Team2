
interface SessionCardProps {
  title: string;
  desc: string;
  image?: string; // 이미지가 없을 수도 있으니 선택 사항으로
}

const SessionCard = ({ title, desc, image }: SessionCardProps) => {
  return (
    <div className="w-full flex flex-col rounded-[20px] overflow-hidden bg-[#F7F9FB] shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* 1. 이미지 영역 (체크무늬 대신 회색 박스 or 실제 이미지) */}
      <div className="w-full h-[200px] bg-gray-200 relative overflow-hidden">
        <img 
          src={image || "src/assets/pattern_placeholder.png"} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 2. 텍스트 영역 */}
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-[24px] font-bold text-black">{title}</h3>
        <p className="text-[16px] text-gray-500 leading-relaxed">
          {desc}
        </p>
      </div>

    </div>
  );
};

export default SessionCard;