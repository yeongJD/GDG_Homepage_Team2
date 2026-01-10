import { useState } from 'react';
import { Member } from '@/types/member.types';
import defaultProfile from '@/assets/default_profile.png';
import iconGithub from '@/assets/icon_github.svg';
import iconNotion from '@/assets/icon_notion.svg';

interface MemberCardProps {
    member: Member;
    generation?: number; // 5기면 기존 스타일, 1~4기면 간소화 스타일
}

const MemberCard = ({ member, generation }: MemberCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    // 5기는 기본 프로필, 1~4기는 GitHub 프로필
    const profileImageUrl = generation === 5 || !member.github
        ? defaultProfile
        : `https://github.com/${member.github}.png`;

    // 5기 여부 확인
    const isMockup = generation === 5;

    return(
        <div
            onClick={handleClick}
            className="w-[331px] h-[320px] rounded-[24px] relative overflow-hidden cursor-pointer group"
        >
            {/* ================= 앞면 (기본 화면) ================= */}
            <div className="w-[331px] h-[320px] bg-blue-b1 rounded-[24px] p-6 relative overflow-hidden group">
                {/* 프로필 사진 */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                        src={profileImageUrl}
                        alt={`${member.name} 프로필`}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                            e.currentTarget.src = defaultProfile;
                        }}
                    />
                </div>

                {/* 이름 */}
                <div className="text-3xl font-bold mb-2">{member.name}</div>

                {/* 5기: part 태그 표시 / 1~4기: 표시 안함 */}
                {isMockup && (
                    <div className="bg-blue-100 text-blue-600 inline-block px-3 py-1 rounded text-sm font-bold mb-10">
                        {member.description}
                    </div>
                )}

                {/* 아이콘 */}
                <div className="flex gap-3 mt-auto">
                    {member.github && (
                        <a
                            href={`https://github.com/${member.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={iconGithub} alt="Github" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
                        </a>
                    )}
                    {isMockup && (
                        <img src={iconNotion} alt="Notion" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100" />
                    )}
                </div>
            </div>

            {/* ================= 뒷면 (검은색 설명창) ================= */}
            <div className={`absolute inset-0 bg-[#1F2024] p-6 text-white flex flex-col transition-opacity duration-300 ${isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

                {/* 뒷면 내용 (자기소개) */}
                <div className="flex-1 overflow-y-auto mb-4">
                    <p
                        className="text-sm leading-relaxed text-gray-300"
                        dangerouslySetInnerHTML={{ __html: member.introduce }}
                    />
                </div>

                {/* 뒷면 하단 정보 */}
                <div className="mt-auto flex items-end justify-between border-t border-gray-700 pt-4">
                    {isMockup && (
                        <div>
                            <span className="bg-[#2C2D35] text-blue-400 px-2 py-1 rounded text-xs mr-2">{member.author_name}</span>
                            <span className="bg-[#2C2D35] text-blue-400 px-2 py-1 rounded text-xs mr-2">ITM</span>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MemberCard;