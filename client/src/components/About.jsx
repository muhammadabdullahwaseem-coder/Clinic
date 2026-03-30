import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserDoctor, faGraduationCap, faCertificate, faHospital, faHeart, faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function About() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Avatar */}
          <div className="fade-in flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-[#F4F7FA] flex items-center justify-center shadow-[0_4px_24px_rgba(30,58,95,0.08)] border border-gray-100">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-28 h-28 rounded-full bg-[#1E3A5F] flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faUserDoctor} className="text-white text-5xl mt-2" />
                  </div>
                  <div className="text-center px-4">
                    <p className="font-bold text-[#1E3A5F] text-lg">Dr. Ahmed Raza</p>
                    <p className="text-[#6B7A90] text-xs font-medium">MBBS, FCPS</p>
                  </div>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1E3A5F] rounded-2xl shadow-lg px-4 py-3 text-center">
                <p className="text-white font-extrabold text-2xl leading-none">10+</p>
                <p className="text-white/70 text-xs font-medium mt-0.5">Years Exp.</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="fade-in">
            <span className="inline-block text-[#2E86AB] text-xs font-bold uppercase tracking-widest mb-3">About the Doctor</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mb-4 leading-tight">Meet Dr. Ahmed Raza</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Dr. Ahmed Raza is a highly qualified General Physician and Family Medicine Specialist with over a decade of clinical experience. He earned his MBBS from King Edward Medical University and completed his FCPS in Family Medicine, bringing world-class expertise to every consultation. His patient-first approach has earned the trust of thousands of families across Lahore.
            </p>
            <ul className="space-y-3 text-sm text-gray-700 mb-8">
              {[
                { icon: faGraduationCap, text: <><strong>MBBS</strong> – King Edward Medical University, Lahore</> },
                { icon: faCertificate, text: <><strong>FCPS (Family Medicine)</strong> – College of Physicians &amp; Surgeons Pakistan</> },
                { icon: faHospital, text: <>Former Senior Registrar at <strong>Services Hospital Lahore</strong></> },
                { icon: faHeart, text: <>Holistic, evidence-based care with a focus on <strong>preventive medicine</strong></> },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2E86AB]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={item.icon} className="text-[#2E86AB] text-xs" />
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#2A5080] transition-colors shadow-sm cursor-pointer"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="text-xs" /> Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
