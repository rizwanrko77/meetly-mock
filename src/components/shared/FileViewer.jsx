import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export function FileViewer({ file, page = 1, setPage = () => {} }) {
  if (!file) return null;

  if (file.type === 'application/pdf') {
    return (
      <div className="w-full h-full bg-slate-200 overflow-y-auto p-4 md:p-8 flex flex-col items-center gap-8 custom-scrollbar">
        {/* PDF Header Mock */}
        <div className="w-full max-w-3xl bg-slate-800 p-3 rounded-lg shadow-lg flex justify-between items-center text-slate-300 sticky top-0 z-10">
          <span className="text-sm font-medium truncate px-4">{file.name}</span>
          <div className="flex items-center gap-4 px-4 text-sm">
            <span>Page {page} of 2</span>
            <div className="flex gap-2">
               <button 
                 onClick={() => setPage(1)}
                 disabled={page === 1}
                 className={`transition-colors ${page === 1 ? 'text-slate-600' : 'hover:text-white text-slate-300'}`}
               ><ChevronLeft size={18}/></button>
               <button 
                 onClick={() => setPage(2)}
                 disabled={page === 2}
                 className={`transition-colors ${page === 2 ? 'text-slate-600' : 'hover:text-white text-slate-300'}`}
               ><ChevronRight size={18}/></button>
            </div>
          </div>
        </div>

        {/* Page 1 */}
        {page === 1 ? (
          <div className="w-full max-w-3xl bg-white shadow-xl min-h-[800px] p-8 md:p-12 shrink-0 border border-slate-300 animate-fade-in">
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
               <div className="text-3xl md:text-4xl font-extrabold text-slate-900">Q3 Marketing Strategy</div>
               <div className="text-right text-slate-500 font-medium">Acme Corp<br/>July 2026</div>
            </div>
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <h2 className="text-2xl font-bold text-slate-800">1. Executive Summary</h2>
              <p>Our primary objective for Q3 is to increase market penetration in the enterprise segment by 25%. This will be achieved through a coordinated campaign leveraging webinar series, targeted account-based marketing (ABM), and strategic partnerships.</p>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-8">
                <h3 className="text-lg font-bold mb-4 text-slate-800">Key Performance Indicators (KPIs)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Marketing Qualified Leads (MQLs): 5,000</li>
                  <li>Sales Accepted Leads (SALs): 1,200</li>
                  <li>Customer Acquisition Cost (CAC) reduction: 15%</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800">2. Target Audience Expansion</h2>
              <p>We are shifting our focus from mid-market managers to C-level executives (CIO, CTO) at companies with 1,000+ employees. The messaging will pivot from "cost savings" to "revenue acceleration and risk mitigation".</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-white shadow-xl min-h-[800px] p-8 md:p-12 shrink-0 border border-slate-300 animate-fade-in">
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <h2 className="text-2xl font-bold text-slate-800">3. Campaign Roadmap</h2>
              
              <div className="space-y-4 my-8">
                <div className="flex gap-4 items-start">
                  <div className="w-24 shrink-0 font-bold text-indigo-600">July</div>
                  <div>Launch "Future of Work" webinar series. Deploy initial ABM display ads.</div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 shrink-0 font-bold text-indigo-600">August</div>
                  <div>Publish flagship industry report. Host VIP executive dinner in SF.</div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 shrink-0 font-bold text-indigo-600">September</div>
                  <div>Follow-up SDR sequence blitz. Q3 wrap-up and pipeline review.</div>
                </div>
              </div>
  
              <h2 className="text-2xl font-bold text-slate-800">4. Budget Allocation</h2>
              <div className="h-64 bg-slate-100 rounded-xl flex items-end justify-center gap-4 md:gap-8 p-4 md:p-8 border border-slate-200">
                 {/* Mock Chart */}
                 <div className="w-12 md:w-16 bg-blue-400 rounded-t-md h-[80%] relative group"><span className="absolute -top-6 text-xs font-bold text-slate-500 left-1/2 -translate-x-1/2">Events</span></div>
                 <div className="w-12 md:w-16 bg-indigo-500 rounded-t-md h-[100%] relative group"><span className="absolute -top-6 text-xs font-bold text-slate-500 left-1/2 -translate-x-1/2">Ads</span></div>
                 <div className="w-12 md:w-16 bg-emerald-400 rounded-t-md h-[40%] relative group"><span className="absolute -top-6 text-xs font-bold text-slate-500 left-1/2 -translate-x-1/2">Content</span></div>
                 <div className="w-12 md:w-16 bg-amber-400 rounded-t-md h-[20%] relative group"><span className="absolute -top-6 text-xs font-bold text-slate-500 left-1/2 -translate-x-1/2">Tools</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (file.type === 'application/vnd.ms-powerpoint') {
    return (
      <div className="w-full h-full bg-slate-900 overflow-hidden flex flex-col relative">
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium z-20">Slide {page} of 2</div>
        <div 
          className="flex-1 flex items-center justify-center p-4 md:p-12 cursor-pointer"
          onClick={() => setPage(page === 1 ? 2 : 1)}
        >
          {/* PPT Slide */}
          {page === 1 ? (
            <div className="w-full max-w-4xl aspect-video bg-gradient-to-br from-indigo-900 to-slate-900 shadow-2xl rounded-xl border border-indigo-500/30 flex flex-col p-8 md:p-12 relative overflow-hidden animate-fade-in pointer-events-none">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
              
              <div className="flex-1 flex flex-col justify-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">Product Roadmap<br/><span className="text-indigo-400">v2.0</span></h1>
                <p className="text-lg md:text-xl text-indigo-100 max-w-xl">A comprehensive guide to our upcoming feature releases, architecture upgrades, and user experience enhancements.</p>
              </div>
              
              <div className="flex justify-between items-end relative z-10">
                <div className="text-indigo-300 font-medium">Product Team • Q3 2026</div>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-indigo-900 text-xl">M</div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl aspect-video bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl rounded-xl border border-slate-700 flex flex-col p-8 md:p-12 relative overflow-hidden animate-fade-in pointer-events-none">
              <div className="flex-1 relative z-10">
                <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">Key Priorities</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="text-indigo-400 font-bold text-lg mb-2">1. Performance</div>
                    <p className="text-slate-300 text-sm">Rewrite the video processing pipeline in Rust for 40% less CPU usage.</p>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="text-indigo-400 font-bold text-lg mb-2">2. Scalability</div>
                    <p className="text-slate-300 text-sm">Deploy multi-region clusters to support up to 10k concurrent webinar users.</p>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="text-indigo-400 font-bold text-lg mb-2">3. Mobile</div>
                    <p className="text-slate-300 text-sm">Launch React Native mobile apps for iOS and Android with offline support.</p>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <div className="text-indigo-400 font-bold text-lg mb-2">4. AI Features</div>
                    <p className="text-slate-300 text-sm">Integrate real-time translation and smart meeting summarization.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-16 md:h-20 bg-slate-800 border-t border-slate-700 flex items-center justify-center gap-6">
          <button 
            onClick={(e) => { e.stopPropagation(); setPage(1); }}
            disabled={page === 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${page === 1 ? 'bg-slate-800 text-slate-600' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
          >
            <ChevronLeft size={20}/>
          </button>
          <span className="text-slate-300 font-medium">{page} / 2</span>
          <button 
            onClick={(e) => { e.stopPropagation(); setPage(2); }}
            disabled={page === 2}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${page === 2 ? 'bg-slate-800 text-slate-600' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
          >
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>
    );
  }

  if (file.type === 'application/msword') {
    return (
      <div className="w-full h-full bg-slate-100 overflow-y-auto p-4 md:p-12 flex justify-center custom-scrollbar">
        <div className="w-full max-w-4xl bg-white shadow-lg min-h-[1000px] p-8 md:p-16 border border-slate-200 text-slate-800">
           <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">API Documentation v3.0</h1>
           
           <div className="max-w-none space-y-6">
             <h3 className="text-xl font-bold">Introduction</h3>
             <p>Welcome to the Meetly REST API documentation. This API allows you to programmatically manage meetings, users, and webinars.</p>
             
             <h3 className="text-xl font-bold mt-8">Authentication</h3>
             <p>All API requests require a Bearer token in the Authorization header.</p>
             <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg my-4 overflow-x-auto text-sm">
               <code>Authorization: Bearer YOUR_API_TOKEN</code>
             </pre>

             <h3 className="text-xl font-bold mt-8">Endpoints</h3>
             
             <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
               <h4 className="flex items-center gap-3 mb-4">
                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-xs uppercase">GET</span>
                 <span className="font-mono text-slate-800 text-lg">/api/v3/meetings</span>
               </h4>
               <p className="mb-6">Retrieves a paginated list of meetings for the authenticated user.</p>
               
               <table className="min-w-full border-collapse border border-slate-200 my-4 bg-white text-left">
                 <thead className="bg-slate-100">
                   <tr><th className="border border-slate-200 p-3">Parameter</th><th className="border border-slate-200 p-3">Type</th><th className="border border-slate-200 p-3">Description</th></tr>
                 </thead>
                 <tbody>
                   <tr><td className="border border-slate-200 p-3 font-mono text-sm">limit</td><td className="border border-slate-200 p-3 text-sm text-slate-500">integer</td><td className="border border-slate-200 p-3 text-sm">Max records (default 20)</td></tr>
                   <tr><td className="border border-slate-200 p-3 font-mono text-sm">status</td><td className="border border-slate-200 p-3 text-sm text-slate-500">string</td><td className="border border-slate-200 p-3 text-sm">Filter by Scheduled, Completed, Cancelled</td></tr>
                 </tbody>
               </table>
               
               <p className="font-semibold text-sm mt-8 mb-2">Response Example:</p>
               <pre className="bg-slate-900 text-blue-300 p-4 rounded-lg overflow-x-auto text-sm">
                 <code>{`{
  "data": [
    {
      "id": "m_12345",
      "title": "Team Sync",
      "startTime": "2026-06-25T10:00:00Z"
    }
  ],
  "meta": { "total": 42 }
}`}</code>
               </pre>
             </div>
           </div>
        </div>
      </div>
    );
  }

  if (file.type === 'image/png') {
    return (
      <div className="w-full h-full bg-slate-900 overflow-hidden flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 to-slate-900"></div>
        <img 
          src="/dashboard_mockup.png" 
          alt="Dashboard Mockup" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl relative z-10 border border-slate-700" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop';
          }}
        />
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-slate-50">
       <div className="text-center max-w-md bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <FileText size={80} className="mx-auto mb-6 opacity-30 text-slate-400" />
        <h3 className="text-xl font-bold text-slate-800 mb-3">Preview Not Available</h3>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The contents of this file cannot be previewed in the mock environment.
        </p>
      </div>
    </div>
  );
}
