export const users = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=1',
    email: 'alex.j@meetly.mock',
    plan: 'Plus'
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
    date: '2026-06-28T11:00:00Z',
    host: 'Samantha Smith',
    participantsCount: 5,
    duration: '1h',
    recording: false,
    summary: '',
    type: 'Webinar',
    isPaid: true,
    price: 50,
    status: 'Scheduled',
    session: 1,
    invitees: [
      { name: 'John Doe', email: 'john@example.com', status: 'Confirmed' },
      { name: 'Jane Doe', email: 'jane@example.com', status: 'Declined' },
      { name: 'Bob Smith', email: 'bob@example.com', status: 'Pending' }
    ]
  },
  {
    id: 'm2',
    date: '2026-06-30T15:30:00Z',
    host: 'Maria Garcia',
    participantsCount: 2,
    duration: '30m',
    recording: false,
    summary: '',
    type: 'Meeting',
    isPaid: false,
    status: 'Scheduled',
    session: 1,
    invitees: [
      { name: 'Alex Johnson', email: 'alex@example.com', status: 'Pending' },
      { name: 'David Lee', email: 'david@example.com', status: 'Confirmed' }
    ]
  },
  {
    id: 'm3',
    date: '2026-06-22T14:30:00Z',
    host: 'Alex Johnson',
    participantsCount: 12,
    duration: '1h 15m',
    recording: true,
    summary: 'Team sync, resolved blockers for Meetly v2.',
    transcription: '00:00 Alex: Welcome to the v2 sync. 00:15 David: We have a blocker on the API side...',
    type: 'Webinar',
    isPaid: true,
    price: 150,
    status: 'Completed',
    session: 1,
    participants: [
      { name: 'David Lee', email: 'david@example.com', joinTime: '02:28 PM', leaveTime: '03:45 PM' },
      { name: 'Maria Garcia', email: 'maria@example.com', joinTime: '02:30 PM', leaveTime: '03:45 PM' },
      { name: 'John Doe', email: 'john@example.com', joinTime: '02:35 PM', leaveTime: '03:40 PM' }
    ]
  },
  {
    id: 'm4',
    date: '2026-06-25T10:00:00Z',
    host: 'Alex Johnson',
    participantsCount: 4,
    duration: '45m',
    recording: true,
    summary: 'Discussed Q3 roadmap and feature highlights. Team is aligned on the new timeline.',
    transcription: '00:00 Alex: Hi everyone, let\'s get started. 00:05 Samantha: Sounds good. 00:10 Alex: So the Q3 roadmap...',
    type: 'Meeting',
    isPaid: false,
    status: 'Completed',
    session: 1,
    participants: [
      { name: 'Samantha Smith', email: 'samantha@example.com', joinTime: '10:00 AM', leaveTime: '10:45 AM' },
      { name: 'David Lee', email: 'david@example.com', joinTime: '10:02 AM', leaveTime: '10:45 AM' },
      { name: 'Maria Garcia', email: 'maria@example.com', joinTime: '10:05 AM', leaveTime: '10:45 AM' }
    ]
  },
  {
    id: 'm5',
    date: '2026-06-21T13:00:00Z',
    host: 'Alex Johnson',
    participantsCount: 50,
    duration: '2h',
    recording: true,
    summary: 'Company all-hands.',
    transcription: 'Part 1: State of the company. Part 2: Q&A session.',
    type: 'Webinar',
    isPaid: false,
    status: 'Completed',
    session: 1,
    sessions: [
      { id: 's1', startTime: '1:00 PM', endTime: '2:00 PM', date: '2026-06-21', duration: '1h' },
      { id: 's2', startTime: '2:00 PM', endTime: '3:00 PM', date: '2026-06-21', duration: '1h' }
    ],
    participants: [
      { name: 'Employee A', email: 'empa@example.com', joinTime: '01:00 PM', leaveTime: '03:00 PM' },
      { name: 'Employee B', email: 'empb@example.com', joinTime: '01:05 PM', leaveTime: '02:55 PM' },
      { name: 'Employee C', email: 'empc@example.com', joinTime: '01:10 PM', leaveTime: '03:00 PM' },
      { name: 'Employee D', email: 'empd@example.com', joinTime: '01:00 PM', leaveTime: '03:00 PM' }
    ]
  },
  {
    id: 'm6',
    date: '2026-06-20T09:00:00Z',
    host: 'Alex Johnson',
    participantsCount: 2,
    duration: '30m',
    recording: false,
    summary: '1-on-1 with product manager.',
    type: 'Meeting',
    isPaid: false,
    status: 'Cancelled',
    session: 1,
    cancelledBy: 'Alex Johnson',
    cancelReason: 'Unexpected conflict came up. Rescheduling for next week.'
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


export const currentUser = users[0];

export const whiteboards = [
  {
    id: 'wb1',
    title: 'Product Roadmap Q3',
    lastModified: '2 hours ago',
    thumbnailColor: 'bg-indigo-100',
    collaborators: [
      { id: 'u1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
      { id: 'u2', name: 'Samantha Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
      { id: 'u3', name: 'David Lee', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' }
    ],
    initialStrokes: [
      {
        color: '#10B981',
        author: 'Samantha',
        points: [
          { x: 200, y: 150 }, { x: 220, y: 100 }, { x: 250, y: 120 }, { x: 270, y: 80 }, { x: 300, y: 130 }, { x: 350, y: 110 }
        ]
      },
      {
        color: '#F59E0B',
        author: 'David',
        points: [
          { x: 200, y: 250 }, { x: 350, y: 250 }, { x: 350, y: 300 }, { x: 200, y: 300 }, { x: 200, y: 250 }
        ]
      },
      {
        color: '#4F46E5',
        author: 'Alex',
        points: [
          { x: 250, y: 260 }, { x: 250, y: 290 }
        ]
      },
      {
        color: '#4F46E5',
        author: 'Alex',
        points: [
          { x: 300, y: 260 }, { x: 300, y: 290 }
        ]
      }
    ]
  },
  {
    id: 'wb2',
    title: 'Architecture Brainstorm',
    lastModified: 'Yesterday',
    thumbnailColor: 'bg-emerald-100'
  },
  {
    id: 'wb3',
    title: 'Design System Review',
    lastModified: '3 days ago',
    thumbnailColor: 'bg-amber-100'
  },
  {
    id: 'wb4',
    title: 'Marketing Campaign',
    lastModified: '1 week ago',
    thumbnailColor: 'bg-rose-100'
  }
];
