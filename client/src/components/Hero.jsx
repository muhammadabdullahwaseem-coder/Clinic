import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faListUl, faAward, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-bg min-h-screen flex flex-col justify-center pt-16 relative">
      {/* Decorative circles */}
      <div
        className="absolute w-64 h-64 rounded-full -top-16 -right-16 opacity-60"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      />
      <div
        className="absolute w-96 h-96 rounded-full -bottom-24 -left-24 opacity-40"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <div className="pulse-dot rounded-full bg-green-400" style={{ width: 10, height: 10, flexShrink: 0 }} />
            <span className="text-white/90 text-xs font-medium">Accepting New Patients</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Your Health,
            <br />
            <span style={{ color: '#3EA8CF' }}>Our Priority</span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl font-medium mb-2">
            Dr. Ahmed Raza — MBBS, FCPS
          </p>
          <p className="text-white/65 text-base mb-8">
            General Physician &amp; Family Medicine Specialist, providing compassionate and expert care for every patient.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => scrollTo('#appointment')}
              className="flex items-center gap-2 px-7 py-3 rounded-lg bg-white text-[#1E3A5F] font-bold text-sm shadow-lg hover:bg-[#2E86AB] hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="text-xs" />
              Book Appointment
            </button>
            <button
              onClick={() => scrollTo('#services')}
              className="flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-white/70 text-white font-semibold text-sm hover:bg-white/10 hover:border-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <FontAwesomeIcon icon={faListUl} className="text-xs" />
              Our Services
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: faAward, title: '10+ Years', sub: 'Experience' },
              { icon: faUsers, title: '5000+ Patients', sub: 'Treated Successfully' },
              { icon: faClock, title: 'Mon – Sat', sub: '10AM – 8PM' },
            ].map((b) => (
              <div
                key={b.title}
                className="trust-badge flex items-center gap-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#2E86AB]/30 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={b.icon} className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{b.title}</p>
                  <p className="text-white/60 text-xs">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 80L60 69.3C120 59 240 37 360 32C480 27 600 37 720 48C840 59 960 69 1080 69.3C1200 69 1320 59 1380 53.3L1440 48V80H0Z"
            fill="#fff"
          />
        </svg>
      </div>
    </section>
  );
}
