import React, { useState } from 'react';
import {
  Palette, Shield, Globe, Puzzle, Check, Save, RotateCcw,
  Clock, Calendar, Link, Image as ImageIcon, CreditCard,
  Bell, Database, Users, Download, Trash2, Edit, Plus, UserPlus,
  Mail, MessageSquare, MonitorPlay, Lock, EyeOff, Server,
  CalendarDays, Hash, Layout, MessageCircle, X
} from 'lucide-react';
import { ToggleSwitch } from '../shared/ToggleSwitch';
import { InfoTooltip } from '../shared/InfoTooltip';
import { DnsVerificationModal } from './DnsVerificationModal';
import { InviteMemberModal } from './InviteMemberModal';

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState('General');
  const [duration, setDuration] = useState('30 min');
  const [customDuration, setCustomDuration] = useState('');
  const [expiry, setExpiry] = useState('24 Hours');
  const [customExpiry, setCustomExpiry] = useState('');

  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const [customDomain, setCustomDomain] = useState('');
  const [customDomainStatus, setCustomDomainStatus] = useState('unverified'); // unverified, verified

  const [customEmail, setCustomEmail] = useState('');
  const [customEmailStatus, setCustomEmailStatus] = useState('unverified');

  const [editingUser, setEditingUser] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const [reminders, setReminders] = useState([
    { id: '1', time: '24 Hours Before', type: 'Email', target: 'Invitee', isCustomTime: false, isEditingTemplate: false, templateContent: 'Hi {{invitee.name}},\n\nJust a reminder that you have a meeting scheduled with {{host.name}} tomorrow at {{meeting.time}}.\n\nLink: {{meeting.link}}' },
    { id: '2', time: '15 Minutes Before', type: 'WhatsApp', target: 'Both', isCustomTime: false, isEditingTemplate: false, templateContent: 'Your meeting starts in 15 minutes! Join here: {{meeting.link}}' },
    { id: '3', time: '1 Hour After (Follow-up)', type: 'Email', target: 'Invitee', isCustomTime: false, isEditingTemplate: false, templateContent: 'Hi {{invitee.name}},\n\nThanks for attending the session with {{host.name}}. We would love your feedback.' },
  ]);

  const [hostAlertSettings, setHostAlertSettings] = useState({
    newBooking: { channel: 'Email', target: 'Host', isEditing: false, template: 'New booking from {{invitee.name}} for {{meeting.time}}.' },
    cancelReschedule: { channel: 'Email', target: 'Host', isEditing: false, template: 'Booking changed by {{invitee.name}} for {{meeting.time}}.' },
  });

  const [paymentAlertSettings, setPaymentAlertSettings] = useState({
    success: { enabled: true, channel: 'Email', target: 'Invitee', isEditing: false, template: 'Payment successful for your booking with {{host.name}}.' },
    failed: { enabled: true, channel: 'Email', target: 'Invitee', isEditing: false, template: 'Payment failed for your booking. Please update your payment method.' },
    pending: { enabled: true, channel: 'Email', target: 'Invitee', isEditing: false, template: 'Your booking is pending payment completion.' },
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Alex Johnson (You)', email: 'alex.j@meetly.mock', role: 'Admin', avatar: '1', status: 'Connected' },
    { id: '2', name: 'Samantha Smith', email: 'sam@meetly.mock', role: 'Editor', avatar: '2', status: 'Disconnected' },
  ]);

  const [roundRobinOrder, setRoundRobinOrder] = useState([
    { id: '1', name: 'Alex (You)' },
    { id: '2', name: 'Samantha' },
    { id: '3', name: 'David' }
  ]);

  const moveRoundRobin = (index, direction) => {
    const newOrder = [...roundRobinOrder];
    if (direction === 'left' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'right' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setRoundRobinOrder(newOrder);
  };

  const handleInvite = (newMember) => {
    // Add to team members
    const newId = (teamMembers.length + 1).toString();
    setTeamMembers([...teamMembers, {
      id: newId,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: (Math.floor(Math.random() * 70)).toString(),
      status: 'Disconnected'
    }]);

    // Also add to round robin
    setRoundRobinOrder([...roundRobinOrder, {
      id: newId,
      name: newMember.name.split(' ')[0]
    }]);
  };

  // Basic mock states for interactive toggles
  const [toggles, setToggles] = useState({
    expireLinks: false,
    webinarMode: false,
    meetingMode: true,
    monetizationOn: true,
    taxInvoicing: true,
    watermark: false,
    autoReceipt: true,
    emailReminders: true,
    smsReminders: false,
    confirmationEmail: true,
    followUpEmail: false,
    hostNotification: true,
    cancelAlerts: true,
    dailyDigest: false,
    twoFactor: true,
    meetingLocks: false,
    waitingRoom: true,
    autoRedact: false,
    recordingConsent: true,
    anonymizeData: false,
    googleCal: true,
    slack: false,
    stripe: false,
    inviteePortal: true,
    inviteeAuth: false,
    inviteeEmailValidation: true,
    inviteeWhatsappValidation: false,
    allowPreMeetingQuestions: true,
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['General', 'Branding', 'Team', 'Integrations', 'Monetization', 'Notifications', 'Invitee', 'Security', 'Data'];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
          <p className="text-slate-500">Configure your workspace and preferences.</p>
        </div>
      </div>

      <div className="flex overflow-x-auto border-b border-slate-200 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-slide-in">

        {/* GENERAL TAB */}
        {activeTab === 'General' && (
          <div className="p-6 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Globe className="text-blue-500" /> General Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Default Meeting Duration</label>
                <div className="flex gap-2">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white"
                  >
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>45 min</option>
                    <option>60 min</option>
                    <option>Custom</option>
                  </select>
                  {duration === 'Custom' && (
                    <input
                      type="number"
                      placeholder="min"
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      className="w-24 px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm outline-none bg-white"
                    />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">Sets default length for new event types.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Default Buffer Time</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white">
                  <option>0 min</option>
                  <option>5 min</option>
                  <option>10 min</option>
                  <option>15 min</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Adds padding between meetings.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Default Time Zone</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>PT (Pacific Time)</option>
                  <option>ET (Eastern Time)</option>
                  <option>IST (India Standard Time)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Organization-wide timezone fallback.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Language / Locale</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">UI and email language fallback.</p>
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-800">Meeting Link Expiration</h4>
                    <p className="text-sm text-slate-500">Auto-expire unused meeting links.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <select
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        disabled={!toggles.expireLinks}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white disabled:opacity-50"
                      >
                        <option>24 Hours</option>
                        <option>7 Days</option>
                        <option>Never</option>
                        <option>Custom</option>
                      </select>
                      {expiry === 'Custom' && (
                        <input
                          type="number"
                          placeholder="days"
                          value={customExpiry}
                          onChange={(e) => setCustomExpiry(e.target.value)}
                          disabled={!toggles.expireLinks}
                          className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg sm:text-sm outline-none bg-white disabled:opacity-50"
                        />
                      )}
                    </div>
                    <ToggleSwitch checked={toggles.expireLinks} onChange={() => handleToggle('expireLinks')} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start of Week</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white">
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Calendar grid orientation.</p>
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-semibold text-slate-700">Meeting & Webinar Modes</h4>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-800">Webinar Mode</h4>
                    <p className="text-sm text-slate-500">Only host can be a participant.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-slate-600">Max Joiners:</label>
                      <input type="number" placeholder="100" disabled={!toggles.webinarMode} className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none bg-white disabled:opacity-50" />
                    </div>
                    <ToggleSwitch checked={toggles.webinarMode} onChange={() => handleToggle('webinarMode')} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-800">Meeting Mode</h4>
                    <p className="text-sm text-slate-500">All can be participants.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-slate-600">Max Joiners:</label>
                      <input type="number" placeholder="50" disabled={!toggles.meetingMode} className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none bg-white disabled:opacity-50" />
                    </div>
                    <ToggleSwitch checked={toggles.meetingMode} onChange={() => handleToggle('meetingMode')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BRANDING TAB */}
        {activeTab === 'Branding' && (
          <div className="p-6 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Palette className="text-pink-500" /> Branding</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Logo Upload</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xl">M</div>
                      <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Upload Logo</button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Favicon Upload</label>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 border-2 border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs">ico</div>
                      <button className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Upload</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-[#4F46E5] shadow-sm"></div>
                      <input type="text" defaultValue="#4F46E5" className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg sm:text-sm outline-none" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-[#7C3AED] shadow-sm"></div>
                      <input type="text" defaultValue="#7C3AED" className="block w-full px-3 py-1.5 border border-slate-200 rounded-lg sm:text-sm outline-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Font Selection</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-white">
                    <option>Inter</option>
                    <option>Roboto</option>
                    <option>Open Sans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                  <div className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer transition-colors">
                    <span className="flex items-center gap-2 text-sm"><ImageIcon size={16} /> Click to upload background image</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h4 className="font-medium text-slate-800 flex items-center gap-2">"Powered by Meetly" Watermark <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Pro</span></h4>
                    <p className="text-sm text-slate-500">Remove platform branding.</p>
                  </div>
                  <ToggleSwitch checked={toggles.watermark} onChange={() => handleToggle('watermark')} />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">Custom Domain <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Pro</span></label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="book.yourbrand.com"
                      value={customDomain}
                      onChange={(e) => {
                        setCustomDomain(e.target.value);
                        setCustomDomainStatus('unverified');
                      }}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none"
                    />
                    <button
                      onClick={() => setDomainModalOpen(true)}
                      disabled={!customDomain}
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50"
                    >
                      Verify
                    </button>
                  </div>
                  {customDomainStatus === 'verified' ? (
                    <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1"><Check size={12} /> DNS Verified</p>
                  ) : (
                    <p className="text-xs text-slate-500 mt-2">Map your custom booking domain.</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">Custom Email Sender Domain <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Pro</span></label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="yourdomain.com"
                      value={customEmail}
                      onChange={(e) => {
                        setCustomEmail(e.target.value);
                        setCustomEmailStatus('unverified');
                      }}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none"
                    />
                    <button
                      onClick={() => setEmailModalOpen(true)}
                      disabled={!customEmail}
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-50"
                    >
                      Verify
                    </button>
                  </div>
                  {customEmailStatus === 'verified' ? (
                    <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1"><Check size={12} /> DNS Verified</p>
                  ) : (
                    <p className="text-xs text-slate-500 mt-2">Send emails from your domain.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'Team' && (
          <div className="p-6 space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="text-purple-500" /> Team Management
                <InfoTooltip content="Advanced team roles and permissions are out of scope for the MVP." />
              </h3>
              <button onClick={() => setInviteModalOpen(true)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
                <UserPlus size={16} /> Invite Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 border border-slate-200 rounded-xl">
                <label className="block text-sm font-medium text-slate-700 mb-1">Default Role for New Users</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm bg-white">
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="md:col-span-2 p-4 border border-slate-200 rounded-xl overflow-x-auto scrollbar-hide">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Team Round-Robin Order</h4>
                <div className="flex items-center gap-2 min-w-max">
                  {roundRobinOrder.map((user, index) => (
                    <div key={user.id} className={`group flex items-center px-2 py-1 rounded-full text-xs font-medium border ${index === 0 ? 'bg-indigo-50 text-primary border-indigo-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <button
                        onClick={() => moveRoundRobin(index, 'left')}
                        disabled={index === 0}
                        className={`px-1 mr-1 rounded ${index === 0 ? 'opacity-0' : 'hover:bg-slate-200 opacity-50 group-hover:opacity-100'}`}
                      >&lt;</button>
                      <span>{index + 1}. {user.name}</span>
                      <button
                        onClick={() => moveRoundRobin(index, 'right')}
                        disabled={index === roundRobinOrder.length - 1}
                        className={`px-1 ml-1 rounded ${index === roundRobinOrder.length - 1 ? 'opacity-0' : 'hover:bg-slate-200 opacity-50 group-hover:opacity-100'}`}
                      >&gt;</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Integrations</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamMembers.map(member => (
                    <React.Fragment key={member.id}>
                      <tr className={editingUser === member.id ? 'bg-slate-50' : ''}>
                        <td className="px-4 py-3 flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/150?u=${member.avatar}`} alt={member.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium text-slate-800">{member.name}</div>
                            <div className="text-xs text-slate-500">{member.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <select defaultValue={member.role} className="px-2 py-1 border border-slate-200 rounded bg-white text-xs">
                            <option>Admin</option>
                            <option>Editor</option>
                            <option>Viewer</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          {member.status === 'Connected' ? (
                            <div className="flex items-center gap-2">
                              <div className="group relative z-10">
                                <CalendarDays size={16} className="text-blue-500 cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Calendar (Connected)</div>
                              </div>
                              <div className="group relative z-10">
                                <Hash size={16} className="text-[#E01E5A] cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Slack (Connected)</div>
                              </div>
                              <div className="group relative z-10">
                                <Mail size={16} className="text-red-500 cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Gmail (Connected)</div>
                              </div>
                              <div className="group relative z-10">
                                <Layout size={16} className="text-slate-300 cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Jira (Disconnected)</div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="group relative z-10">
                                <CalendarDays size={16} className="text-slate-300 cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Calendar (Disconnected)</div>
                              </div>
                              <div className="group relative z-10">
                                <Hash size={16} className="text-[#E01E5A] cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Slack (Connected)</div>
                              </div>
                              <div className="group relative z-10">
                                <Mail size={16} className="text-slate-300 cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Gmail (Disconnected)</div>
                              </div>
                              <div className="group relative z-10">
                                <Layout size={16} className="text-slate-300 cursor-pointer" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Jira (Disconnected)</div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingUser(editingUser === member.id ? null : member.id)}
                            className={`${editingUser === member.id ? 'text-primary' : 'text-slate-400'} hover:text-primary transition-colors`}
                          >
                            <Edit size={16} />
                          </button>
                          {member.id !== '1' && (
                            <button className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                          )}
                        </td>
                      </tr>
                      {editingUser === member.id && (
                        <tr className="bg-slate-50 border-b-0">
                          <td colSpan="4" className="px-4 py-4 border-t border-slate-200">
                            <h4 className="font-medium text-slate-800 mb-4 text-sm">Permissions for {member.name.split(' ')[0]}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                              <div className="space-y-3">
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bookings & Events</h5>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Own Scheduler page</span>
                                </label>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can manage global event templates</span>
                                </label>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin' || member.role === 'Editor'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can view all team bookings</span>
                                </label>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin' || member.role === 'Editor'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can reassign bookings</span>
                                </label>
                              </div>

                              <div className="space-y-3">
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monetization</h5>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin' || member.role === 'Editor'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can edit pricing & fees</span>
                                </label>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can view team revenue analytics</span>
                                </label>
                              </div>

                              <div className="space-y-3">
                                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Administrative</h5>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can manage integrations</span>
                                </label>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can invite/remove members</span>
                                </label>
                                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                                  <input type="checkbox" defaultChecked={member.role === 'Admin'} className="mt-1 rounded text-primary focus:ring-primary" />
                                  <span>Can export data</span>
                                </label>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INTEGRATIONS TAB */}
        {activeTab === 'Integrations' && (
          <div className="p-6 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Puzzle className="text-orange-500" /> Integrations</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Admin Allowed Integrations</h4>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded flex items-center justify-center">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Google Calendar</h5>
                      <p className="text-xs text-slate-500">Sync availability across team</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={toggles.googleCal} onChange={() => handleToggle('googleCal')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Gmail</h5>
                      <p className="text-xs text-slate-500">Send custom invitations</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={toggles.gmail} onChange={() => handleToggle('gmail')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#E01E5A]/10 text-[#E01E5A] rounded flex items-center justify-center">
                      <Hash size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Slack</h5>
                      <p className="text-xs text-slate-500">Team notifications & updates</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={toggles.slack} onChange={() => handleToggle('slack')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded flex items-center justify-center">
                      <Layout size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">Jira</h5>
                      <p className="text-xs text-slate-500">Create tickets from bookings</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={toggles.jira} onChange={() => handleToggle('jira')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded flex items-center justify-center">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">WhatsApp</h5>
                      <p className="text-xs text-slate-500">SMS & WhatsApp reminders</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={toggles.whatsapp} onChange={() => handleToggle('whatsapp')} />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">API & Webhooks</h4>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-sm font-bold text-slate-800">API Keys</h5>
                    <button className="text-xs text-primary font-medium">Generate New</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-mono text-slate-600">sk_live_51M...8xZ2</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Created: Jan 12, 2026</div>
                    </div>
                    <button className="text-xs text-red-500 hover:underline">Revoke</button>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h5 className="text-sm font-bold text-slate-800 mb-2">Embed SDK</h5>
                  <p className="text-xs text-slate-500 mb-3">Copy-paste code blocks to embed your booking widget.</p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-emerald-400 text-xs p-3 rounded-lg overflow-x-auto">
                      <code>{`<script src="https://meetly.mock/sdk.js"></script>\n<meetly-widget user="alex"></meetly-widget>`}</code>
                    </pre>
                    <button className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[10px]">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MONETIZATION TAB */}
        {activeTab === 'Monetization' && (
          <div className="p-6 space-y-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><CreditCard className="text-emerald-500" /> Monetization</h3>
                <p className="text-sm text-slate-500 mt-1">Enable payments to charge for bookings and consultations.</p>
              </div>
              <ToggleSwitch checked={toggles.monetizationOn} onChange={() => handleToggle('monetizationOn')} />
            </div>

            {toggles.monetizationOn && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                  <div className="space-y-6">

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Payment Gateways</h4>

                      <div className="p-6 border border-slate-200 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-sm">S</div>
                          <h4 className="font-bold text-slate-800">Stripe Connect</h4>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Accept credit cards securely worldwide. Instant payouts.</p>
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm w-full">Connect with Stripe</button>
                      </div>

                      <div className="p-6 border border-slate-200 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#02042B] rounded flex items-center justify-center text-white font-bold text-sm">R</div>
                          <h4 className="font-bold text-slate-800">Razorpay</h4>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">Accept UPI, cards, and wallets. Best for Indian customers.</p>
                        <button className="px-4 py-2 bg-[#02042B] text-white text-sm font-medium rounded-lg hover:bg-[#12143B] shadow-sm w-full">Connect with Razorpay</button>
                      </div>
                    </div>

                  </div>

                  <div className="space-y-6">

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Invoice & Tax Settings</h4>

                      <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-slate-800 text-sm">Enable Tax Invoicing</h5>
                            <p className="text-xs text-slate-500">Collect tax info and generate legal invoices.</p>
                          </div>
                          <ToggleSwitch checked={toggles.taxInvoicing} onChange={() => handleToggle('taxInvoicing')} />
                        </div>

                        {toggles.taxInvoicing && (
                          <div className="pt-4 border-t border-slate-100 space-y-3 animate-fade-in">
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Business Name</label>
                              <input type="text" placeholder="e.g. Meetly Inc." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Tax ID Type</label>
                                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:border-primary">
                                  <option>GSTIN (India)</option>
                                  <option>VAT (EU/UK)</option>
                                  <option>EIN (US)</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Tax ID Number</label>
                                <input type="text" placeholder="e.g. 22AAAAA0000A1Z5" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h4 className="font-medium text-slate-800 text-sm">Global Price Templates</h4>
                        <button className="text-xs text-primary font-medium flex items-center gap-1"><Plus size={14} /> Add New</button>
                      </div>
                      <table className="w-full text-left text-sm bg-white">
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-700">1 Hour Strategy</td>
                            <td className="px-4 py-3 text-slate-500">$50.00</td>
                            <td className="px-4 py-3 text-right"><button className="text-slate-400 hover:text-primary"><Edit size={16} /></button></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-700">Quick Consult</td>
                            <td className="px-4 py-3 text-slate-500">$25.00</td>
                            <td className="px-4 py-3 text-right"><button className="text-slate-400 hover:text-primary"><Edit size={16} /></button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                      <div>
                        <h4 className="font-medium text-slate-800 text-sm">Auto-send Receipt</h4>
                        <p className="text-xs text-slate-500">Post-payment documentation.</p>
                      </div>
                      <ToggleSwitch checked={toggles.autoReceipt} onChange={() => handleToggle('autoReceipt')} />
                    </div>
                  </div>
                </div>

                {/* Full Width Section */}
                <div className="space-y-4 pt-6 border-t border-slate-100 mt-8">
                  <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Payment Notifications</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['success', 'failed', 'pending'].map((type) => (
                      <div key={type} className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm space-y-4 flex flex-col transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-slate-800 text-sm capitalize">Payment {type}</h5>
                            <p className="text-[10px] text-slate-500 mt-1">Notify when a payment is {type}.</p>
                          </div>
                          <ToggleSwitch
                            checked={paymentAlertSettings[type].enabled}
                            onChange={() => setPaymentAlertSettings({ ...paymentAlertSettings, [type]: { ...paymentAlertSettings[type], enabled: !paymentAlertSettings[type].enabled } })}
                          />
                        </div>

                        {paymentAlertSettings[type].enabled && (
                          <div className="pt-4 border-t border-slate-100 animate-slide-up flex flex-col gap-4 flex-1">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
                                <select
                                  value={paymentAlertSettings[type].channel}
                                  onChange={(e) => setPaymentAlertSettings({ ...paymentAlertSettings, [type]: { ...paymentAlertSettings[type], channel: e.target.value } })}
                                  className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-slate-50 outline-none"
                                >
                                  <option>Email</option>
                                  <option>WhatsApp</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target</label>
                                <select
                                  value={paymentAlertSettings[type].target}
                                  onChange={(e) => setPaymentAlertSettings({ ...paymentAlertSettings, [type]: { ...paymentAlertSettings[type], target: e.target.value } })}
                                  className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-slate-50 outline-none"
                                >
                                  <option>Invitee</option>
                                  <option>Host</option>
                                  <option>Both</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex items-end pb-0.5">
                              <button
                                onClick={() => setPaymentAlertSettings({ ...paymentAlertSettings, [type]: { ...paymentAlertSettings[type], isEditing: !paymentAlertSettings[type].isEditing } })}
                                className={`text-sm font-medium flex items-center gap-1 ${paymentAlertSettings[type].isEditing ? 'text-indigo-700' : 'text-primary hover:text-indigo-700'}`}
                              >
                                <Edit size={14} /> {paymentAlertSettings[type].isEditing ? 'Close Template' : 'Edit Template'}
                              </button>
                            </div>

                            {paymentAlertSettings[type].isEditing && (
                              <div className="mt-2 flex-1 flex flex-col">
                                <textarea
                                  value={paymentAlertSettings[type].template}
                                  onChange={(e) => setPaymentAlertSettings({ ...paymentAlertSettings, [type]: { ...paymentAlertSettings[type], template: e.target.value } })}
                                  className="w-full flex-1 min-h-[80px] px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary resize-none font-mono bg-slate-50"
                                  placeholder="Write your custom message here..."
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'Notifications' && (
          <div className="p-6 space-y-8 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Bell className="text-amber-500" /> Notifications & Reminders</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">Automated Workflows</h4>
                  <p className="text-xs text-slate-500">Send custom reminders and follow-ups to hosts and invitees via Email or WhatsApp.</p>
                </div>
                <button
                  onClick={() => {
                    setReminders([...reminders, {
                      id: Date.now().toString(),
                      time: '60 Minutes Before',
                      type: 'Email',
                      target: 'Invitee',
                      isCustomTime: false,
                      isEditingTemplate: false,
                      templateContent: 'Reminder: Your meeting with {{host.name}} starts in 60 minutes.\nJoin here: {{meeting.link}}'
                    }]);
                  }}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-1"
                >
                  <Plus size={14} /> Add Notification
                </button>
              </div>

              <div className="space-y-3">
                {reminders.map((reminder, idx) => (
                  <div key={reminder.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col transition-all">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Trigger Time</label>
                          {!reminder.isCustomTime ? (
                            <select
                              value={reminder.time}
                              onChange={(e) => {
                                const val = e.target.value;
                                const newRems = [...reminders];
                                if (val === 'Custom...') {
                                  newRems[idx].isCustomTime = true;
                                  newRems[idx].customValue = '10';
                                  newRems[idx].customUnit = 'Minutes';
                                  newRems[idx].customRelation = 'Before';
                                } else {
                                  newRems[idx].time = val;
                                }
                                setReminders(newRems);
                              }}
                              className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-slate-50 outline-none"
                            >
                              <option>At time of booking</option>
                              <option>15 Minutes Before</option>
                              <option>60 Minutes Before</option>
                              <option>24 Hours Before</option>
                              <option>1 Hour After (Follow-up)</option>
                              <option>1 Day After (Follow-up)</option>
                              <option value="Custom...">Custom...</option>
                            </select>
                          ) : (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={reminder.customValue || ''}
                                onChange={(e) => {
                                  const newRems = [...reminders];
                                  newRems[idx].customValue = e.target.value;
                                  setReminders(newRems);
                                }}
                                className="w-10 px-1 py-1.5 border border-slate-200 rounded text-xs outline-none text-center bg-slate-50"
                              />
                              <select
                                value={reminder.customUnit || 'Minutes'}
                                onChange={(e) => {
                                  const newRems = [...reminders];
                                  newRems[idx].customUnit = e.target.value;
                                  setReminders(newRems);
                                }}
                                className="w-[70px] px-0 py-1.5 border border-slate-200 rounded text-[10px] outline-none bg-slate-50"
                              >
                                <option>Minutes</option>
                                <option>Hours</option>
                                <option>Days</option>
                              </select>
                              <select
                                value={reminder.customRelation || 'Before'}
                                onChange={(e) => {
                                  const newRems = [...reminders];
                                  newRems[idx].customRelation = e.target.value;
                                  setReminders(newRems);
                                }}
                                className="w-[60px] px-0 py-1.5 border border-slate-200 rounded text-[10px] outline-none bg-slate-50"
                              >
                                <option>Before</option>
                                <option>After</option>
                              </select>
                              <button
                                onClick={() => {
                                  const newRems = [...reminders];
                                  newRems[idx].isCustomTime = false;
                                  newRems[idx].time = '15 Minutes Before';
                                  setReminders(newRems);
                                }}
                                className="text-slate-400 hover:text-slate-600 ml-1"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
                          <select
                            value={reminder.type}
                            onChange={(e) => {
                              const newRems = [...reminders];
                              newRems[idx].type = e.target.value;
                              setReminders(newRems);
                            }}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-slate-50 outline-none"
                          >
                            <option>Email</option>
                            <option>WhatsApp</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target</label>
                          <select
                            value={reminder.target}
                            onChange={(e) => {
                              const newRems = [...reminders];
                              newRems[idx].target = e.target.value;
                              setReminders(newRems);
                            }}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-slate-50 outline-none"
                          >
                            <option>Invitee</option>
                            <option>Host</option>
                            <option>Both (Host & Invitee)</option>
                          </select>
                        </div>

                        <div className="flex items-end h-full pb-0.5">
                          <button
                            onClick={() => {
                              const newRems = [...reminders];
                              newRems[idx].isEditingTemplate = !newRems[idx].isEditingTemplate;
                              setReminders(newRems);
                            }}
                            className={`text-sm font-medium flex items-center gap-1 ${reminder.isEditingTemplate ? 'text-indigo-700' : 'text-primary hover:text-indigo-700'}`}
                          >
                            <Edit size={14} /> {reminder.isEditingTemplate ? 'Close Template' : 'Edit Template'}
                          </button>
                        </div>

                      </div>

                      <button
                        onClick={() => setReminders(reminders.filter(r => r.id !== reminder.id))}
                        className="text-slate-300 hover:text-red-500 transition-colors p-2 h-full flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {reminder.isEditingTemplate && (
                      <div className="mt-4 pt-4 border-t border-slate-100 animate-slide-up">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider">Message Template</label>
                          <div className="text-[10px] text-slate-500 flex gap-2">
                            Variables:
                            <span className="bg-slate-100 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-200">{`{{invitee.name}}`}</span>
                            <span className="bg-slate-100 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-200">{`{{host.name}}`}</span>
                            <span className="bg-slate-100 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-200">{`{{meeting.time}}`}</span>
                            <span className="bg-slate-100 px-1 py-0.5 rounded cursor-pointer hover:bg-slate-200">{`{{meeting.link}}`}</span>
                          </div>
                        </div>
                        <textarea
                          value={reminder.templateContent}
                          onChange={(e) => {
                            const newRems = [...reminders];
                            newRems[idx].templateContent = e.target.value;
                            setReminders(newRems);
                          }}
                          className="w-full h-24 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary resize-none font-mono bg-slate-50"
                          placeholder="Write your custom message here..."
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Global Email Settings</h4>
                <div className="pt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custom Sender Name</label>
                  <input type="text" placeholder="Meetly" defaultValue="Alex from Meetly" className="block w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none" />
                  <p className="text-xs text-slate-500 mt-1">Override default sender display name.</p>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Daily Digest Email</h5>
                    <p className="text-xs text-slate-500 mt-1">End-of-day summary of upcoming meetings</p>
                  </div>
                  <ToggleSwitch checked={toggles.dailyDigest} onChange={() => handleToggle('dailyDigest')} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Host Platform Alerts</h4>

                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm">New Booking Alert</h5>
                      <p className="text-xs text-slate-500 mt-1">Alert host when a booking is made</p>
                    </div>
                    <ToggleSwitch checked={toggles.hostNotification} onChange={() => handleToggle('hostNotification')} />
                  </div>

                  {toggles.hostNotification && (
                    <div className="pt-4 border-t border-slate-200 animate-slide-up grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
                        <select
                          value={hostAlertSettings.newBooking.channel}
                          onChange={(e) => setHostAlertSettings({ ...hostAlertSettings, newBooking: { ...hostAlertSettings.newBooking, channel: e.target.value } })}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-white outline-none"
                        >
                          <option>Email</option>
                          <option>WhatsApp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target</label>
                        <select
                          value={hostAlertSettings.newBooking.target}
                          onChange={(e) => setHostAlertSettings({ ...hostAlertSettings, newBooking: { ...hostAlertSettings.newBooking, target: e.target.value } })}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-white outline-none"
                        >
                          <option>Host</option>
                          <option>Invitee</option>
                          <option>Both (Host & Invitee)</option>
                        </select>
                      </div>

                      <div className="flex items-end pb-0.5">
                        <button
                          onClick={() => setHostAlertSettings({ ...hostAlertSettings, newBooking: { ...hostAlertSettings.newBooking, isEditing: !hostAlertSettings.newBooking.isEditing } })}
                          className={`text-sm font-medium flex items-center gap-1 ${hostAlertSettings.newBooking.isEditing ? 'text-indigo-700' : 'text-primary hover:text-indigo-700'}`}
                        >
                          <Edit size={14} /> {hostAlertSettings.newBooking.isEditing ? 'Close Template' : 'Edit Template'}
                        </button>
                      </div>

                      {hostAlertSettings.newBooking.isEditing && (
                        <div className="col-span-1 md:col-span-3 mt-2">
                          <textarea
                            value={hostAlertSettings.newBooking.template}
                            onChange={(e) => setHostAlertSettings({ ...hostAlertSettings, newBooking: { ...hostAlertSettings.newBooking, template: e.target.value } })}
                            className="w-full h-20 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary resize-none font-mono bg-white"
                            placeholder="Write your custom message here..."
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm">Cancel/Reschedule Alerts</h5>
                      <p className="text-xs text-slate-500 mt-1">Notify host on changes</p>
                    </div>
                    <ToggleSwitch checked={toggles.cancelAlerts} onChange={() => handleToggle('cancelAlerts')} />
                  </div>

                  {toggles.cancelAlerts && (
                    <div className="pt-4 border-t border-slate-200 animate-slide-up grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Channel</label>
                        <select
                          value={hostAlertSettings.cancelReschedule.channel}
                          onChange={(e) => setHostAlertSettings({ ...hostAlertSettings, cancelReschedule: { ...hostAlertSettings.cancelReschedule, channel: e.target.value } })}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-white outline-none"
                        >
                          <option>Email</option>
                          <option>WhatsApp</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target</label>
                        <select
                          value={hostAlertSettings.cancelReschedule.target}
                          onChange={(e) => setHostAlertSettings({ ...hostAlertSettings, cancelReschedule: { ...hostAlertSettings.cancelReschedule, target: e.target.value } })}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm bg-white outline-none"
                        >
                          <option>Host</option>
                          <option>Invitee</option>
                          <option>Both (Host & Invitee)</option>
                        </select>
                      </div>

                      <div className="flex items-end pb-0.5">
                        <button
                          onClick={() => setHostAlertSettings({ ...hostAlertSettings, cancelReschedule: { ...hostAlertSettings.cancelReschedule, isEditing: !hostAlertSettings.cancelReschedule.isEditing } })}
                          className={`text-sm font-medium flex items-center gap-1 ${hostAlertSettings.cancelReschedule.isEditing ? 'text-indigo-700' : 'text-primary hover:text-indigo-700'}`}
                        >
                          <Edit size={14} /> {hostAlertSettings.cancelReschedule.isEditing ? 'Close Template' : 'Edit Template'}
                        </button>
                      </div>

                      {hostAlertSettings.cancelReschedule.isEditing && (
                        <div className="col-span-1 md:col-span-3 mt-2">
                          <textarea
                            value={hostAlertSettings.cancelReschedule.template}
                            onChange={(e) => setHostAlertSettings({ ...hostAlertSettings, cancelReschedule: { ...hostAlertSettings.cancelReschedule, template: e.target.value } })}
                            className="w-full h-20 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-primary resize-none font-mono bg-white"
                            placeholder="Write your custom message here..."
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* INVITEE TAB */}
        {activeTab === 'Invitee' && (
          <div className="p-6 space-y-8 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><UserPlus className="text-indigo-500" /> Invitee Experience</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Portal & Authentication</h4>

                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm">Invitee Portal</h5>
                      <p className="text-xs text-slate-500 mt-1">Allow invitees to view their past and upcoming meetings.</p>
                    </div>
                    <ToggleSwitch checked={toggles.inviteePortal} onChange={() => handleToggle('inviteePortal')} />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm">Email Validation (OTP)</h5>
                      <p className="text-xs text-slate-500 mt-1">Send a verification code to confirm invitee email.</p>
                    </div>
                    <ToggleSwitch checked={toggles.inviteeEmailValidation} onChange={() => handleToggle('inviteeEmailValidation')} />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm">WhatsApp Validation (OTP)</h5>
                      <p className="text-xs text-slate-500 mt-1">Send a verification code to confirm invitee phone number.</p>
                    </div>
                    <ToggleSwitch checked={toggles.inviteeWhatsappValidation} onChange={() => handleToggle('inviteeWhatsappValidation')} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Pre-Meeting Questions</h4>

                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div>
                      <h5 className="font-medium text-slate-800 text-sm">Allow Pre-Meeting Questions</h5>
                      <p className="text-xs text-slate-500 mt-1">If enabled, team members can add custom pre-meeting questions to their booking pages.</p>
                    </div>
                    <ToggleSwitch checked={toggles.allowPreMeetingQuestions} onChange={() => handleToggle('allowPreMeetingQuestions')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'Security' && (
          <div className="p-6 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Shield className="text-emerald-600" /> Security</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Access & Auth</h4>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Two-Factor Authentication (2FA)</h5>
                    <p className="text-xs text-slate-500 mt-1">Force all users to use MFA</p>
                  </div>
                  <ToggleSwitch checked={toggles.twoFactor} onChange={() => handleToggle('twoFactor')} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Session Timeout</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm bg-white">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>4 Hours</option>
                  </select>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl">
                  <h5 className="font-medium text-slate-800 text-sm mb-3">Password Policy</h5>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked className="rounded text-primary" /> Min 8 characters</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked className="rounded text-primary" /> Require special character</label>
                    <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked className="rounded text-primary" /> Require numbers</label>
                  </div>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Single Sign-On (SSO)</h5>
                    <p className="text-xs text-slate-500 mt-1">Okta, Azure AD, Google</p>
                  </div>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-sm">Setup</button>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Meeting Protection</h4>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Meeting Locks</h5>
                    <p className="text-xs text-slate-500 mt-1">Require passcode for all meetings</p>
                  </div>
                  <ToggleSwitch checked={toggles.meetingLocks} onChange={() => handleToggle('meetingLocks')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Waiting Room</h5>
                    <p className="text-xs text-slate-500 mt-1">Screen attendees before entry</p>
                  </div>
                  <ToggleSwitch checked={toggles.waitingRoom} onChange={() => handleToggle('waitingRoom')} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">IP Allowlist</label>
                  <textarea rows="3" placeholder="192.168.1.1, 10.0.0.0/24" className="block w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none resize-none"></textarea>
                  <p className="text-xs text-slate-500 mt-1">Comma-separated IPs to restrict access.</p>
                </div>

                <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Database size={16} /> View Audit Logs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DATA TAB */}
        {activeTab === 'Data' && (
          <div className="p-6 space-y-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Server className="text-teal-500" /> Data & Privacy</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Retention Policies</h4>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Recording Retention</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm bg-white">
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>Forever</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Transcript Retention</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm bg-white">
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>Forever</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Backup Frequency</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg sm:text-sm bg-white">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-slate-700 border-b border-slate-100 pb-2">Privacy & Compliance</h4>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Auto-Redact PII</h5>
                    <p className="text-xs text-slate-500 mt-1">Blur credit cards/emails in transcripts</p>
                  </div>
                  <ToggleSwitch checked={toggles.autoRedact} onChange={() => handleToggle('autoRedact')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Recording Consent</h5>
                    <p className="text-xs text-slate-500 mt-1">Require consent before recording (GDPR)</p>
                  </div>
                  <ToggleSwitch checked={toggles.recordingConsent} onChange={() => handleToggle('recordingConsent')} />
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">Anonymize Data</h5>
                    <p className="text-xs text-slate-500 mt-1">Remove personal names from analytics</p>
                  </div>
                  <ToggleSwitch checked={toggles.anonymizeData} onChange={() => handleToggle('anonymizeData')} />
                </div>

                <div className="pt-2 space-y-3">
                  <button className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                    <Download size={16} /> Export All Data (ZIP)
                  </button>
                  <button className="w-full py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <Trash2 size={16} /> Delete Account Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <DnsVerificationModal
        isOpen={domainModalOpen}
        onClose={() => setDomainModalOpen(false)}
        title="Verify Custom Domain"
        domain={customDomain}
        type="domain"
        onVerify={() => setCustomDomainStatus('verified')}
      />

      <DnsVerificationModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        title="Verify Email Sender Domain"
        domain={customEmail}
        type="email"
        onVerify={() => setCustomEmailStatus('verified')}
      />

      <InviteMemberModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
