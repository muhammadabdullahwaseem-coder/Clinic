import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faMicroscope, faTags, faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const features = [
  { icon: faUserDoctor, title: 'Experienced Doctor', desc: 'Over a decade of clinical expertise in general and family medicine.' },
  { icon: faMicroscope, title: 'Modern Equipment', desc: 'State-of-the-art diagnostic tools and up-to-date medical technology.' },
  { icon: faTags, title: 'Affordable Fees', desc: 'Transparent pricing with no hidden charges — quality care within reach.' },
  { icon: faFaceSmile, title: 'Friendly Staff', desc: 'Warm, caring team dedicated to making every visit comfortable and stress-free.' },
];

export default function WhyUs() {
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
    <section id="why-us" className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 fade-in">
          <span className="inline-block text-[#2E86AB] text-xs font-bold uppercase tracking-widest mb-3">Why Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mb-3">Why Choose MediCare?</h2>
          <p className="text-[#6B7A90] text-base max-w-xl mx-auto">
            We deliver healthcare that you can trust — built on expertise, compassion, and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="feature-card bg-[#F4F7FA] rounded-2xl p-7 text-center fade-in border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-[#1E3A5F] flex items-center justify-center mx-auto mb-5 shadow-md">
                <FontAwesomeIcon icon={f.icon} className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-[#1E3A5F] text-lg mb-2">{f.title}</h3>
              <p className="text-[#6B7A90] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
