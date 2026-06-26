import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialFiles } from '../components/admin/LibraryScreen';
import { FileViewer } from '../components/shared/FileViewer';
import { AnnotationOverlay } from '../components/shared/AnnotationOverlay';
import { ArrowLeft, FileText, Download } from 'lucide-react';

export function FilePreviewPage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    setPage(1);
  }, [id]);
  
  // Find the file, or create a mock one if it was a newly uploaded one not in initialFiles
  const file = initialFiles.find(f => f.id === id) || {
    id,
    name: 'Uploaded_Document.pdf',
    type: 'application/pdf',
    size: '1.5 MB',
    uploadDate: new Date().toISOString().split('T')[0],
    icon: FileText,
    color: 'text-red-500'
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-slate-800 border-b border-slate-700 flex items-center px-4 shrink-0 justify-between text-slate-200 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => window.close()} className="hover:text-white flex items-center gap-2 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Close Tab
          </button>
          <div className="w-px h-6 bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <file.icon size={18} className={file.color} />
            <span className="font-medium">{file.name}</span>
          </div>
        </div>
        <div>
           <button className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 px-4 py-1.5 rounded-lg transition-colors shadow-sm">
             <Download size={16} /> Download
           </button>
        </div>
      </div>
      
      {/* File Viewer */}
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        <FileViewer file={file} page={page} setPage={setPage} />
        <AnnotationOverlay pageId={`${file.id}-page-${page}`} />
      </div>
    </div>
  );
}
