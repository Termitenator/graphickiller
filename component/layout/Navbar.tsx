import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import AnimatedText from "../ui/Animation/AnimatedText";
import LanguageSwitcher from "../ui/Animation/LanguageSwitcher";
import GlassBlur from "../ui/GlassBlur";

const navLinks = [
  { name: "LAYANAN", path: "#layanan" },
  { name: "PORTOFOLIO", path: "#portofolio" },
  { name: "PROSES", path: "#proses" },
  { name: "KONTAK", path: "#kontak" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-[110] transition-all duration-300">
      <GlassBlur />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-[90px]">
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 border-[2px] border-white rounded-md">
              <div className="w-3 h-[2px] bg-white"></div>
            </div>
            <AnimatedText
              heightClass="h-[24px]"
              textClass="text-[22px] font-extrabold tracking-tight text-white">
              GraphicKiller
            </AnimatedText>
          </Link>

          <nav className="hidden md:flex flex-1 justify-center space-x-12 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="transition-colors duration-300">
                <AnimatedText textClass="text-[13px] font-bold tracking-[0.15em] text-white/70 hover:text-white">
                  {link.name}
                </AnimatedText>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-8 z-10">
            <LanguageSwitcher />

            <Button href="#konsultasi" variant="solid">
              KONSULTASI
            </Button>
          </div>

          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
