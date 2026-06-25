import React, { useState, useEffect } from 'react';
import { users } from '../../data/mockData';
import { PollsPanel } from './PollsPanel';
import { QAPanel } from './QAPanel';
import { MeetingSettingsModal } from './MeetingSettingsModal';
import { Whiteboard } from './Whiteboard';
import { BreakoutRoomsModal } from './BreakoutRoomsModal';
import { InviteModal } from './InviteModal';
import { 
  Mic, MicOff, Video, VideoOff, MonitorUp, MessageSquare, Smile, 
  PhoneOff, Settings, Users, Hand, Subtitles, MoreVertical, 
  ChevronUp, CheckSquare, FileText, Download, LayoutDashboard,
  HelpCircle, Edit3, CircleDot, Pin, Maximize, UserMinus, PanelRight, Link
} from 'lucide-react';

export function MeetingRoom({ onLeave }) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState(null); // null, 'chat', 'people', 'polls', 'qa', 'files', 'transcript'
  const [showReactions, setShowReactions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ccEnabled, setCcEnabled] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(null); // 'audio' | 'video' | null
  
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsModalTab, setSettingsModalTab] = useState('audio');
  const [duration, setDuration] = useState(0);
  
  // Tile states
  const [mutedParticipants, setMutedParticipants] = useState(new Set());
  const [pinnedUser, setPinnedUser] = useState(null);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'speaker' | 'horizontal'
  const [waitingUser, setWaitingUser] = useState(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    const waitingTimer = setTimeout(() => {
      setWaitingUser({ name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(waitingTimer);
    };
  }, []);

  const getContainerLayoutClass = () => {
    if (isWhiteboardActive || isScreenSharing || pinnedUser || layoutMode === 'speaker') {
      return 'flex flex-col lg:flex-row';
    }
    if (layoutMode === 'horizontal') {
      return 'flex flex-col';
    }
    return 'grid grid-cols-2 auto-rows-fr';
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openSettings = (tab) => {
    setSettingsModalTab(tab);
    setIsSettingsModalOpen(true);
    setSettingsMenuOpen(null);
    setMoreMenuOpen(false);
  };

  const toggleParticipantMute = (id) => {
    setMutedParticipants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const togglePin = (id) => {
    if (pinnedUser === id) setPinnedUser(null);
    else setPinnedUser(id);
  };

  const handleFullscreen = (id) => {
    const el = document.getElementById(`tile-${id}`);
    if (el) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    }
  };

  // Helper to toggle sidebar tabs
  const toggleSidebar = (tab) => {
    if (activeSidebar === tab) {
      setActiveSidebar(null);
    } else {
      setActiveSidebar(tab);
    }
  };

  const SidebarContent = () => {
    switch(activeSidebar) {
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <img src={users[1].avatar} alt="" className="w-8 h-8 rounded-full shrink-0" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-slate-200">{users[1].name}</span>
                    <span className="text-xs text-slate-400">10:01 AM</span>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-xl rounded-tl-none text-sm text-slate-300 mt-1">
                    Hey everyone, let's get started!
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800">
              <input type="text" placeholder="Type a message to everyone..." className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm outline-none focus:border-primary placeholder-slate-400" />
            </div>
          </div>
        );
      case 'people':
        return (
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">In Meeting ({users.length})</span>
              <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors">Mute All</button>
            </div>
            <div className="space-y-3">
              {users.map((u, i) => (
                <div key={u.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div>
                      <div className="text-sm font-medium text-white">{u.name} {i===0 && "(You)"}</div>
                      <div className="text-xs text-slate-400">{u.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    {i===0 && handRaised && <Hand size={16} className="text-yellow-500" />}
                    
                    {i === 0 ? (
                      <Mic size={16} className={!micOn ? "text-red-500" : ""} />
                    ) : (
                      <button onClick={() => toggleParticipantMute(u.id)} className="hover:text-white transition-colors" title={mutedParticipants.has(u.id) ? "Unmute" : "Mute"}>
                        {mutedParticipants.has(u.id) ? <MicOff size={16} className="text-red-500" /> : <Mic size={16} />}
                      </button>
                    )}
                    
                    <Video size={16} className="hover:text-white cursor-pointer transition-colors" title="Stop Video" />
                    {i !== 0 && (
                      <button className="ml-1 text-slate-500 hover:text-red-500 transition-colors" title="Kick Participant">
                        <UserMinus size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'polls':
        return <PollsPanel />;
      case 'qa':
        return <QAPanel />;
      case 'files':
        return (
          <div className="p-4 flex flex-col items-center justify-center h-full text-center">
            <FileText size={48} className="text-slate-600 mb-4" />
            <h3 className="text-white font-medium mb-2">Shared Files</h3>
            <p className="text-slate-400 text-sm mb-4">Share documents and files with the room.</p>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 hover:bg-slate-700 transition-colors">Upload File</button>
          </div>
        );
      case 'transcript':
        return (
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Live Transcript</h3>
              <div className="flex items-center gap-2">
                <select className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded outline-none border border-slate-700">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
                <button className="text-slate-400 hover:text-white"><Download size={16} /></button>
              </div>
            </div>
            {ccEnabled ? (
              <div className="flex-1 space-y-4 overflow-y-auto">
                <div className="text-sm">
                  <span className="font-medium text-primary mr-2">John Doe:</span>
                  <span className="text-slate-300">Welcome to the weekly sync. Let's start with updates.</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Subtitles size={48} className="text-slate-600 mb-4" />
                <p className="text-slate-400 text-sm">Turn on Captions to see the transcript.</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col relative overflow-hidden font-sans">
      
      {/* Top Bar */}
      <div className="h-14 bg-slate-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 text-white shrink-0 absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-4">
          <div className="font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Weekly Strategy Sync
          </div>
          {isRecording && (
            <div className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <CircleDot size={12} className="fill-current" /> REC
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <button onClick={() => setIsInviteModalOpen(true)} className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-white/5" title="Copy Invite Link">
            <Link size={14} />
            <span>Invite</span>
          </button>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-slate-300 font-mono">{formatDuration(duration)}</span>
          </div>
          <span className="text-slate-300">10:02 AM</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden pt-14 pb-20">
        
        {/* Video Area */}
        <div className={`flex-1 p-4 gap-4 relative overflow-hidden ${getContainerLayoutClass()}`}>
          
          {isWhiteboardActive && (
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-primary/50 relative min-h-[300px]">
              <Whiteboard onClose={() => setIsWhiteboardActive(false)} />
            </div>
          )}

          {isScreenSharing && !isWhiteboardActive && (
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-slate-700 relative min-h-[300px] bg-slate-900 flex flex-col">
              <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700 flex justify-between items-center backdrop-blur-md absolute top-0 left-0 right-0 z-20">
                <span className="text-slate-200 text-sm font-medium flex items-center gap-2">
                  <MonitorUp size={16} className="text-primary" /> You are sharing your screen
                </span>
                <button onClick={() => setIsScreenSharing(false)} className="text-xs bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded transition-colors font-medium">
                  Stop Sharing
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center relative bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                <div className="relative z-10 bg-black/60 backdrop-blur-md px-8 py-6 rounded-2xl text-center shadow-2xl border border-white/10 max-w-sm w-full mx-4">
                  <FileText size={48} className="text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">Q3 Financial Presentation</h3>
                  <p className="text-slate-300 text-sm">Presenting to everyone</p>
                </div>
                
                {isAnnotating && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce border border-white/20 flex items-center gap-2">
                    <CheckSquare size={16} /> Annotation Active
                  </div>
                )}
              </div>
            </div>
          )}

          {(() => {
            const renderTile = (user, idx, isMainView, isThumbHorizontal = false) => {
              const isMuted = (idx === 0 && !micOn) || mutedParticipants.has(user.id);
              const isVideoOff = idx === 0 && !videoOn;
              
              // Base classes
              let layoutClasses = 'border-white/5';
              if (isMainView) {
                layoutClasses = 'flex-1 border-primary ring-1 ring-primary/50';
              } else if (isThumbHorizontal) {
                layoutClasses = 'w-48 h-full shrink-0 border-white/5';
              } else if (isWhiteboardActive || isScreenSharing || pinnedUser || layoutMode === 'speaker') {
                layoutClasses = 'w-full lg:w-64 h-48 lg:h-40 shrink-0 border-white/5';
              }

              return (
                <div 
                  key={user.id} 
                  id={`tile-${user.id}`}
                  className={`bg-slate-800/50 rounded-2xl relative overflow-hidden group shadow-lg border backdrop-blur-sm transition-all duration-300 ${layoutClasses}`}
                >
                  <img src={user.avatar} alt={user.name} className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} />
                  
                  {isVideoOff && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg ring-4 ring-white/10">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* Active Speaker Border Indicator */}
                  {idx === 1 && !isMainView && layoutMode === 'grid' && !pinnedUser && (
                    <div className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"></div>
                  )}

                  {/* Tile Controls (Show on Hover) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => togglePin(user.id)} className={`w-8 h-8 rounded-lg backdrop-blur-md flex items-center justify-center transition-colors ${pinnedUser === user.id ? 'bg-primary text-white' : 'bg-black/60 text-white hover:bg-primary'}`} title={pinnedUser === user.id ? "Unpin" : "Pin"}>
                      <Pin size={16} />
                    </button>
                    <button onClick={() => handleFullscreen(user.id)} className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors" title="Full View">
                      <Maximize size={16} />
                    </button>
                    {idx !== 0 && (
                      <button onClick={() => toggleParticipantMute(user.id)} className={`w-8 h-8 rounded-lg backdrop-blur-md flex items-center justify-center transition-colors ${mutedParticipants.has(user.id) ? 'bg-red-500 text-white' : 'bg-black/60 text-white hover:bg-red-500'}`} title={mutedParticipants.has(user.id) ? "Unmute" : "Mute"}>
                        {mutedParticipants.has(user.id) ? <Mic size={16} /> : <MicOff size={16} />}
                      </button>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs lg:text-sm font-medium flex items-center gap-2">
                      {user.name} {idx === 0 && "(You)"}
                    </div>
                    {isMuted && (
                      <div className="w-7 h-7 rounded-lg bg-red-500/80 backdrop-blur-md flex items-center justify-center text-white">
                        <MicOff size={14} />
                      </div>
                    )}
                  </div>
                </div>
              );
            };

            if (isWhiteboardActive || isScreenSharing) {
              return (
                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 w-full lg:w-64 h-32 lg:h-auto">
                  {users.map(u => renderTile(u, users.indexOf(u), false))}
                </div>
              );
            } else if (!pinnedUser && layoutMode === 'grid') {
              return users.map((u, i) => renderTile(u, i, false));
            } else {
              const mainUserId = pinnedUser || users[1].id;
              const mainUser = users.find(u => u.id === mainUserId);
              const others = users.filter(u => u.id !== mainUserId);
              
              if (layoutMode === 'horizontal' && !pinnedUser) {
                return (
                  <>
                    {mainUser && renderTile(mainUser, users.indexOf(mainUser), true)}
                    <div className="flex flex-row gap-4 overflow-x-auto no-scrollbar shrink-0 w-full h-32">
                      {others.map(u => renderTile(u, users.indexOf(u), false, true))}
                    </div>
                  </>
                );
              }

              return (
                <>
                  {mainUser && renderTile(mainUser, users.indexOf(mainUser), true)}
                  <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 w-full lg:w-64 h-32 lg:h-auto">
                    {others.map(u => renderTile(u, users.indexOf(u), false))}
                  </div>
                </>
              );
            }
          })()}
          
          {/* CC Overlay */}
          {ccEnabled && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-2xl text-lg font-medium shadow-2xl border border-white/10 animate-fade-in text-center max-w-2xl">
              <span className="text-primary mr-2">John:</span>
              Yes, I think the new designs look absolutely fantastic. Great job!
            </div>
          )}
        </div>

        {/* Dynamic Sidebar */}
        {activeSidebar && (
          <div className="w-80 bg-slate-900 border-l border-white/5 flex flex-col shrink-0 animate-slide-in relative z-10 shadow-2xl">
            {/* Sidebar Header Tabs */}
            <div className="flex items-center overflow-x-auto no-scrollbar border-b border-white/5 p-2 gap-1 bg-slate-900/50 backdrop-blur-md">
              <button onClick={() => setActiveSidebar('chat')} className={`p-2 rounded-lg transition-colors flex-1 flex justify-center ${activeSidebar === 'chat' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`} title="Chat"><MessageSquare size={18} /></button>
              <button onClick={() => setActiveSidebar('people')} className={`p-2 rounded-lg transition-colors flex-1 flex justify-center ${activeSidebar === 'people' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`} title="People"><Users size={18} /></button>
              <button onClick={() => setActiveSidebar('polls')} className={`p-2 rounded-lg transition-colors flex-1 flex justify-center ${activeSidebar === 'polls' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`} title="Polls"><CheckSquare size={18} /></button>
              <button onClick={() => setActiveSidebar('qa')} className={`p-2 rounded-lg transition-colors flex-1 flex justify-center ${activeSidebar === 'qa' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`} title="Q&A"><HelpCircle size={18} /></button>
              <button onClick={() => setActiveSidebar('files')} className={`p-2 rounded-lg transition-colors flex-1 flex justify-center ${activeSidebar === 'files' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`} title="Files"><FileText size={18} /></button>
              <button onClick={() => setActiveSidebar('transcript')} className={`p-2 rounded-lg transition-colors flex-1 flex justify-center ${activeSidebar === 'transcript' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`} title="Transcript"><Subtitles size={18} /></button>
              <button onClick={() => setActiveSidebar(null)} className="p-2 rounded-lg text-slate-500 hover:text-slate-300 ml-1">×</button>
            </div>
            
            {/* Sidebar Content */}
            <div className="flex-1 overflow-hidden">
              <SidebarContent />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="h-20 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-center gap-3 px-6 shrink-0 absolute bottom-0 left-0 right-0 z-20">
        
        {/* Audio Toggle & Settings */}
        <div className="relative flex">
          <button onClick={() => setMicOn(!micOn)} className={`h-12 px-4 rounded-l-full flex items-center justify-center transition-colors ${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
            {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <button onClick={() => setSettingsMenuOpen(settingsMenuOpen === 'audio' ? null : 'audio')} className={`h-12 px-2 rounded-r-full border-l border-white/10 flex items-center justify-center transition-colors ${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
            <ChevronUp size={16} />
          </button>
          {settingsMenuOpen === 'audio' && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in text-sm overflow-hidden">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">Microphone</div>
              <button className="w-full text-left px-4 py-2.5 text-white hover:bg-slate-700 flex items-center justify-between transition-colors">Default Mic <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div></button>
              <button className="w-full text-left px-4 py-2.5 text-slate-300 hover:bg-slate-700 transition-colors">External Headset</button>
              <div className="h-px bg-white/10 my-1"></div>
              <button onClick={() => openSettings('audio')} className="w-full text-left px-4 py-2.5 text-slate-300 hover:bg-slate-700 flex items-center gap-2 transition-colors"><Settings size={14}/> Audio Settings</button>
            </div>
          )}
        </div>

        {/* Video Toggle & Settings */}
        <div className="relative flex">
          <button onClick={() => setVideoOn(!videoOn)} className={`h-12 px-4 rounded-l-full flex items-center justify-center transition-colors ${videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
            {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>
          <button onClick={() => setSettingsMenuOpen(settingsMenuOpen === 'video' ? null : 'video')} className={`h-12 px-2 rounded-r-full border-l border-white/10 flex items-center justify-center transition-colors ${videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
            <ChevronUp size={16} />
          </button>
          {settingsMenuOpen === 'video' && (
            <div className="absolute bottom-full left-0 mb-2 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in text-sm overflow-hidden">
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">Camera</div>
              <button className="w-full text-left px-4 py-2.5 text-white hover:bg-slate-700 flex items-center justify-between transition-colors">FaceTime HD <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div></button>
              <div className="h-px bg-white/10 my-1"></div>
              <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-900/50">Background</div>
              <button className="w-full text-left px-4 py-2.5 text-slate-300 hover:bg-slate-700 transition-colors">Blur Background</button>
              <button onClick={() => openSettings('video')} className="w-full text-left px-4 py-2.5 text-slate-300 hover:bg-slate-700 transition-colors">Virtual Backgrounds...</button>
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-white/10 mx-1"></div>


        <button onClick={() => setIsScreenSharing(!isScreenSharing)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isScreenSharing ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`} title="Share Screen">
          <MonitorUp size={20} />
        </button>

        {/* Raise Hand */}
        <button onClick={() => setHandRaised(!handRaised)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${handRaised ? 'bg-yellow-500/20 text-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`} title="Raise Hand">
          <Hand size={20} />
        </button>

        {/* Reactions */}
        <div className="relative">
          <button onClick={() => setShowReactions(!showReactions)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${showReactions ? 'bg-slate-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`} title="Reactions">
            <Smile size={20} />
          </button>
          {showReactions && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-800/90 backdrop-blur-md rounded-full flex gap-1 p-2 shadow-2xl border border-white/10 animate-fade-in z-50">
              {['👍', '❤️', '👏', '🎉', '😂', '😮'].map(emoji => (
                <button key={emoji} className="w-10 h-10 rounded-full hover:bg-slate-700 text-xl flex items-center justify-center transition-transform hover:scale-125 hover:-translate-y-1">
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>



        {/* Right Controls */}
        <div className="absolute right-6 flex items-center gap-3">
          {/* Sidebar Toggle shortcuts */}
          <button onClick={() => toggleSidebar(activeSidebar ? activeSidebar : 'chat')} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${activeSidebar ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`} title="Toggle Sidebar">
            <PanelRight size={20} />
          </button>

          {/* Settings */}
          <button onClick={() => openSettings('general')} className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-slate-800 hover:bg-slate-700 text-slate-300" title="Settings">
            <Settings size={20} />
          </button>
        </div>

        {/* Whiteboard */}
        <button onClick={() => setIsWhiteboardActive(!isWhiteboardActive)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isWhiteboardActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`} title="Whiteboard">
          <Edit3 size={20} />
        </button>

        {/* More Menu */}
        <div className="relative">
          <button onClick={() => setMoreMenuOpen(!moreMenuOpen)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${moreMenuOpen ? 'bg-slate-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`} title="More Options">
            <MoreVertical size={20} />
          </button>
          {moreMenuOpen && (
            <div className="absolute bottom-full right-0 mb-4 w-56 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-sm overflow-hidden">
              <button onClick={() => setIsRecording(!isRecording)} className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-slate-700 hover:text-white flex items-center gap-3 transition-colors">
                <CircleDot size={16} className={isRecording ? 'text-red-500 fill-current animate-pulse' : ''}/> {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              <button onClick={() => setCcEnabled(!ccEnabled)} className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-slate-700 hover:text-white flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3"><Subtitles size={16} className={ccEnabled ? 'text-primary' : ''}/> Captions</div>
                {ccEnabled && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
              </button>
              <div className="h-px bg-white/10 my-1"></div>
              <button onClick={() => { setIsAnnotating(!isAnnotating); setMoreMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-slate-700 hover:text-white flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3"><CheckSquare size={16} className={isAnnotating ? 'text-primary' : ''}/> Annotate</div>
                {isAnnotating && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
              </button>
              <button onClick={() => { 
                setLayoutMode(prev => prev === 'grid' ? 'speaker' : prev === 'speaker' ? 'horizontal' : 'grid'); 
                setMoreMenuOpen(false); 
              }} className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-slate-700 hover:text-white flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3"><LayoutDashboard size={16} className="text-primary" /> Change Layout</div>
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full capitalize">{layoutMode}</span>
              </button>
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-white/10 mx-1"></div>
        
        {/* Leave */}
        <button onClick={onLeave} className="px-6 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40">
          <PhoneOff size={18} /> Leave
        </button>
      </div>

      {isSettingsModalOpen && <MeetingSettingsModal onClose={() => setIsSettingsModalOpen(false)} initialTab={settingsModalTab} />}
      {isInviteModalOpen && <InviteModal onClose={() => setIsInviteModalOpen(false)} />}
      
      {/* Global CSS for hiding scrollbars but keeping functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
