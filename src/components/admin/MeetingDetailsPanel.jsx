import React, { useState } from 'react';
import { UserPlus, UserMinus, Play, Download, X, Edit, Video, Users, FileText, Sparkles, User, RefreshCw, XCircle, ChevronLeft, Link as LinkIcon, Share2 } from 'lucide-react';

export function MeetingDetailsPanel({ meeting }) {
  if (!meeting) return null;

  switch (meeting.status) {
    case 'Scheduled':
      return <ScheduledView meeting={meeting} />;
    case 'Completed':
      return <CompletedView meeting={meeting} />;
    case 'Cancelled':
      return <CancelledView meeting={meeting} />;
    default:
      return <div>Unknown status</div>;
  }
}

function ScheduledView({ meeting }) {
  const meetingLink = "meetly.com/j/123456789";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-slate-800 text-lg mb-4">Scheduled Meeting</h3>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative group">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-slate-500">Host</div>
              <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit size={12} /> Change
              </button>
            </div>
            <div className="font-medium text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">
                <User size={12} />
              </div>
              {meeting.host}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative group">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-slate-500">Date & Time</div>
              <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit size={12} /> Change
              </button>
            </div>
            <div className="text-slate-800">
              {new Date(meeting.date).toLocaleDateString()} at {new Date(meeting.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Users size={16} /> Invitees
              </div>
              <button className="text-primary text-xs font-medium hover:bg-indigo-50 px-2 py-1 rounded flex items-center gap-1">
                <UserPlus size={14} /> Add
              </button>
            </div>
            {meeting.invitees && meeting.invitees.length > 0 ? (
              <div className="space-y-2">
                {meeting.invitees.map((invitee, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-2 border border-slate-100 rounded group">
                    <div>
                      <div className="text-sm font-medium text-slate-800">{invitee.name}</div>
                      <div className="text-xs text-slate-500">{invitee.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        invitee.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        invitee.status === 'Declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {invitee.status}
                      </span>
                      <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <UserMinus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400 text-center py-2">No invitees yet.</div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex flex-col gap-3">
          <div className="text-sm font-medium text-slate-700">Meeting Link</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 flex items-center gap-2 overflow-hidden">
              <LinkIcon size={14} className="text-slate-400 shrink-0" />
              <span className="truncate">{meetingLink}</span>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(meetingLink)}
              className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium text-sm hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium shadow-sm hover:bg-slate-50 transition-colors flex justify-center items-center gap-2">
            <RefreshCw size={16} /> Reschedule
          </button>
          <button className="w-full py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex justify-center items-center gap-2">
            <XCircle size={16} /> Cancel Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

function CompletedView({ meeting }) {
  const [selectedSession, setSelectedSession] = useState(null);

  const hasMultipleSessions = meeting.sessions && meeting.sessions.length > 1;

  if (hasMultipleSessions && !selectedSession) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-slate-800 text-lg">Completed Meeting</h3>
        <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg flex items-start gap-2">
          <Video className="shrink-0 mt-0.5" size={16} />
          This meeting has multiple sessions. Click a session to view details.
        </div>
        
        <div className="space-y-3">
          {meeting.sessions.map((session, idx) => (
            <button 
              key={session.id} 
              onClick={() => setSelectedSession(session)}
              className="w-full text-left bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-800 group-hover:text-primary transition-colors">Session {idx + 1}</span>
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">{session.duration}</span>
              </div>
              <div className="text-sm text-slate-500">
                {new Date(session.date).toLocaleDateString()}
              </div>
              <div className="text-sm text-slate-600 mt-2 font-medium">
                {session.startTime} - {session.endTime}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const targetSession = selectedSession || (meeting.sessions && meeting.sessions[0]) || meeting;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {selectedSession && (
          <button onClick={() => setSelectedSession(null)} className="flex items-center gap-1 text-sm font-medium px-2 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            <ChevronLeft size={16} /> Back
          </button>
        )}
        <h3 className="font-bold text-slate-800 text-lg">
          {selectedSession ? `Session Details` : `Meeting Details`}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Date</div>
          <div className="text-sm font-medium text-slate-800">
            {new Date(targetSession.date).toLocaleDateString()}
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Time</div>
          <div className="text-sm font-medium text-slate-800">
            {targetSession.startTime && targetSession.endTime 
              ? `${targetSession.startTime} - ${targetSession.endTime}`
              : new Date(meeting.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Duration</div>
          <div className="text-sm font-medium text-slate-800">{targetSession.duration || meeting.duration}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Type</div>
          <div className="text-sm font-medium text-slate-800">{meeting.type}</div>
        </div>
      </div>

      <details className="bg-slate-50 rounded-lg border border-slate-100 group cursor-pointer">
        <summary className="p-4 text-sm font-medium text-slate-800 list-none flex justify-between items-center outline-none">
          <div className="flex items-center gap-2"><Users size={16} className="text-slate-500" /> Participants ({meeting.participantsCount})</div>
          <span className="text-xs text-primary group-open:hidden">View</span>
          <span className="text-xs text-primary hidden group-open:block">Hide</span>
        </summary>
        <div className="p-4 pt-0 border-t border-slate-100 mt-2">
          <div className="text-sm text-slate-600 mb-3 font-medium">Host: <span className="text-slate-800">{meeting.host}</span></div>
          {meeting.participants && meeting.participants.length > 0 ? (
            <div className="space-y-3">
              {meeting.participants.map((p, idx) => (
                <div key={idx} className="flex justify-between items-start bg-white p-2 rounded border border-slate-100">
                  <div>
                    <div className="text-sm font-medium text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.email}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium bg-slate-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                    {p.joinTime} - {p.leaveTime}
                  </div>
                </div>
              ))}
              {meeting.participantsCount > meeting.participants.length && (
                <div className="text-xs text-center text-slate-400 pt-2 border-t border-slate-100">
                  +{meeting.participantsCount - meeting.participants.length} more participants
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-slate-500 italic">Participant details are unavailable for this session.</div>
          )}
        </div>
      </details>

      {meeting.isPaid && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex justify-between items-center">
          <div className="font-medium text-green-800">Payment Collected</div>
          <div className="font-bold text-green-700">${meeting.price || '0.00'}</div>
        </div>
      )}

      {meeting.summary && (
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
            <Sparkles size={16} /> AI Summary
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">
            {meeting.summary}
          </div>
        </div>
      )}

      {meeting.transcription && (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-2">
            <FileText size={16} /> Transcription
          </div>
          <div className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-200 h-32 overflow-y-auto">
            {meeting.transcription}
          </div>
        </div>
      )}

      {meeting.recording && (
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-3">
            <Video size={16} /> Meeting Recording
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2">
              <Play size={18} /> Play
            </button>
            <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium shadow-sm hover:bg-slate-50 transition-colors flex justify-center items-center gap-2">
              <Download size={18} /> Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CancelledView({ meeting }) {
  return (
    <div className="space-y-6">
      <h3 className="font-bold text-slate-800 text-lg">Cancelled Meeting</h3>
      
      <div className="bg-red-50 p-5 rounded-xl border border-red-100 text-center">
        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <div className="font-medium text-red-800 mb-1">Meeting Cancelled</div>
        <div className="text-sm text-red-600">
          By {meeting.cancelledBy || 'System or User'}
        </div>
      </div>

      {meeting.cancelReason && (
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Cancellation Reason</div>
          <div className="text-sm text-slate-700 italic">"{meeting.cancelReason}"</div>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-sm font-medium text-slate-500 mb-1">Original Date</div>
          <div className="text-slate-800 font-medium">
            {new Date(meeting.date).toLocaleDateString()} at {new Date(meeting.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="text-sm font-medium text-slate-500 mb-1">Host</div>
          <div className="text-slate-800 font-medium">{meeting.host}</div>
        </div>
      </div>
    </div>
  );
}
