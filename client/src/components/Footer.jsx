import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Doctor', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Book Appointment', href: '#appointment' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#152B47] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#2E86AB] flex items-center justify-center shadow">
                <FontAwesomeIcon icon={faStethoscope} className="text-white text-sm" />
              </div>
              <span className="font-bold text-lg">MediCare Clinic</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your trusted partner in health — delivering expert, compassionate medical care for every family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/70">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/70">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/50">
                <FontAwesomeIcon icon={faLocationDot} className="w-4" />
                24-B Gulberg II, Lahore
              </li>
              <li className="flex items-center gap-2 text-white/50">
                <FontAwesomeIcon icon={faPhone} className="w-4" />
                <a href="tel:03000000000" className="hover:text-white transition-colors">0300-0000000</a>
              </li>
              <li className="flex items-center gap-2 text-white/50">
                <FontAwesomeIcon icon={faClock} className="w-4" />
                Mon–Sat: 10AM–8PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} MediCare Clinic. All rights reserved.</p>
          <p className="text-white/30 text-xs">Dr. Ahmed Raza — MBBS, FCPS | General Physician</p>
        </div>
      </div>
    </footer>
  );
}
