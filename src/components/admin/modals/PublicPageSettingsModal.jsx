import React, { useState } from 'react';
import { X, Image as ImageIcon, Link as LinkIcon, Palette } from 'lucide-react';

export function PublicPageSettingsModal({ isOpen, onClose, onSave }) {
  const [settings, setSettings] = useState({
    pageTitle: 'My Scheduling Page',
    welcomeMessage: 'Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.',
    themeColor: '#4f46e5', // default primary
    hideBranding: false,
    customUrl: 'meetly.com/u/my-page',
    showUpcomingEvents: true,
    showBookingCalendar: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl flex flex-col my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Palette size={20} className="text-primary" /> Public Page Settings
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <form id="public-settings-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Page Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={settings.pageTitle}
                onChange={e => setSettings({ ...settings, pageTitle: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <LinkIcon size={16} className="text-slate-400" /> Custom URL
              </label>
              <div className="flex rounded-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                <span className="bg-slate-50 px-3 py-2 text-slate-500 text-sm border-r border-slate-200 flex items-center">
                  meetly.com/u/
                </span>
                <input
                  type="text"
                  className="w-full px-4 py-2 focus:outline-none"
                  value={settings.customUrl.split('/').pop()}
                  onChange={e => setSettings({ ...settings, customUrl: `meetly.com/u/${e.target.value}` })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Welcome Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                value={settings.welcomeMessage}
                onChange={e => setSettings({ ...settings, welcomeMessage: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Theme Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-10 h-10 p-1 border border-slate-200 rounded-lg cursor-pointer"
                    value={settings.themeColor}
                    onChange={e => setSettings({ ...settings, themeColor: e.target.value })}
                  />
                  <span className="text-sm font-mono text-slate-600">{settings.themeColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Visibility Options</h3>
              
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <div className="font-medium text-slate-800">Show Upcoming Events</div>
                  <div className="text-sm text-slate-500">Display your public events on the scheduling page.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.showUpcomingEvents}
                    onChange={e => setSettings({ ...settings, showUpcomingEvents: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <div className="font-medium text-slate-800">Show Booking Calendar</div>
                  <div className="text-sm text-slate-500">Allow users to book meetings via calendar.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.showBookingCalendar}
                    onChange={e => setSettings({ ...settings, showBookingCalendar: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Profile Avatar Upload Mockup */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Profile Picture</label>
              <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-300 transition-colors shrink-0">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Click to upload image</p>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max size of 5MB.</p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="public-settings-form"
            className="px-5 py-2.5 bg-primary text-white font-medium hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
