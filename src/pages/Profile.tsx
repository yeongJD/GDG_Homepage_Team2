import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/utils/animations";
import Avatar from "@/assets/profile.svg";
import { MemberRole } from "@/types/profile.types";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

type ProfileForm = {
  name: string;
  email: string;
  major: string;
  bio: string;
  memberRole: MemberRole;
  stacks: [string, string, string];
  avatarUrl?: string;
};

type Touched = {
  name: boolean;
  major: boolean;
  bio: boolean;
  memberRole: boolean;
};

const MAX_STACKS = 3;

const roleOptions = [
  { label: 'Lead', value: 'LEAD' },
  { label: 'Core', value: 'CORE' },
  { label: 'Devrel', value: 'DEVREL' },
  { label: 'Member', value: 'MEMBER' },
];

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 7L17 17M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 7l1.2-2h3.6L15 7h2a3 3 0 013 3v7a3 3 0 01-3 3H7a3 3 0 01-3-3v-7a3 3 0 013-3h2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 17a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 9L12 15L18 9" stroke="#6D6D6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FieldLabel({
  children,
  required,
  rightHint,
}: {
  children: React.ReactNode;
  required?: boolean;
  rightHint?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3"> {/* gap-0이면 완전 붙음 */}
      <div className="text-[22px] font-semibold leading-[33px] text-[#6D6D6D]">
        {required ? `*${children}` : children}
      </div>
      {rightHint ? <div className="text-[16px] font-medium text-[#B2B2B2]">{rightHint}</div> : null}
    </div>
  );
}

