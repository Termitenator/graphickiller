"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import Button from "../ui/Button";
import LanguageSwitcher from "../ui/Animation/LanguageSwitcher";

interface NavLink {
  name: string;
  path: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export default function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !menuRef.current) return;

    tl.current = gsap.timeline({ paused: true });

    tl.current.to(menuRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.current.fromTo(
      linksRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out" },
      "-=0.3",
    );

    return () => {
      tl.current?.kill();
    };
  }, [mounted]);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current?.reverse();
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuContent = (
    <div
      ref={menuRef}
      className={`fixed inset-0 bg-black/40 backdrop-filter backdrop-blur-xl border-b border-white/10 z-[100] flex flex-col justify-center px-6 transform -translate-y-full md:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}>
      <nav className="flex flex-col space-y-6 text-center">
        {navLinks.map((link, index) => (
          <div
            key={index}
            ref={(el) => {
              linksRef.current[index] = el;
            }}
            className="overflow-hidden">
            <Link
              href={link.path}
              onClick={toggleMenu}
              className="text-4xl font-bold text-white hover:text-gray-300 transition-colors">
              {link.name}
            </Link>
          </div>
        ))}

        <div
          ref={(el) => {
            linksRef.current[navLinks.length] = el;
          }}
          className="pt-8 flex flex-col items-center gap-6">
          <LanguageSwitcher />

          <Button
            href="#konsultasi"
            variant="solid"
            className="w-full max-w-xs mx-auto"
            onClick={toggleMenu}>
            KONSULTASI
          </Button>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
        aria-expanded={isOpen}>
        {/* PERBAIKAN: Garis hamburger menu diubah menjadi putih (bg-white) agar terlihat di atas bg gelap */}
        <span
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>

      {mounted && createPortal(menuContent, document.body)}
    </>
  );
}
