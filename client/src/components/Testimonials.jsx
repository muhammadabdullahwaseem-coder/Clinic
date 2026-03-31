import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const reviews = [
  {
    name: 'Hina K.', location: 'Gulberg, Lahore', stars: 5,
    text: '"Dr. Ahmed is incredibly thorough and patient. He took the time to explain everything and didn\'t rush me out. My blood pressure is finally under control after months of struggling. Highly recommended!"',
  },
  {
    name: 'Tariq M.', location: 'Model Town, Lahore', stars: 5,
    text: '"Brought my children here for vaccinations and the entire experience was smooth and stress-free. The staff are so welcoming and the doctor was brilliant with the kids. We won\'t go anywhere else."',
  },
  {
    name: 'Sara A.', location: 'DHA, Lahore', stars: 4.5,
    text: '"The home visit service is a lifesaver! My elderly mother couldn\'t make it to the clinic and Dr. Raza came over and was absolutely professional. Fees are very reasonable too. Will definitely recommend."',
  },
];

function Stars({ count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
      ))}
      <FontAwesomeIcon icon={count === 5 ? faStar : faStarHalfAlt} className="text-yellow-400 text-sm" />
    </div>
  );
}

export default function Testimonials() {
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
    <section id="testimonials" className="py-20 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 fade-in">
          <span className="inline-block text-[#2E86AB] text-xs font-bold uppercase tracking-widest mb-3">Patient Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mb-3">What Our Patients Say</h2>
          <p className="text-[#6B7A90] text-base max-w-xl mx-auto">Hearing from the people we care for is our greatest reward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="testimonial-card bg-[#F4F7FA] border border-gray-100 rounded-2xl p-7 fade-in">
              <Stars count={r.stars} />
              <p className="text-gray-600 text-sm leading-relaxed my-4">{r.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
                </div>
                <div>
                  <p className="font-semibold text-[#1E3A5F] text-sm">{r.name}</p>
                  <p className="text-[#6B7A90] text-xs">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
