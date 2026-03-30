import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faPhone, faClock, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons';

const TIMES = [
  '10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM',
  '03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM',
];

const init = { fullName: '', phone: '', date: '', time: '', reason: '' };
const initErr = { fullName: '', phone: '', date: '', time: '', reason: '' };

export default function AppointmentForm() {
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState(initErr);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [apiError, setApiError] = useState('');
  const ref = useRef(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = { ...initErr };
    let valid = true;
    if (!form.fullName.trim()) { e.fullName = 'Full name is required.'; valid = false; }
    if (!form.phone.trim() || !/^[\d\-\+\s]{7,}$/.test(form.phone.trim())) { e.phone = 'Enter a valid phone number.'; valid = false; }
    if (!form.date) { e.date = 'Please select a date.'; valid = false; }
    if (!form.time) { e.time = 'Please select a time.'; valid = false; }
    if (!form.reason.trim()) { e.reason = 'Please describe the reason for your visit.'; valid = false; }
    setErrors(e);
    return valid;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setApiError('');
    try {
      await axios.post('/api/appointments', form);
      setStatus('success');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const reset = () => { setForm(init); setErrors(initErr); setStatus('idle'); setApiError(''); };

  return (
    <section id="appointment" className="py-20 bg-[#F4F7FA]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="fade-in">
            <span className="inline-block text-[#2E86AB] text-xs font-bold uppercase tracking-widest mb-3">Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mb-4 leading-tight">Book an Appointment</h2>
            <p className="text-[#6B7A90] text-base leading-relaxed mb-8">
              Fill out the form and our team will call you back to confirm. Same-day slots are often available.
            </p>
            <div className="space-y-5">
              {[
                { icon: faPhone, label: 'Call Us', content: <a href="tel:03000000000" className="font-semibold text-[#1E3A5F] hover:text-[#2E86AB] transition-colors">0300-0000000</a> },
                { icon: faClock, label: 'Clinic Hours', content: <p className="font-semibold text-[#1E3A5F] text-sm">Mon–Sat: 10AM–8PM &nbsp;|&nbsp; Sun: 11AM–3PM</p> },
                { icon: faLocationDot, label: 'Address', content: <p className="font-semibold text-[#1E3A5F] text-sm">24-B Gulberg II, Lahore</p> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7A90] font-medium">{item.label}</p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="fade-in">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.08)] p-8 border border-gray-100">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E3A5F] text-xl mb-1">Appointment Booked!</h3>
                    <p className="text-[#6B7A90] text-sm">We'll call you to confirm your slot. Thank you for choosing MediCare Clinic.</p>
                  </div>
                  <button onClick={reset} className="mt-2 text-[#2E86AB] text-sm font-semibold hover:underline cursor-pointer">
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Muhammad Ali"
                        className={`form-input w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-[#F4F7FA] ${errors.fullName ? 'border-red-400' : 'border-gray-200'}`} />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number <span className="text-red-500">*</span></label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 0300-1234567" type="tel"
                        className={`form-input w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-[#F4F7FA] ${errors.phone ? 'border-red-400' : 'border-gray-200'}`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Date <span className="text-red-500">*</span></label>
                        <input name="date" type="date" min={today} value={form.date} onChange={handleChange}
                          className={`form-input w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-[#F4F7FA] ${errors.date ? 'border-red-400' : 'border-gray-200'}`} />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Time <span className="text-red-500">*</span></label>
                        <select name="time" value={form.time} onChange={handleChange}
                          className={`form-input w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-[#F4F7FA] ${errors.time ? 'border-red-400' : 'border-gray-200'}`}>
                          <option value="">Select</option>
                          {TIMES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                      </div>
                    </div>
                    {/* Reason */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Reason for Visit <span className="text-red-500">*</span></label>
                      <textarea name="reason" value={form.reason} onChange={handleChange} rows={3} placeholder="Briefly describe your concern..."
                        className={`form-input w-full border rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-[#F4F7FA] resize-none ${errors.reason ? 'border-red-400' : 'border-gray-200'}`} />
                      {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                    </div>
                    {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full py-3 rounded-lg bg-[#1E3A5F] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2A5080] transition-colors shadow-sm disabled:opacity-60 cursor-pointer mt-2">
                      <FontAwesomeIcon icon={faCalendarCheck} className="text-xs" />
                      {status === 'loading' ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
