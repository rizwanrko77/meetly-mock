import React, { useState } from 'react';
import { Settings, Mic, Video, Monitor, X, Check, MessageSquare, CheckSquare, HelpCircle } from 'lucide-react';

export function MeetingSettingsModal({ isOpen, onClose, initialTab = 'audio' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedBg, setSelectedBg] = useState('none');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Settings className="text-primary" size={24} /> Settings
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-slate-800/50 border-r border-slate-800 p-4 space-y-1 overflow-y-auto">
            <button 
              onClick={() => setActiveTab('audio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'audio' ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Mic size={18} /> Audio
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'video' ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Video size={18} /> Video
            </button>
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'general' ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Monitor size={18} /> General
            </button>
            <div className="h-px bg-slate-800 my-2 mx-4"></div>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'chat' ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <MessageSquare size={18} /> Chat
            </button>
            <button 
              onClick={() => setActiveTab('polls')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'polls' ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <CheckSquare size={18} /> Polls
            </button>
            <button 
              onClick={() => setActiveTab('qa')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'qa' ? 'bg-primary/20 text-primary' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <HelpCircle size={18} /> Q&A
            </button>
          </div>

          {/* Settings Panel */}
          <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
            {activeTab === 'audio' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-white font-medium mb-3 text-lg">Microphone</h3>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary mb-3">
                    <option>Default - MacBook Pro Microphone</option>
                    <option>External Headset</option>
                  </select>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">Input Level</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800 my-6"></div>

                <div>
                  <h3 className="text-white font-medium mb-3 text-lg">Speaker</h3>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary mb-3">
                    <option>Default - MacBook Pro Speakers</option>
                    <option>External Headphones</option>
                  </select>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">Output Volume</span>
                    <input type="range" className="flex-1 accent-primary" defaultValue="75" />
                  </div>
                  <button className="mt-4 px-4 py-2 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">Test Speaker</button>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-white font-medium mb-3 text-lg">Camera</h3>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-primary mb-4">
                    <option>FaceTime HD Camera</option>
                    <option>External Webcam</option>
                  </select>
                  
                  {/* Mock Video Preview */}
                  <div className="w-full aspect-video bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden mb-6">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-white shadow-lg z-10">
                      M
                    </div>
                    {selectedBg === 'blur' && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"></div>
                    )}
                    {selectedBg === 'image1' && (
                      <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Background" />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3 text-lg">Background Effects</h3>
                  <div className="grid grid-cols-4 gap-3">
                    <button 
                      onClick={() => setSelectedBg('none')}
                      className={`aspect-video rounded-xl border-2 flex items-center justify-center text-slate-400 text-sm font-medium transition-all ${selectedBg === 'none' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-700 hover:border-slate-500'}`}
                    >
                      None
                    </button>
                    <button 
                      onClick={() => setSelectedBg('blur')}
                      className={`aspect-video rounded-xl border-2 flex items-center justify-center text-slate-400 text-sm font-medium transition-all relative overflow-hidden ${selectedBg === 'blur' ? 'border-primary' : 'border-slate-700 hover:border-slate-500'}`}
                    >
                      <div className="absolute inset-0 bg-slate-700/50 backdrop-blur-md"></div>
                      <span className="relative z-10">Blur</span>
                      {selectedBg === 'blur' && <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5"><Check size={10} className="text-white" /></div>}
                    </button>
                    <button 
                      onClick={() => setSelectedBg('image1')}
                      className={`aspect-video rounded-xl border-2 overflow-hidden relative transition-all ${selectedBg === 'image1' ? 'border-primary' : 'border-transparent hover:border-slate-500'}`}
                    >
                      <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" alt="Bg 1" />
                      {selectedBg === 'image1' && <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5"><Check size={10} className="text-white" /></div>}
                    </button>
                    <button 
                      className="aspect-video rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-all text-2xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'general' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-white font-medium text-lg">Meeting Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Always mute my microphone when joining</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Always turn off my video when joining</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Enter full screen when a meeting starts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Show meeting duration</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-white font-medium text-lg">Chat Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Allow participants to chat with everyone</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Allow private messages between participants</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Auto-save chat on meeting end</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'polls' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-white font-medium text-lg">Polls Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Allow anonymous responses</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Share poll results automatically with attendees</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'qa' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-white font-medium text-lg">Q&A Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Allow anonymous questions</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Allow attendees to upvote questions</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                    <span className="text-slate-300">Require host approval before questions appear</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
