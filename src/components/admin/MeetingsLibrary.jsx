import React, { useState, useMemo } from 'react';
import { meetings } from '../../data/mockData';
import { DataTable } from '../shared/DataTable';
import { Filter, Search, X } from 'lucide-react';

export function MeetingsLibrary({ onMeetingSelect, selectedMeeting }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filteredMeetings = useMemo(() => {
    return meetings.filter(m => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        (m.host || '').toLowerCase().includes(searchLower) ||
        (m.type || '').toLowerCase().includes(searchLower) ||
        (m.id || '').toLowerCase().includes(searchLower) ||
        (m.status || '').toLowerCase().includes(searchLower);

      // Status
      const matchesStatus = statusFilter === 'All' || m.status === statusFilter;

      // Type
      const matchesType = typeFilter === 'All' || m.type === typeFilter;

      // Payment
      const matchesPayment = paymentFilter === 'All' || (paymentFilter === 'Paid' ? m.isPaid : !m.isPaid);

      return matchesSearch && matchesStatus && matchesType && matchesPayment;
    });
  }, [searchTerm, statusFilter, typeFilter, paymentFilter]);

  const clearFilters = () => {
    setStatusFilter('All');
    setTypeFilter('All');
    setPaymentFilter('All');
    setSearchTerm('');
  };

  const activeFiltersCount = (statusFilter !== 'All' ? 1 : 0) + (typeFilter !== 'All' ? 1 : 0) + (paymentFilter !== 'All' ? 1 : 0);

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (m) => <span className="font-mono text-xs text-slate-500">{m.id}</span>
    },
    {
      key: 'session',
      label: 'Session & Date',
      render: (m) => {
        if (m.sessions && m.sessions.length > 1) {
          return (
            <div>
              <div className="font-medium text-slate-800">{m.sessions.length} Sessions</div>
              <div className="text-xs text-slate-500">{new Date(m.date).toLocaleDateString()}</div>
            </div>
          );
        }
        return (
          <div>
            <div className="font-medium text-slate-800">Session {m.session || 1}</div>
            <div className="text-xs text-slate-500">{new Date(m.date).toLocaleDateString()} {new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        );
      }
    },
    {
      key: 'type',
      label: 'Type',
      render: (m) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
          {m.type}
        </span>
      )
    },
    {
      key: 'host',
      label: 'Host',
      render: (m) => <span className="text-sm font-medium text-slate-700">{m.host}</span>
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (m) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m.isPaid ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
          {m.isPaid ? 'Paid' : 'Free'}
        </span>
      )
    },
    { key: 'duration', label: 'Duration', className: 'text-slate-600 font-medium' },
    {
      key: 'status',
      label: 'Status',
      render: (m) => {
        const statusColors = {
          Scheduled: 'bg-blue-100 text-blue-800',
          Completed: 'bg-emerald-100 text-emerald-800',
          Cancelled: 'bg-red-100 text-red-800'
        };
        const statusClass = statusColors[m.status] || 'bg-slate-100 text-slate-800';
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
            {m.status || 'Unknown'}
          </span>
        );
      }
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">All Meetings</h2>
          <p className="text-slate-500">View and manage all your past and upcoming meetings.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-slate-50 outline-none"
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-slate-500 hover:text-slate-700 font-medium"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${showFilters || activeFiltersCount > 0
              ? 'border-primary text-primary bg-indigo-50'
              : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
              }`}
          >
            <Filter size={16} /> Filters {activeFiltersCount > 0 && <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-in">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Status</label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Meeting Type</label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Meeting">Meeting</option>
              <option value="Webinar">Webinar</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Payment</label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="All">All (Paid & Free)</option>
              <option value="Paid">Paid</option>
              <option value="Free">Free</option>
            </select>
          </div>
        </div>
      )}

      {filteredMeetings.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-1">No meetings found</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            We couldn't find any meetings matching your current filters. Try adjusting your search or clearing the filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-6 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredMeetings}
          onRowClick={(row) => onMeetingSelect && onMeetingSelect(row)}
          selectedRowId={selectedMeeting?.id}
        />
      )}
    </div>
  );
}
