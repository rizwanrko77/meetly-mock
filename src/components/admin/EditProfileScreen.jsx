import React, { useState } from 'react';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export function EditProfileScreen() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role || 'Admin');
  
  return (
    <div className="p-8 max-w-3xl animate-fade-in">
      <div className="mb-8 flex items-center gap-3">
        <button 
          onClick={() => window.location.hash = 'account'}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
          <p className="text-slate-500">Update your personal information and preferences.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img src={currentUser.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-sm" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-slate-800">Profile Picture</h3>
            <p className="text-sm text-slate-500 mb-3">Upload a new avatar. Larger image will be resized automatically.</p>
            <div className="flex justify-center sm:justify-start gap-2">
              <button className="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Upload new</button>
              <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">Remove</button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role / Title</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none text-sm bg-white">
                <option>Pacific Time (PT)</option>
                <option>Eastern Time (ET)</option>
                <option>Central European Time (CET)</option>
                <option>India Standard Time (IST)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm" onClick={() => window.location.hash = 'account'}>Cancel</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
