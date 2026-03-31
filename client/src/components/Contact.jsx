import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const hours = [
  { day: 'Monday – Friday', time: '10:00 AM – 8:00 PM' },
  { day: 'Saturday', time: '10:00 AM – 8:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 3:00 PM' },
];

export default function Contact() {
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
    <section id="contact" className="py-20 bg-[#F4F7FA]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 fade-in">
          <span className="inline-block text-[#2E86AB] text-xs font-bold uppercase tracking-widest mb-3">Find Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mb-3">Contact & Location</h2>
          <p className="text-[#6B7A90] text-base max-w-xl mx-auto">We're conveniently located in Gulberg II, Lahore and available 6 days a week.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <div className="fade-in space-y-5">
            {/* Address */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.08)] p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1E3A5F] flex items-center justify-center flex-shrink-0 shadow-sm">
                <FontAwesomeIcon icon={faLocationDot} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F] mb-1">Address</p>
                <p className="text-gray-600 text-sm">24-B Gulberg II, Lahore, Punjab, Pakistan</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.08)] p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1E3A5F] flex items-center justify-center flex-shrink-0 shadow-sm">
                <FontAwesomeIcon icon={faPhone} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1E3A5F] mb-1">Phone</p>
                {/* REPLACE WITH REAL PHONE NUMBER */}
                <a href="tel:03000000000" className="text-[#2E86AB] font-semibold hover:underline">0300-0000000</a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.08)] p-6 border border-gray-100 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#1E3A5F] flex items-center justify-center flex-shrink-0 shadow-sm">
                <FontAwesomeIcon icon={faClock} className="text-white" />
              </div>
              <div className="w-full">
                <p className="font-semibold text-[#1E3A5F] mb-3">Clinic Hours</p>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {hours.map((h) => (
                      <tr key={h.day}>
                        <td className="py-1.5 text-gray-600">{h.day}</td>
                        <td className="py-1.5 text-right font-medium text-[#1E3A5F]">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* WhatsApp */}
            {/* REPLACE WITH REAL PHONE NUMBER */}
            <a
              href="https://wa.me/923000000000?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-lg" /> Chat on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="fade-in">
            <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(30,58,95,0.08)] border border-gray-200 bg-white h-full min-h-80">
              <iframe
                title="MediCare Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.405!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 12, marginTop: 16, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
