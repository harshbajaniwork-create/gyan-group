"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { Navlinks } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position - change navbar after scrolling 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "bg-white shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeDropdown}
          >
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="Gyan Group Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`text-xl font-semibold tracking-wide transition-colors duration-500 ${
                isScrolled ? "text-teal-green" : "text-ivory"
              }`}
            >
              Gyan Group
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {Navlinks.map((link) => {
              const hasDropdown = Array.isArray(link.href);
              const isActive = activeDropdown === link.name;

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    hasDropdown && setActiveDropdown(link.name)
                  }
                  onMouseLeave={closeDropdown}
                >
                  {hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex items-center gap-1 font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled
                          ? "text-teal-green hover:text-turquoise-blue"
                          : "text-ivory hover:text-ebony"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href as string}
                      onClick={closeDropdown}
                      className={`font-medium transition-all duration-300 hover:scale-105 ${
                        isScrolled
                          ? "text-teal-green hover:text-turquoise-blue"
                          : "text-ivory hover:text-ebony"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {hasDropdown && (
                    <div
                      className={`absolute top-full left-0 pt-2 w-64 transition-all duration-300 origin-top ${
                        isActive
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white rounded-lg shadow-xl overflow-hidden py-2">
                        {(
                          link.href as Array<{ name: string; href: string }>
                        ).map((subLink, index) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={closeDropdown}
                            className="block px-4 py-3 text-ebony hover:bg-turquoise-blue/10 hover:text-teal-green transition-all duration-200 hover:translate-x-1"
                            style={{
                              animationDelay: `${index * 50}ms`,
                            }}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center transition-colors duration-500 ${
              isScrolled ? "text-teal-green" : "text-ivory"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-current transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-transform duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-xl transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {Navlinks.map((link) => {
            const hasDropdown = Array.isArray(link.href);
            const isActive = activeDropdown === link.name;

            return (
              <div key={link.name}>
                {hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center justify-between w-full text-teal-green font-medium py-2"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ${
                        isActive ? "max-h-96 mt-2" : "max-h-0"
                      }`}
                    >
                      {(link.href as Array<{ name: string; href: string }>).map(
                        (subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block py-2 text-ebony hover:text-turquoise-blue transition-colors"
                          >
                            {subLink.name}
                          </Link>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href as string}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-teal-green font-medium py-2 hover:text-turquoise-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
