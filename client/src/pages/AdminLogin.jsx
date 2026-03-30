import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faLock } from '@fortawesome/free-solid-svg-icons';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) { setError('Please enter the admin password.'); return; }
    setLoading(true); setError('');
    try {
      const res = await axios.post('/api/admin/login', { password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#1E3A5F] flex items-center justify-center shadow-lg mb-3">
            <FontAwesomeIcon icon={faStethoscope} className="text-white text-2xl" />
          </div>
          <h1 className="font-bold text-[#1E3A5F] text-2xl">MediCare Clinic</h1>
          <p className="text-[#6B7A90] text-sm mt-1">Admin Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.10)] p-8 border border-gray-100">
          <h2 className="font-bold text-[#1E3A5F] text-xl mb-1">Sign In</h2>
          <p className="text-[#6B7A90] text-sm mb-6">Enter the admin password to continue.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  className={`form-input w-full border rounded-lg pl-4 pr-10 py-2.5 text-sm text-gray-800 bg-[#F4F7FA] ${error ? 'border-red-400' : 'border-gray-200'}`}
                />
                <FontAwesomeIcon icon={faLock} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#1E3A5F] text-white text-sm font-bold hover:bg-[#2A5080] transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-blue-700 text-xs text-center">
              Default password: <strong>admin123</strong><br />
              <span className="text-blue-500">Change this in your <code>.env</code> file before deploying.</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-[#6B7A90]">
          <a href="/" className="text-[#2E86AB] hover:underline">← Back to Website</a>
        </p>
      </div>
    </div>
  );
}
