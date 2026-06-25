import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, LogOut, User as UserIcon, Plus, Video, Calendar } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import { NewMeetingModal } from '../admin/modals/NewMeetingModal';
import { JoinMeetingModal } from '../admin/modals/JoinMeetingModal';

export function Header({ title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
        setNewDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-40 relative">
      <div className="flex items-center md:hidden gap-2 text-primary font-bold text-xl">
        <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">M</div>
      </div>
      
      <h1 className="text-xl font-semibold text-slate-800 hidden md:block">{title}</h1>
      
      <div className="flex items-center gap-4 ml-auto">
        <button 
          onClick={() => setShowJoinModal(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors"
        >
          <Video size={16} /> Join
        </button>

        <div className="relative">
          <button 
            onClick={() => { setNewDropdownOpen(!newDropdownOpen); setDropdownOpen(false); setNotificationsOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            <Plus size={16} /> New
          </button>
          
          {newDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-fade-in">
              <button 
                onClick={() => { setNewDropdownOpen(false); navigate('/join'); }}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-primary flex items-center justify-center shrink-0">
                  <Video size={16} />
                </div>
                <div>
                  <div className="font-medium text-slate-800">Start Instant meeting</div>
                  <div className="text-xs text-slate-500">Starts immediately</div>
                </div>
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button 
                onClick={() => { setNewDropdownOpen(false); setShowNewMeetingModal(true); }}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <div className="font-medium text-slate-800">Schedule</div>
                  <div className="text-xs text-slate-500">Create new meeting</div>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

        <div className="relative">
          <button 
            className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50"
            onClick={() => { setNotificationsOpen(!notificationsOpen); setDropdownOpen(false); }}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {[
                  { id: 1, title: 'Meeting starting soon', desc: 'Design Review is starting in 10 minutes', time: '10m ago', unread: true },
                  { id: 2, title: 'New Recording Available', desc: 'Q3 Planning recording is ready to view', time: '1h ago', unread: true },
                  { id: 3, title: 'Workspace Upgraded', desc: 'You are now successfully on the Pro plan', time: '1d ago', unread: false },
                ].map(n => (
                  <div key={n.id} className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-indigo-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-sm ${n.unread ? 'font-semibold text-slate-800' : 'font-medium text-slate-700'}`}>{n.title}</h4>
                      <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 text-center border-t border-slate-100 mt-1">
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View all notifications</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
            onClick={() => { setDropdownOpen(!dropdownOpen); setNotificationsOpen(false); }}
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-slate-900 leading-none mb-1">{currentUser.name}</div>
              <div className="text-xs text-slate-500 leading-none">{currentUser.email}</div>
            </div>
            <img src={currentUser.avatar} alt="Profile" className="w-9 h-9 rounded-full border border-slate-200" />
            <Settings size={16} className="text-slate-400" />
          </div>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 animate-fade-in">
              <button 
                onClick={() => { window.location.hash = 'account'; setDropdownOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <UserIcon size={16} className="text-slate-400" /> Account
              </button>
              <button 
                onClick={() => { window.location.hash = 'settings'; setDropdownOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Settings size={16} className="text-slate-400" /> Settings
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button 
                onClick={() => navigate('/')}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <JoinMeetingModal 
        isOpen={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
      />
      <NewMeetingModal 
        isOpen={showNewMeetingModal} 
        onClose={() => setShowNewMeetingModal(false)} 
        onSave={(data) => {
          console.log('Saved Event:', data);
          setShowNewMeetingModal(false);
        }}
      />
    </header>
  );
}
