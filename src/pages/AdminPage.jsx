import React, { useState } from 'react';
import { useHash } from '../hooks/useHash';
import { Sidebar } from '../components/shared/Sidebar';
import { Header } from '../components/shared/Header';
import { SecondarySidebar } from '../components/shared/SecondarySidebar';
import { DashboardHome } from '../components/admin/DashboardHome';
import { SchedulerScreen } from '../components/admin/SchedulerScreen';
import { WhiteboardScreen } from '../components/admin/WhiteboardScreen';
import { MeetingsLibrary } from '../components/admin/MeetingsLibrary';
import { AccountScreen } from '../components/admin/AccountScreen';
import { SettingsScreen } from '../components/admin/SettingsScreen';
import { EditProfileScreen } from '../components/admin/EditProfileScreen';
import { MeetingDetailsPanel } from '../components/admin/MeetingDetailsPanel';
import { LayoutDashboard, Calendar, PenTool, Video } from 'lucide-react';

export function AdminPage() {
  const [hash, setHash] = useHash('dashboard');
  const [secondaryOpen, setSecondaryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scheduler', label: 'Scheduler', icon: Calendar },
    { id: 'whiteboard', label: 'Whiteboard', icon: PenTool },
    { id: 'meetings', label: 'Meetings', icon: Video },
  ];

  const handleNavigate = (newHash) => {
    setHash(newHash);
    setSecondaryOpen(false);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSecondaryOpen(true);
  };

  const renderContent = () => {
    switch (hash) {
      case 'dashboard':
        return <DashboardHome />;
      case 'scheduler':
        return <SchedulerScreen />;
      case 'whiteboard':
        return <WhiteboardScreen />;
      case 'meetings':
        return <MeetingsLibrary onMeetingSelect={handleItemSelect} selectedMeeting={selectedItem} />;
      case 'account':
        return <AccountScreen />;
      case 'settings': return <SettingsScreen />;
      case 'edit-profile': return <EditProfileScreen />;
      default: return <DashboardHome />;
    }
  };

  const currentTitle = [...navLinks, {id:'account', label:'Account'}, {id:'settings', label:'Settings'}]
    .find(link => link.id === hash)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar links={navLinks} activeHash={hash} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={currentTitle} />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <SecondarySidebar 
        isOpen={secondaryOpen} 
        onClose={() => setSecondaryOpen(false)} 
        title={selectedItem?.type || "Details"}
      >
        {selectedItem ? (
          <MeetingDetailsPanel key={selectedItem.id} meeting={selectedItem} />
        ) : (
          <div className="text-slate-500 text-sm text-center mt-10">Select an item to view details.</div>
        )}
      </SecondarySidebar>
    </div>
  );
}
