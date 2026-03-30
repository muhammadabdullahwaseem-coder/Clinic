import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStethoscope, faBaby, faSyringe, faHeartbeat, faFlask, faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';

const services = [
  { icon: faStethoscope, title: 'General Checkup', desc: 'Thorough head-to-toe examination to assess your overall health and catch issues early.' },
  { icon: faBaby, title: 'Child Healthcare', desc: 'Pediatric consultations, growth monitoring, and illness management for children of all ages.' },
  { icon: faSyringe, title: 'Vaccinations', desc: 'Recommended immunizations for children and adults following the latest health guidelines.' },
  { icon: faHeartbeat, title: 'Chronic Disease Management', desc: 'Ongoing care for diabetes, hypertension, asthma, and other long-term conditions.' },
  { icon: faFlask, title: 'Lab Tests', desc: 'In-house diagnostic lab for blood work, urine analysis, and other essential tests.' },
  { icon: faHouseMedical, title: 'Home Visits', desc: 'Doctor visits at your doorstep for patients who are unable to travel to the clinic.' },
];

export default function Services() {
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
    <section id="services" className="py-20 bg-[#F4F7FA]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 fade-in">
          <span className="inline-block text-[#2E86AB] text-xs font-bold uppercase tracking-widest mb-3">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mb-3">Our Services</h2>
          <p className="text-[#6B7A90] text-base max-w-xl mx-auto">
            Comprehensive medical care tailored to every stage of life — for you and your entire family.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="service-card bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.08)] p-7 fade-in border border-gray-50">
              <div className="icon-wrap w-12 h-12 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center mb-5 text-[#1E3A5F]">
                <FontAwesomeIcon icon={s.icon} className="text-xl" />
              </div>
              <h3 className="font-bold text-[#1E3A5F] text-lg mb-2">{s.title}</h3>
              <p className="text-[#6B7A90] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
