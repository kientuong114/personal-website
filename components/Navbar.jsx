"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Publications", path: "/publications" },
    { name: "Talks", path: "/talks" },
    { name: "Contact and Public Keys", path: "/contact" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all border-b-1 border-white duration-300 ${
        isScrolled ? "bg-white/90" : "backdrop-brightness-103"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Navigation Links */}
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-signika font-light text-lg transition-colors ${
                    pathname === item.path
                      ? "text-black font-medium border-b-2 border-black"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://blog.ktruong.dev"
                className="font-signika font-light text-lg text-black/70 hover:text-black transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? "bg-white/90" : "backdrop-brightness-103"
      }`}>
        <div className="flex justify-between items-center h-16 px-4">

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white  transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: '64px' }}
      >
        <div className="flex flex-col items-start justify-start h-full space-y-8 p-8 pt-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeMobileMenu}
              className={`font-signika text-3xl transition-colors ${
                pathname === item.path
                  ? "text-black font-medium"
                  : "text-black/70"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://blog.ktruong.dev"
            className="font-signika text-3xl text-black/70"
            onClick={closeMobileMenu}
          >
            Blog
          </a>
        </div>
      </div>
    </>
  );
}
