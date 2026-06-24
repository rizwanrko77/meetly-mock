import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, Link as LinkIcon, Share2 } from 'lucide-react';

export function NewMeetingModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    isPublic: true,
    type: 'Meeting',
    hosts: '',
    inviteeEmails: '',
    isPaid: false,
    price: '',
    questions: [''],
    startTime: '09:00',
    endTime: '17:00'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const meetingLink = "meetly.com/j/123456789";

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    setFormData(prev => ({ ...prev, questions: [...prev.questions, ''] }));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData(prev => ({ ...prev, questions: newQuestions }));
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleFinish = () => {
    onSave(formData);
    onClose();
    // Reset state after brief delay
    setTimeout(() => setIsSuccess(false), 300);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col my-8 p-8 items-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Schedule Created!</h2>
          <p className="text-slate-500 mb-8">Your meeting schedule has been successfully created. You can now share the link.</p>
          
          <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex flex-col gap-3">
            <div className="text-sm font-medium text-slate-700 text-left">Meeting Link</div>
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

          <button
            onClick={handleFinish}
            className="w-full py-3 bg-primary text-white font-medium hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Create New Meeting Schedule</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <form id="new-meeting-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Discovery Call"
              />
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <div className="font-medium text-slate-800">Public Meeting</div>
                <div className="text-sm text-slate-500">Visible on your public scheduling page.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.isPublic}
                  onChange={e => setFormData({ ...formData, isPublic: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Type</label>
                <select
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Webinar">Webinar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pricing</label>
                <select
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.isPaid ? 'paid' : 'free'}
                  onChange={e => setFormData({ ...formData, isPaid: e.target.value === 'paid' })}
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            {formData.isPaid && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hosts</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.hosts}
                  onChange={e => setFormData({ ...formData, hosts: e.target.value })}
                  placeholder="Add hosts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Invitee Emails</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  value={formData.inviteeEmails}
                  onChange={e => setFormData({ ...formData, inviteeEmails: e.target.value })}
                  placeholder="user1@example.com, user2@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Available Start Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.startTime}
                  onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Available End Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.endTime}
                  onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex justify-between items-center">
                <span>Pre-Meeting Questions</span>
                <button type="button" onClick={handleAddQuestion} className="text-primary hover:text-indigo-700 text-sm flex items-center gap-1 font-medium">
                  <Plus size={14} /> Add Question
                </button>
              </label>
              <div className="space-y-3">
                {formData.questions.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={q}
                      onChange={e => handleQuestionChange(idx, e.target.value)}
                      placeholder={`Question ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {formData.questions.length === 0 && (
                  <p className="text-sm text-slate-500 italic">No pre-meeting questions added.</p>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="new-meeting-form"
            className="px-5 py-2.5 bg-primary text-white font-medium hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
          >
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
