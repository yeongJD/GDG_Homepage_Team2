import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/utils/animations";

type ProfileForm = {
  name: string;
  email: string;
  major: string;
  bio: string;
  stacks: [string, string, string];
  avatarUrl?: string;
};

type Touched = {
  name: boolean;
  major: boolean;
  bio: boolean;
};

const MAX_STACKS = 3;

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
    <div className="flex items-end justify-between">
      <div className="text-[22px] font-semibold leading-[33px] text-[#6D6D6D]">
        {required ? `*${children}` : children}
      </div>
      {rightHint ? (
        <div className="text-sm font-medium text-[#B2B2B2]">{rightHint}</div>
      ) : null}
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

export default function Profile() {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "user@gmail.com",
    major: "",
    bio: "",
    stacks: ["", "", ""],
    avatarUrl: undefined,
  });

 
  const [touched, setTouched] = useState<Touched>({
    name: false,
    major: false,
    bio: false,
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  // 에러분별
  const errors = useMemo(() => {
    return {
      name: form.name.trim().length === 0,
      major: form.major.trim().length === 0,
      bio: form.bio.trim().length === 0,
      // email은 고정이라 보통 에러 체크 제외 (원하면 아래처럼 체크 가능)
      // email: form.email.trim().length === 0,
    };
  }, [form.name, form.major, form.bio]);

  const isValid = useMemo(() => {
    return !errors.name && !errors.major && !errors.bio;
  }, [errors]);

  // 테두리로 오류표시
  const showInvalid = (key: keyof typeof errors) => {
    if (key === "name") return errors.name && (submitAttempted || touched.name);
    if (key === "major") return errors.major && (submitAttempted || touched.major);
    if (key === "bio") return errors.bio && (submitAttempted || touched.bio);
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

  // 오류뜨만 안넘어감
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isValid) {

      return;
    }

    console.log("SAVE PROFILE:", form);
    alert("저장 완료(예시)!");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <motion.div variants={slideUp} className="flex items-center gap-6">
          <h1 className="text-[40px] font-semibold leading-[60px] text-[#2F2F2F]">
            프로필 설정
          </h1>

          {/* 버튼은 눌릴 수 있게 두되, submit에서 막는 방식(요구사항: 진행되지 않게) */}
          <button
            type="submit"
            form="profile-form"
            className="h-[53px] rounded-[12px] bg-[#4774FF] px-6 text-[22px] font-semibold leading-[33px] text-white hover:brightness-95"
          >
            저장하기
          </button>
        </motion.div>

        <motion.div variants={slideUp} className="mt-12">
          <form id="profile-form" onSubmit={onSubmit}>
            {/* 아바타 */}
            <div className="relative mb-10 w-[130px]">
              <div className="h-[130px] w-[130px] overflow-hidden rounded-[12px] bg-[#D8D8D8]">
                {form.avatarUrl ? (
                  <img src={form.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-[#6D6D6D]">
                    <span className="text-sm font-semibold opacity-70">Avatar</span>
                  </div>
                )}
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
                <TextField value={form.email} placeholder="*구글 계정 이메일로 고정" disabled />
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
                  rightHint={<span className="text-[16px] font-medium text-[#B2B2B2]">최대 {MAX_STACKS}개</span>}
                >
                  기술 스택
                </FieldLabel>

                {form.stacks.map((v, i) => (
                  <TextField
                    key={i}
                    value={v}
                    placeholder="깃허브, 구글 드라이브 등 주소를 입력해주세요"
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
  );
}
