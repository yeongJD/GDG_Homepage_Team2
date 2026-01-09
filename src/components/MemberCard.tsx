import { useState } from 'react';
import defaultProfile from '@/assets/default_profile.png';
import iconGithub from '@/assets/icon_github.svg';
import iconNotion from '@/assets/icon_notion.svg';

interface MememberCardProps {
    name: string;
    part: string;
    major: string;
    // 사진이나 링크는 나중에 추가
}

const MememberCard = ({name, part, major}: MememberCardProps) => {
    // isFlipped: 현재 상태 (true면 뒷면, false면 앞면)
    // setIsFlipped: 상태를 바꾸는 스위치 함수
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped); // true <-> false 토글(반전)
    };

    return(
        <div 
            onClick={handleClick}
            className="w-[331px] h-[320px] rounded-[24px] relative overflow-hidden cursor-pointer group"
        >
            {/* ================= 앞면 (기본 화면) ================= */}
            <div className="w-[331px] h-[320px] bg-blue-b1 rounded-[24px] p-6 relative overflow-hidden group">
                {/* 프로필 사진 */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img src={defaultProfile} alt="프로필" className='w-full h-full object-cover' />
                </div>

                {/* 이름 */}
                <div className="text-3xl font-bold mb-2">{name}</div>

                {/* 파트 */}
                <div className="bg-blue-100 text-blue-600 inline-block px-3 py-1 rounded text-sm font-bold mb-10">
                    {part}
                </div>

                {/* 아이콘 들어갈 자리 */}
                <div className="flex gap-3 mt-auto">
                    <img src={iconGithub} alt="Github" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
                    <img src={iconNotion} alt="Notion" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
                </div>
            </div>

            {/* ================= 뒷면 (검은색 설명창) ================= */}    
            <div className={`absolute inset-0 bg-[#1F2024] p-6 text-white flex flex-col transition-opacity duration-300 ${isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                
                {/* 뒷면 내용 (텍스트 넣기) */}
                <div className="flex-1 overflow-y-auto mb-4">
                <p className="text-sm leading-relaxed text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    (여기에 자기소개 글이 들어갑니다)
                </p>
                </div>

                {/* 뒷면 하단 정보 */}
                <div className="mt-auto flex items-end justify-between border-t border-gray-700 pt-4">
                <div>
                    <span className="bg-[#2C2D35] text-blue-400 px-2 py-1 rounded text-xs mr-2">{name}</span>
                    <span className="bg-[#2C2D35] text-blue-400 px-2 py-1 rounded text-xs mr-2">{major}</span>
                </div>
                </div>
            </div>

        </div>
    );
};

export default MememberCard;