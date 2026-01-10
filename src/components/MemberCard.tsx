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

    // 이미지 URL 결정 로직
    const getProfileImage = () => {
        if (member.imageUrl) return member.imageUrl;
        if (generation === 5) return defaultProfile;
        return member.github ? `https://github.com/${member.github}.png` : defaultProfile;
    };

    const profileImageUrl = getProfileImage();

    // 5기 여부 확인
    const isMockup = generation === 5;

    return(
        <div
            onClick={handleClick}
            className="w-[331px] h-[320px] rounded-[24px] relative overflow-hidden cursor-pointer group"
        >
            {/* ================= 앞면 (기본 화면) ================= */}
            <div className={`w-[331px] h-[320px] bg-blue-b1 rounded-[24px] relative overflow-hidden group transition-opacity duration-[600ms] ${isMockup ? 'p-6' : ''} ${isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                {isMockup ? (
                    // 5기 레이아웃
                    <>
                        {/* 상단 283*193 영역 (중앙 정렬, 상단 24px) */}
                        <div className="w-[283px] h-[193px] absolute top-6 left-1/2 -translate-x-1/2">
                            {/* 프로필 사진 (좌상단, 96*99) */}
                            <div className="w-[96px] h-[99px] rounded-[12px] overflow-hidden absolute top-0 left-0">
                                <img
                                    src={profileImageUrl}
                                    alt={`${member.name} 프로필`}
                                    className='w-full h-full object-cover'
                                    onError={(e) => {
                                        e.currentTarget.src = defaultProfile;
                                    }}
                                />
                            </div>

                            {/* 하단 283*86 영역 (이름 + 파트 태그) */}
                            <div className="w-[283px] h-[86px] absolute bottom-0 left-0 flex flex-col justify-between">
                                {/* 이름 (좌상단, title-semibold) */}
                                <div className="text-[32px] font-semibold leading-[48px]">
                                    {member.name}
                                </div>

                                {/* 파트 태그 (좌하단) */}
                                <div className="h-[29px] bg-blue-b2 text-blue-b5 px-2 py-0 rounded-[6px] text-capion-medium inline-flex items-center w-fit">
                                    {member.description}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // 1-4기 레이아웃
                    <>
                        {/* 상단 283*193 영역 (중앙 정렬, 상단 24px) */}
                        <div className="w-[283px] h-[193px] absolute top-6 left-1/2 -translate-x-1/2">
                            {/* 프로필 사진 (좌상단, 96*99) */}
                            <div className="w-[96px] h-[99px] rounded-[12px] overflow-hidden absolute top-0 left-0">
                                <img
                                    src={profileImageUrl}
                                    alt={`${member.name} 프로필`}
                                    className='w-full h-full object-cover'
                                    onError={(e) => {
                                        e.currentTarget.src = defaultProfile;
                                    }}
                                />
                            </div>

                            {/* 하단 283*86 영역 (이름) */}
                            <div className="w-[283px] h-[86px] absolute bottom-0 left-0">
                                {/* 이름 (좌상단, title-semibold) */}
                                <div className="text-[32px] font-semibold leading-[48px]">
                                    {member.name}
                                </div>
                            </div>
                        </div>

                        {/* 깃허브 아이콘 (왼쪽 24px, 상단 265px) */}
                        {member.github && (
                            <a
                                href={`https://github.com/${member.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute left-6 top-[265px]"
                            >
                                <img src={iconGithub} alt="Github" className="w-[31px] h-[31px] cursor-pointer opacity-70 hover:opacity-100" />
                            </a>
                        )}
                    </>
                )}
            </div>

            {/* ================= 뒷면 (검은색 설명창) ================= */}
            <div
                className={`absolute inset-0 rounded-[24px] flex flex-col transition-opacity duration-[600ms] ${isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{
                    background: 'linear-gradient(142deg, #020919 0%, #020919 60%, #0B1941 100%)'
                }}
            >

                {isMockup ? (
                    // 5기 뒷면 레이아웃
                    <div className="w-[283px] h-[272px] absolute top-6 left-6 flex flex-col justify-between">
                        {/* 자기소개 텍스트 (좌상단) */}
                        <div className="text-caption-medium text-white overflow-y-auto">
                            <p dangerouslySetInnerHTML={{ __html: member.introduce }} />
                        </div>

                        {/* 이름 + 학과 태그 (좌하단) */}
                        <div className="flex gap-1">
                            <span className="bg-blue-b7 text-blue-b5 px-2 py-1 rounded-[6px] text-capion-medium inline-flex items-center">
                                {member.name}
                            </span>
                            {member.major && (
                                <span className="bg-blue-b7 text-blue-b5 px-2 py-1 rounded-[6px] text-capion-medium inline-flex items-center">
                                    {member.major}
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    // 1-4기 뒷면 레이아웃
                    <div className="w-[283px] h-[272px] absolute top-6 left-6 flex flex-col justify-between">
                        {/* 자기소개 텍스트 (좌상단) */}
                        <div className="text-caption-medium text-white overflow-y-auto">
                            <p dangerouslySetInnerHTML={{ __html: member.introduce }} />
                        </div>

                        {/* 이름 태그 (좌하단) */}
                        <div>
                            <span className="bg-blue-b7 text-blue-b5 px-2 py-1 rounded-[6px] text-capion-medium inline-flex items-center">
                                {member.name}
                            </span>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default MemberCard;