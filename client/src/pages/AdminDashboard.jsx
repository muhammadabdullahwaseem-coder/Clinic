import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStethoscope, faCalendarCheck, faClock, faXmark, faCheck,
  faTrash, faArrowRightFromBracket, faUser, faPhone, faCalendar,
  faFilter, faRefresh,
} from '@fortawesome/free-solid-svg-icons';

const STATUS_COLORS = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  cancelled: 'status-cancelled',
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled'];

function StatCard({ label, value, color }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border shadow-[0_4px_24px_rgba(30,58,95,0.08)] border-gray-100`}>
      <p className="text-[#6B7A90] text-sm font-medium mb-1">{label}</p>
      <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAppointments = useCallback(async () => {
    if (!token) { navigate('/admin'); return; }
    setLoading(true); setError('');
    try {
      const params = filter ? `?status=${filter}` : '';
      const res = await axios.get(`/api/admin/appointments${params}`, authHeaders);
      setAppointments(res.data.data);
      setStats(res.data.stats);
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin'); }
      else setError('Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  }, [filter, token]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axios.patch(`/api/admin/appointments/${id}`, { status }, authHeaders);
      setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      // update stats optimistically
    } catch { setError('Failed to update status.'); }
    finally { setUpdatingId(null); }
  };

  const deleteAppt = async (id) => {
    if (!window.confirm('Delete this appointment? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await axios.delete(`/api/admin/appointments/${id}`, authHeaders);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      fetchAppointments(); // refresh stats
    } catch { setError('Failed to delete appointment.'); }
    finally { setDeletingId(null); }
  };

  const logout = () => { localStorage.removeItem('adminToken'); navigate('/admin'); };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
              <FontAwesomeIcon icon={faStethoscope} className="text-white text-xs" />
            </div>
            <div>
              <span className="font-bold text-[#1E3A5F] text-sm">MediCare</span>
              <span className="text-[#6B7A90] text-xs ml-1">/ Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-[#6B7A90] hover:text-[#1E3A5F] text-sm font-medium transition-colors">View Site</a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-xs" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-[#1E3A5F]">Appointments Dashboard</h1>
          <p className="text-[#6B7A90] text-sm mt-1">Manage and track all patient appointment requests.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Appointments" value={stats.total} color="text-[#1E3A5F]" />
          <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
          <StatCard label="Confirmed" value={stats.confirmed} color="text-green-600" />
          <StatCard label="Cancelled" value={stats.cancelled} color="text-red-600" />
        </div>

        {/* Filters + Refresh */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-[#6B7A90] text-sm" />
            <span className="text-sm font-medium text-gray-600">Filter:</span>
          </div>
          {['', 'pending', 'confirmed', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                filter === s
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
              }`}
            >
              {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button
            onClick={fetchAppointments}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-white transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faRefresh} className="text-xs" /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(30,58,95,0.08)] border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-[#6B7A90]">
              <div className="inline-block w-8 h-8 border-4 border-[#1E3A5F]/20 border-t-[#1E3A5F] rounded-full animate-spin mb-3" />
              <p className="text-sm">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-20 text-center text-[#6B7A90]">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl text-gray-200 mb-3" />
              <p className="font-semibold">No appointments found</p>
              <p className="text-sm mt-1">Appointments submitted via the website will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F4F7FA] border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A90] uppercase tracking-wide">Patient</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A90] uppercase tracking-wide">Phone</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A90] uppercase tracking-wide">Date & Time</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A90] uppercase tracking-wide">Reason</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A90] uppercase tracking-wide">Booked On</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7A90] uppercase tracking-wide">Status</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((a) => (
                    <tr key={a._id} className="hover:bg-[#F4F7FA]/50 transition-colors">
                      {/* Patient */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                            <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
                          </div>
                          <span className="font-semibold text-[#1E3A5F]">{a.fullName}</span>
                        </div>
                      </td>
                      {/* Phone */}
                      <td className="px-5 py-4 text-gray-600">
                        <a href={`tel:${a.phone}`} className="hover:text-[#2E86AB] transition-colors flex items-center gap-1">
                          <FontAwesomeIcon icon={faPhone} className="text-xs text-gray-400" /> {a.phone}
                        </a>
                      </td>
                      {/* Date/Time */}
                      <td className="px-5 py-4 text-gray-600">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCalendar} className="text-xs text-gray-400" />
                            {formatDate(a.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faClock} className="text-xs text-gray-400" />
                            {a.time}
                          </span>
                        </div>
                      </td>
                      {/* Reason */}
                      <td className="px-5 py-4 text-gray-600 max-w-[180px]">
                        <p className="truncate" title={a.reason}>{a.reason}</p>
                      </td>
                      {/* Booked On */}
                      <td className="px-5 py-4 text-gray-500 text-xs">{formatDate(a.createdAt)}</td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={a.status}
                          disabled={updatingId === a._id}
                          onChange={(e) => updateStatus(a._id, e.target.value)}
                          className={`text-xs font-semibold px-3 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[a.status]} disabled:opacity-60`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                      {/* Delete */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => deleteAppt(a._id)}
                          disabled={deletingId === a._id}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
                          title="Delete appointment"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
