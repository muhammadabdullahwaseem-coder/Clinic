import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Appointments', href: '#appointment' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_20px_rgba(30,58,95,0.12)]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#1E3A5F] flex items-center justify-center shadow-md group-hover:bg-[#2E86AB] transition-colors">
              <FontAwesomeIcon icon={faStethoscope} className="text-white text-sm" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#1E3A5F] text-base leading-tight">MediCare</p>
              <p className="text-[10px] font-medium text-[#6B7A90] leading-none">Clinic</p>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className={`nav-link text-sm font-medium text-gray-700 hover:text-[#1E3A5F] transition-colors cursor-pointer ${
                  active === l.href.slice(1) ? 'active text-[#1E3A5F]' : ''
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#appointment')}
              className="ml-2 px-5 py-2 rounded-lg bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#2A5080] transition-colors shadow-sm cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-[#1E3A5F]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#F4F7FA] hover:text-[#1E3A5F] transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#appointment')}
            className="mt-1 py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-[#1E3A5F] text-center cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}
