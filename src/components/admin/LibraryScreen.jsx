import React, { useState } from 'react';
import { Folder, FileText, File, FileCode, FileImage, Download, Trash2, Upload, Plus, X, Eye } from 'lucide-react';
import { InfoTooltip } from '../shared/InfoTooltip';

export const initialFiles = [
  { id: '1', name: 'Q3_Marketing_Strategy.pdf', type: 'application/pdf', size: '2.4 MB', uploadDate: '2026-06-20', icon: FileText, color: 'text-red-500' },
  { id: '2', name: 'Product_Roadmap_v2.pptx', type: 'application/vnd.ms-powerpoint', size: '5.1 MB', uploadDate: '2026-06-22', icon: File, color: 'text-orange-500' },
  { id: '3', name: 'API_Documentation.docx', type: 'application/msword', size: '1.2 MB', uploadDate: '2026-06-24', icon: FileText, color: 'text-blue-500' },
  { id: '4', name: 'Dashboard_Mockup.png', type: 'image/png', size: '8.4 MB', uploadDate: '2026-06-25', icon: FileImage, color: 'text-emerald-500' }
];

export function LibraryScreen() {
  const [files, setFiles] = useState(initialFiles);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDelete = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // Mock upload
    const newFile = {
      id: Date.now().toString(),
      name: 'New_Uploaded_Document.pdf',
      type: 'application/pdf',
      size: '1.5 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      icon: FileText,
      color: 'text-red-500'
    };
    setFiles([newFile, ...files]);
    setIsUploadModalOpen(false);
  };

  const handlePreview = (file) => {
    window.open(`/preview/${file.id}`, '_blank');
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Library
            <InfoTooltip content="Manage your uploaded files and documents to share during meetings or webinars." />
          </h1>
          <p className="text-slate-500 mt-1">Upload and manage resources for your participants.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-primary hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
        >
          <Upload size={18} /> Upload File
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="p-4 pl-6">File Name</th>
                <th className="p-4 hidden md:table-cell">Size</th>
                <th className="p-4 hidden sm:table-cell">Upload Date</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div 
                      className="flex items-center gap-3 cursor-pointer group/item"
                      onClick={() => handlePreview(file)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover/item:border-indigo-200 group-hover/item:bg-indigo-50 transition-colors">
                        <file.icon size={20} className={file.color} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800 truncate max-w-[200px] md:max-w-md group-hover/item:text-primary transition-colors">{file.name}</div>
                        <div className="text-xs text-slate-400 block md:hidden mt-0.5">{file.size} • {file.uploadDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm hidden md:table-cell">{file.size}</td>
                  <td className="p-4 text-slate-600 text-sm hidden sm:table-cell">{file.uploadDate}</td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handlePreview(file)} className="p-2 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded transition-colors" title="Preview">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded transition-colors" title="Download">
                        <Download size={18} />
                      </button>
                      <button onClick={() => handleDelete(file.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {files.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Folder size={24} className="text-slate-400" />
                      </div>
                      <p className="font-medium text-slate-700">No files in your library</p>
                      <p className="text-sm mt-1 mb-4">Upload a file to get started.</p>
                      <button 
                        onClick={() => setIsUploadModalOpen(true)}
                        className="text-primary hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                      >
                        <Plus size={16} /> Add a File
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Upload File</h2>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-primary bg-indigo-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(e); }}
              >
                <Upload size={32} className="mx-auto text-slate-400 mb-4" />
                <p className="font-medium text-slate-700 mb-1">Drag and drop your file here</p>
                <p className="text-sm text-slate-500 mb-4">or click to browse from your computer</p>
                <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                  Browse Files
                </button>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
