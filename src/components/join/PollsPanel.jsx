import React, { useState } from 'react';
import { Plus, Trash2, CheckSquare, BarChart2 } from 'lucide-react';

export function PollsPanel() {
  const [view, setView] = useState('create'); // 'create', 'active', 'results'
  const [question, setQuestion] = useState('How are you liking the new design?');
  const [options, setOptions] = useState([
    { id: 1, text: 'Love it!', votes: 12 },
    { id: 2, text: 'Needs some tweaks', votes: 4 },
    { id: 3, text: 'Not a fan', votes: 1 },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const addOption = () => {
    setOptions([...options, { id: Date.now(), text: '', votes: 0 }]);
  };

  const updateOption = (id, text) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const removeOption = (id) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  const launchPoll = () => {
    setView('active');
  };

  const submitVote = () => {
    if (selectedOption) {
      setOptions(options.map(opt => 
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      ));
      setView('results');
    }
  };

  const endPoll = () => {
    setView('create');
    setOptions([
      { id: 1, text: '', votes: 0 },
      { id: 2, text: '', votes: 0 },
    ]);
    setQuestion('');
  };

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden p-4">
      {view === 'create' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <CheckSquare className="text-primary" size={20} />
            <h3 className="text-white font-medium text-lg">Create a Poll</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Question</label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to ask?" 
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-primary placeholder-slate-500 resize-none h-24"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Options</label>
              <div className="space-y-3">
                {options.map((opt, index) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={opt.text}
                      onChange={(e) => updateOption(opt.id, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm outline-none focus:border-primary placeholder-slate-500"
                    />
                    {options.length > 2 && (
                      <button onClick={() => removeOption(opt.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addOption} className="mt-3 text-sm text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-colors">
                <Plus size={16} /> Add Option
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-auto">
            <button 
              onClick={launchPoll}
              disabled={!question || options.some(o => !o.text)}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Launch Poll
            </button>
          </div>
        </div>
      )}

      {view === 'active' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="text-white font-medium">Live Poll</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <h2 className="text-xl font-semibold text-white mb-6 leading-tight">{question}</h2>
            <div className="space-y-3">
              {options.map((opt) => (
                <label 
                  key={opt.id} 
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedOption === opt.id ? 'border-primary bg-primary/10' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedOption === opt.id ? 'border-primary' : 'border-slate-500'}`}>
                    {selectedOption === opt.id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                  </div>
                  <span className="text-slate-200">{opt.text}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <button 
              onClick={submitVote}
              disabled={!selectedOption}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Vote
            </button>
          </div>
        </div>
      )}

      {view === 'results' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="text-primary" size={20} />
              <h3 className="text-white font-medium">Poll Results</h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">{totalVotes} Votes</span>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <h2 className="text-lg font-medium text-white mb-6">{question}</h2>
            <div className="space-y-4">
              {options.map((opt) => {
                const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                return (
                  <div key={opt.id} className="relative">
                    <div className="flex justify-between text-sm mb-1.5 relative z-10">
                      <span className="text-slate-200">{opt.text}</span>
                      <span className="text-slate-400 font-medium">{percentage}%</span>
                    </div>
                    <div className="h-10 bg-slate-800 rounded-lg overflow-hidden relative border border-slate-700/50">
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-primary/20 transition-all duration-1000 ease-out" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-auto">
            <button 
              onClick={endPoll}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-medium transition-all shadow-lg border border-slate-700"
            >
              End Poll
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
