import React from 'react';
import { CreditCard, Download } from 'lucide-react';

export function BillingHistoryWidget() {
  const history = [
    { id: 1, date: 'Jun 1, 2026', desc: 'Workplace Basic (Monthly)', amount: '$15.00', status: 'Paid' },
    { id: 2, date: 'May 1, 2026', desc: 'Workplace Basic (Monthly)', amount: '$15.00', status: 'Paid' },
    { id: 3, date: 'Apr 1, 2026', desc: 'Workplace Basic (Monthly)', amount: '$15.00', status: 'Paid' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <CreditCard size={20} className="text-slate-400" /> Billing History
      </h3>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-slate-200 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="border-b border-slate-200 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="border-b border-slate-200 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="border-b border-slate-200 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 border-b border-slate-100 text-sm text-slate-800 font-medium">{item.date}</td>
                <td className="py-3 border-b border-slate-100 text-sm text-slate-600">{item.desc}</td>
                <td className="py-3 border-b border-slate-100 text-sm text-slate-800 font-medium">{item.amount}</td>
                <td className="py-3 border-b border-slate-100">
                  <button className="p-1.5 text-slate-400 hover:text-primary bg-slate-50 rounded transition-colors">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
