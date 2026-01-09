
import footerLogo from "@/assets/fe195079098a23b82f9db4dc6860eaf315cfd2f7.png";
import dividerImg from "@/assets/Frame 2147226076.svg"

const Footer = () => {
  return (
    <footer className="h-[237px] w-full bg-blue-b9 text-white mt-auto">
      <div className="mx-auto flex w-full max-w-[1040px] items-center justify-between px-8 py-20 mt-4">
        {/* Left: Logo */}
        <img src={footerLogo} alt="GDG On Campus" className="h-[45px] w-auto" />

        {/* Right: Links */}
        <nav className="flex items-center gap-3 text-[16px] font-medium leading-[24px]">
          <a
            href="https://www.instagram.com/gdgoc_seoultech/" 
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            Instagram
          </a>

<img
  src={dividerImg}
  alt=""
  aria-hidden="true"
  className="h-6 w-auto opacity-80"
/>

          <a
            href="https://github.com/yeongJD/GDG_Homepage_Team2"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;


