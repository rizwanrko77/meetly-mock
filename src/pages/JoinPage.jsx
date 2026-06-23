import React from 'react';
import { useHash } from '../hooks/useHash';
import { WaitingRoom } from '../components/join/WaitingRoom';
import { MeetingRoom } from '../components/join/MeetingRoom';
import { PostCallSummary } from '../components/join/PostCallSummary';

export function JoinPage() {
  const [hash, setHash] = useHash('waiting');

  const renderContent = () => {
    switch (hash) {
      case 'waiting':
        return <WaitingRoom onJoin={() => setHash('meeting')} />;
      case 'meeting':
        return <MeetingRoom onLeave={() => setHash('postcall')} />;
      case 'postcall':
        return <PostCallSummary />;
      default:
        return <WaitingRoom onJoin={() => setHash('meeting')} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900">
      {renderContent()}
    </div>
  );
}
