import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

export function DnsVerificationModal({ isOpen, onClose, title, domain, type, onVerify }) {
  const [copied, setCopied] = useState(null);
  const [verifying, setVerifying] = useState(false);

  if (!isOpen) return null;

  const records = type === 'domain' 
    ? [
        { type: 'CNAME', host: 'book', value: 'cname.meetly.mock' },
      ]
    : [
        { type: 'TXT', host: '@', value: 'v=spf1 include:_spf.meetly.mock ~all' },
        { type: 'CNAME', host: 'meetly._domainkey', value: 'dkim.meetly.mock' },
      ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onVerify();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 text-indigo-800">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div className="text-sm">
              Please add the following DNS records to your domain provider for <strong>{domain || 'your domain'}</strong>. It may take up to 24 hours for DNS changes to propagate.
            </div>
          </div>

          <div className="space-y-4">
            {records.map((rec, i) => (
              <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase flex justify-between">
                  <span>{rec.type} Record</span>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Host / Name</label>
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded border border-slate-100">
                      <code className="text-sm text-slate-700 font-mono">{rec.host}</code>
                      <button onClick={() => handleCopy(rec.host, `${i}-host`)} className="text-slate-400 hover:text-primary">
                        {copied === `${i}-host` ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Value / Target</label>
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded border border-slate-100">
                      <code className="text-sm text-slate-700 font-mono truncate mr-2" title={rec.value}>{rec.value}</code>
                      <button onClick={() => handleCopy(rec.value, `${i}-val`)} className="text-slate-400 hover:text-primary shrink-0">
                        {copied === `${i}-val` ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors">
            I'll do this later
          </button>
          <button onClick={handleVerify} disabled={verifying} className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
            {verifying ? <Loader2 size={16} className="animate-spin" /> : null}
            {verifying ? 'Verifying DNS...' : 'Verify Records Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
