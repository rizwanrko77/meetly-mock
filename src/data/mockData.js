export const users = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=1',
    email: 'alex.j@meetly.mock',
    plan: 'Workplace Basic'
  },
  {
    id: '2',
    name: 'Samantha Smith',
    role: 'Host',
    avatar: 'https://i.pravatar.cc/150?u=2',
    email: 'samantha.s@meetly.mock',
    plan: 'Pro'
  },
  {
    id: '3',
    name: 'David Lee',
    role: 'Participant A',
    avatar: 'https://i.pravatar.cc/150?u=3',
    email: 'david.l@meetly.mock',
    plan: 'Free'
  },
  {
    id: '4',
    name: 'Maria Garcia',
    role: 'Participant B',
    avatar: 'https://i.pravatar.cc/150?u=4',
    email: 'maria.g@meetly.mock',
    plan: 'Free'
  }
];

export const meetings = [
  {
    id: 'm1',
    date: '2026-06-25T10:00:00Z',
    host: 'Alex Johnson',
    participantsCount: 4,
    duration: '45m',
    recording: true,
    summary: 'Discussed Q3 roadmap and feature highlights.',
    type: 'Regular meeting'
  },
  {
    id: 'm2',
    date: '2026-06-22T14:30:00Z',
    host: 'Alex Johnson',
    participantsCount: 12,
    duration: '1h 15m',
    recording: true,
    summary: 'Team sync, resolved blockers for Meetly v2.',
    type: 'Webinar'
  },
  {
    id: 'm3',
    date: '2026-06-20T09:00:00Z',
    host: 'Alex Johnson',
    participantsCount: 2,
    duration: '30m',
    recording: false,
    summary: '1-on-1 with product manager.',
    type: 'Personal room'
  }
];

export const eventTypes = [
  {
    id: 'e1',
    name: '15 Min Catch-up',
    duration: 15,
    buffer: 5,
    price: 0,
    active: true
  },
  {
    id: 'e2',
    name: '30 Min Consultation',
    duration: 30,
    buffer: 10,
    price: 0,
    active: true
  },
  {
    id: 'e3',
    name: '1 Hour Strategy Session',
    duration: 60,
    buffer: 15,
    price: 50,
    active: false
  }
];

export const payments = [
  {
    id: 'p1',
    date: '2026-06-01',
    eventName: '1 Hour Strategy Session',
    hostName: 'Alex Johnson',
    inviteeName: 'Samantha Smith',
    inviteeEmail: 'client@example.com',
    amount: 50,
    status: 'Paid'
  },
  {
    id: 'p2',
    date: '2026-06-15',
    eventName: 'Monthly Subscription',
    hostName: 'Meetly Platform',
    inviteeName: 'Alex Johnson',
    inviteeEmail: 'alex.j@meetly.mock',
    amount: 15,
    status: 'Paid'
  }
];

export const chatMessages = [
  {
    id: 'c1',
    sender: 'Alex Johnson',
    text: 'Hey everyone, thanks for joining!',
    timestamp: '10:01 AM'
  },
  {
    id: 'c2',
    sender: 'David Lee',
    text: 'Can you share your screen?',
    timestamp: '10:03 AM'
  },
  {
    id: 'c3',
    sender: 'Maria Garcia',
    text: 'I can see it now.',
    timestamp: '10:04 AM'
  }
];

export const whiteboardStrokes = [
  { type: 'path', color: '#4F46E5', size: 4, coordinates: 'M10 10 H 90 V 90 H 10 Z' },
  { type: 'text', color: '#1E293B', size: 16, coordinates: 'x: 20, y: 50', content: 'Architecture flow' }
];

export const currentUser = users[0];
