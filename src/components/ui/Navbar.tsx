'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Beranda' },
  { href: '#services', label: 'Layanan' },
  { href: '#about', label: 'Tentang' },
  { href: '#contact', label: 'Kontak' },
];

const languages = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: 'ZH' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('id');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/80 backdrop-blur-md border-b border-[#1d3a6a]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl font-sora">JV</span>
            </div>
            <span className="text-white font-bold text-xl font-sora">JVTech</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#00D4FF] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-[#00D4FF] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{currentLang.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-[#112240] border border-[#1d3a6a] rounded-lg overflow-hidden shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-[#1d3a6a] transition-colors ${
                        currentLang === lang.code ? 'text-[#00D4FF]' : 'text-gray-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00D4FF]/25 transition-all duration-300"
            >
              Konsultasi
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#1d3a6a]/50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-gray-300 hover:text-[#00D4FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#0099CC] text-white font-semibold rounded-full text-center"
            >
              Konsultasi
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
