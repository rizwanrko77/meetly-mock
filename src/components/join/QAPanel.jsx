import React, { useState } from 'react';
import { HelpCircle, ThumbsUp, MoreVertical, Send, CheckCircle2, PlayCircle } from 'lucide-react';
import { users } from '../../data/mockData';

export function QAPanel() {
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      author: 'Sarah Jenkins', 
      text: 'Will the slides be shared after this session?', 
      upvotes: 8, 
      status: 'Answered',
      hasUpvoted: true,
      time: '10:05 AM'
    },
    { 
      id: 2, 
      author: 'Michael Chen', 
      text: 'Can you elaborate on the new pricing tier?', 
      upvotes: 12, 
      status: 'Answering Live',
      hasUpvoted: false,
      time: '10:12 AM'
    },
    { 
      id: 3, 
      author: 'Anonymous', 
      text: 'What is the timeline for Q3 deliverables?', 
      upvotes: 3, 
      status: 'Open',
      hasUpvoted: false,
      time: '10:15 AM'
    }
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [askAnonymously, setAskAnonymously] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleUpvote = (id) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          upvotes: q.hasUpvoted ? q.upvotes - 1 : q.upvotes + 1,
          hasUpvoted: !q.hasUpvoted
        };
      }
      return q;
    }));
  };

  const updateStatus = (id, status) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, status } : q));
    setActiveMenu(null);
  };

  const submitQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newQ = {
      id: Date.now(),
      author: askAnonymously ? 'Anonymous' : users[0].name,
      text: newQuestion,
      upvotes: 0,
      status: 'Open',
      hasUpvoted: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setQuestions([newQ, ...questions]);
    setNewQuestion('');
  };

  const StatusBadge = ({ status }) => {
    if (status === 'Answered') {
      return <span className="bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1"><CheckCircle2 size={10} /> Answered</span>;
    }
    if (status === 'Answering Live') {
      return <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse"><PlayCircle size={10} /> Live</span>;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <HelpCircle className="text-primary" size={20} />
          <h3 className="text-white font-medium">Q&A</h3>
        </div>
        <select className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded outline-none border border-slate-700">
          <option>Most Upvoted</option>
          <option>Recent</option>
        </select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {questions.sort((a, b) => b.upvotes - a.upvotes).map((q) => (
          <div key={q.id} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 shadow-sm relative group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-medium text-slate-200">{q.author}</span>
                <span className="text-xs text-slate-500 ml-2">{q.time}</span>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === q.id ? null : q.id)}
                  className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical size={16} />
                </button>
                {activeMenu === q.id && (
                  <div className="absolute right-0 top-full mt-1 w-36 bg-slate-900 border border-slate-700 rounded-lg shadow-xl py-1 z-10 text-sm overflow-hidden">
                    <button onClick={() => updateStatus(q.id, 'Answering Live')} className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Answer Live</button>
                    <button onClick={() => updateStatus(q.id, 'Answered')} className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Mark Answered</button>
                    <div className="h-px bg-slate-800 my-1"></div>
                    <button onClick={() => updateStatus(q.id, 'Open')} className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Reopen</button>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-slate-300 text-sm mb-3 leading-relaxed">{q.text}</p>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => toggleUpvote(q.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${q.hasUpvoted ? 'bg-primary/20 text-primary border-primary/30' : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'}`}
              >
                <ThumbsUp size={14} className={q.hasUpvoted ? 'fill-current' : ''} />
                {q.upvotes}
              </button>
              
              <StatusBadge status={q.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2">
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={askAnonymously} 
              onChange={(e) => setAskAnonymously(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900" 
            />
            Ask anonymously
          </label>
        </div>
        <div className="relative">
          <textarea 
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitQuestion();
              }
            }}
            placeholder="Ask a question..." 
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-4 pr-12 py-3 text-sm outline-none focus:border-primary placeholder-slate-500 resize-none h-14 no-scrollbar"
          />
          <button 
            onClick={submitQuestion}
            disabled={!newQuestion.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:bg-slate-700"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
