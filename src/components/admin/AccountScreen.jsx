import React from 'react';
import { currentUser, payments } from '../../data/mockData';
import { CreditCard, Download, CheckCircle2 } from 'lucide-react';
import { DataTable } from '../shared/DataTable';

export function AccountScreen() {
  const paymentColumns = [
    { key: 'date', label: 'Date', render: (row) => new Date(row.date).toLocaleDateString() },
    { key: 'eventName', label: 'Description', className: 'font-medium text-slate-800' },
    { key: 'hostName', label: 'Host', render: (row) => <span className="text-slate-600">{row.hostName}</span> },
    { key: 'inviteeName', label: 'Invitee', render: (row) => <span className="text-slate-600">{row.inviteeName}</span> },
    { key: 'amount', label: 'Amount', render: (row) => `$${row.amount.toFixed(2)}` },
    { 
      key: 'status', 
      label: 'Status',
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={12} /> {row.status}
        </span>
      )
    },
    {
      key: 'invoice',
      label: 'Invoice',
      render: () => (
        <button className="text-primary hover:text-indigo-700 p-1 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors">
          <Download size={16} />
        </button>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800">Account & Billing</h2>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="p-8 md:w-1/3 bg-slate-50 border-r border-slate-200 flex flex-col items-center text-center">
          <img src={currentUser.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-sm mb-4" />
          <h3 className="text-xl font-bold text-slate-800">{currentUser.name}</h3>
          <p className="text-slate-500 text-sm mb-4">{currentUser.email}</p>
          <button 
            onClick={() => window.location.hash = 'edit-profile'}
            className="w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            Edit Profile
          </button>
        </div>
        
        <div className="p-8 md:w-2/3 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Plan</h4>
              <div className="text-2xl font-bold text-slate-800">{currentUser.plan}</div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              Active
            </span>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Next billing date</span>
              <span className="font-medium text-slate-800">July 1, 2026</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-4">
              <span className="text-slate-500">Monthly cost</span>
              <span className="font-medium text-slate-800">$15.00 / user</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Upgrade Plan
            </button>
            <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <CreditCard size={20} className="text-primary" /> Billing History
        </h3>
        <DataTable columns={paymentColumns} data={payments} />
      </div>
    </div>
  );
}