function TextField({
  value,
  placeholder,
  disabled,
  invalid,
  onChange,
  onClear,
  onBlur,
}: {
  value: string;
  placeholder: string;
  disabled?: boolean;
  invalid?: boolean;
  onChange?: (v: string) => void;
  onClear?: () => void;
  onBlur?: () => void;
}) {
  const showClear = !disabled && value.length > 0 && !!onClear;

  return (
    <div
      className={[
        "relative h-[79px] w-full rounded-[12px] bg-white",
        invalid ? "border border-[#FF4D4F]" : "border border-[#D8D8D8]",
        disabled ? "opacity-70" : "",
      ].join(" ")}
    >
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={[
          "h-full w-full rounded-[12px] bg-transparent px-6 pr-14 text-[22px] font-medium leading-[33px]",
          "placeholder:text-[#B2B2B2] text-[#2F2F2F] outline-none",
          disabled ? "cursor-not-allowed" : "",
        ].join(" ")}
      />

      <button
        type="button"
        onClick={onClear}
        disabled={!showClear}
        className={[
          "absolute right-4 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full",
          showClear ? "text-[#B2B2B2] hover:bg-black/5" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-label="clear"
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function SelectField({
  value,
  options,
  placeholder,
  invalid,
  onChange,
  onBlur,
}: {
  value: string;
  options: { label: string; value: string }[];
  placeholder: string;
  invalid?: boolean;
  onChange?: (v: string) => void;
  onBlur?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 200);
          onBlur?.();
        }}
        className={[
          "h-[79px] w-full rounded-[12px] bg-white px-6 text-left flex items-center justify-between",
          "text-[22px] font-medium leading-[33px]",
          invalid ? "border border-[#FF4D4F]" : "border border-[#D8D8D8]",
          value ? "text-[#2F2F2F]" : "text-[#B2B2B2]",
        ].join(" ")}
      >
        {options.find(opt => opt.value === value)?.label || placeholder}
        <ChevronIcon className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-[12px] border bg-white shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}
              className="w-full px-6 py-4 text-left text-[20px] hover:bg-gray-50 text-[#2F2F2F]"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const { profile, loading, updateProfile } = useProfile();
  const { user } = useAuth();
  
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    major: "",
    bio: "",
    memberRole: "MEMBER",
    stacks: ["", "", ""],
    avatarUrl: undefined,
  });

  // 데이터 로드 및 초기화
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        email: profile.email ?? "",
        major: profile.major ?? "",
        bio: profile.bio ?? "",
        memberRole: profile.memberRole ?? "MEMBER",
        stacks: [
          (profile.stacks && profile.stacks[0]) ?? "",
          (profile.stacks && profile.stacks[1]) ?? "",
          (profile.stacks && profile.stacks[2]) ?? "",
        ],
        avatarUrl: profile.imageUrl ?? undefined,
      });
    } else if (user && !loading) {
      // 프로필이 없는 경우(신규 유저 등), 기본 유저 정보로 프리필
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.username || "",
        avatarUrl: prev.avatarUrl || user.imageUrl || undefined,
      }));
    }
  }, [profile, user, loading]);

  // ✅ 유효성 표시를 위한 상태들
  const [touched, setTouched] = useState<Touched>({
    name: false,
    major: false,
    bio: false,
    memberRole: false,
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  // ✅ 에러 상태 계산 (필수만)
  const errors = useMemo(() => {
    return {
      name: form.name.trim().length === 0,
      major: form.major.trim().length === 0,
      bio: form.bio.trim().length === 0,
      memberRole: !form.memberRole,
    };
  }, [form.name, form.major, form.bio, form.memberRole]);

  const isValid = useMemo(() => {
    return !errors.name && !errors.major && !errors.bio && !errors.memberRole;
  }, [errors]);

  // ✅ 빨간 테두리 노출 조건: (submit 한번 눌렀거나) (해당 필드가 touched)
  const showInvalid = (key: keyof typeof errors) => {
    if (key === "name") return errors.name && (submitAttempted || touched.name);
    if (key === "major") return errors.major && (submitAttempted || touched.major);
    if (key === "bio") return errors.bio && (submitAttempted || touched.bio);
    if (key === "memberRole") return errors.memberRole && (submitAttempted || touched.memberRole);
    return false;
  };

  const setField = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setStackAt = (idx: number, value: string) => {
    setForm((prev) => {
      const next = [...prev.stacks] as ProfileForm["stacks"];
      next[idx] = value;
      return { ...prev, stacks: next };
    });
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickAvatar = () => fileInputRef.current?.click();

  const onAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, avatarUrl: url }));
  };

  // ✅ 저장(Submit) 시 검증 실패면 진행 막기
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) {
      return;
    }

    const memberId = profile?.memberId ?? user?.memberId;
    if (!memberId) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    const result = await updateProfile({
      memberId: memberId,
      name: form.name,
      major: form.major,
      bio: form.bio,
      imageUrl: form.avatarUrl || profile?.imageUrl || "",
      stacks: form.stacks.filter(s => s.trim().length > 0),
      memberRole: form.memberRole,
    });

    if (result.success) {
      alert("저장 완료!");
    } else {
      alert(`저장 실패: ${result.error}`);
    }
  };

  if (loading && !profile) {
    return <div className="flex h-[50vh] w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full">
      {/* ✅ 이 div가 “가운데 정렬 래퍼” */}
      <div className="mx-auto w-full max-w-[1040px] px-4 py-16">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <motion.div variants={slideUp} className="flex items-center gap-6">
            <h1 className="text-[40px] font-semibold leading-[60px] text-[#2F2F2F]">
              프로필 설정
            </h1>

            {/* 버튼은 눌릴 수 있게 두되, submit에서 막는 방식(요구사항: 진행되지 않게) */}
            <button
              type="submit"
              form="profile-form"
              disabled={loading}
              className="h-[53px] rounded-[12px] bg-[#4774FF] px-6 text-[22px] font-semibold leading-[33px] text-white hover:brightness-95 disabled:opacity-50"
            >
              {loading ? '저장 중...' : '저장하기'}
            </button>
          </motion.div>

          <motion.div variants={slideUp} className="mt-12">
            <form id="profile-form" onSubmit={onSubmit}>
              {/* 아바타 */}
              <div className="relative mb-10 w-[130px]">
                <div className="h-[130px] w-[130px] overflow-hidden rounded-[12px]">
                  <img
                    src={form.avatarUrl ?? Avatar}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <button
                  type="button"
                  onClick={onPickAvatar}
                  className="absolute -right-4 -bottom-4 grid h-[49px] w-[49px] place-items-center rounded-full border border-white bg-[#F3F3F3] shadow-sm hover:brightness-95"
                  aria-label="upload avatar"
                >
                  <CameraIcon className="h-6 w-6 text-[#6D6D6D]" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarChange}
                />
              </div>

              <div className="flex w-full max-w-[1040px] flex-col gap-6">
                {/* 이름 */}
                <div className="flex flex-col gap-3">
                  <FieldLabel required>이름</FieldLabel>
                  <TextField
                    value={form.name}
                    placeholder="이름을 입력해주세요"
                    invalid={showInvalid("name")}
                    onChange={(v) => setField("name", v)}
                    onClear={() => setField("name", "")}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  />
                </div>

                {/* 이메일 (고정) */}
                <div className="flex flex-col gap-3">
                  <FieldLabel required>이메일</FieldLabel>
                  <TextField value={form.email} placeholder="구글 계정 이메일" disabled />
                </div>

                {/* 학과/전공 */}
                <div className="flex flex-col gap-3">
                  <FieldLabel required>학과 or 전공</FieldLabel>
                  <TextField
                    value={form.major}
                    placeholder="학과 또는 전공을 입력해주세요"
                    invalid={showInvalid("major")}
                    onChange={(v) => setField("major", v)}
                    onClear={() => setField("major", "")}
                    onBlur={() => setTouched((t) => ({ ...t, major: true }))}
                  />
                </div>

                {/* 역할 */}
                <div className="flex flex-col gap-3">
                  <FieldLabel required>역할</FieldLabel>
                  <SelectField
                    value={form.memberRole}
                    options={roleOptions}
                    placeholder="역할을 선택해주세요"
                    invalid={showInvalid("memberRole")}
                    onChange={(v) => setField("memberRole", v as MemberRole)}
                    onBlur={() => setTouched((t) => ({ ...t, memberRole: true }))}
                  />
                </div>

                {/* 설명 */}
                <div className="flex flex-col gap-3">
                  <FieldLabel required>설명</FieldLabel>
                  <TextField
                    value={form.bio}
                    placeholder="설명을 추가해주세요 (ex. 안녕하세요! 1년동안 즐거운 시간 보내면 좋겠습니다.)"
                    invalid={showInvalid("bio")}
                    onChange={(v) => setField("bio", v)}
                    onClear={() => setField("bio", "")}
                    onBlur={() => setTouched((t) => ({ ...t, bio: true }))}
                  />
                </div>

                {/* 기술 스택 */}
                <div className="flex flex-col gap-3">
                  <FieldLabel
                    rightHint={
                      <span className="relative -top-[2px] text-[16px] font-medium text-[#B2B2B2]">
                        최대 {MAX_STACKS}개
                      </span>
                    }
                  >
                    기술 스택
                  </FieldLabel>

                  {form.stacks.map((v, i) => (
                    <TextField
                      key={i}
                      value={v}
                      placeholder="기술 스택을 입력해주세요 (ex. React, Spring Boot)"
                      onChange={(next) => setStackAt(i, next)}
                      onClear={() => setStackAt(i, "")}
                    />
                  ))}
                </div>

                {/* (선택) 하단에 간단한 안내문구 넣고 싶으면 */}
                {!isValid && submitAttempted ? (
                  <p className="mt-2 text-sm font-medium text-[#FF4D4F]">
                    필수 항목(*)을 모두 입력해주세요.
                  </p>
                ) : null}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}