import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestHub } from './pages/TestHub';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { JoinPage } from './pages/JoinPage';
import { PublicBookingPage } from './pages/PublicBookingPage';
import { FilePreviewPage } from './pages/FilePreviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHub />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/book/:username" element={<PublicBookingPage />} />
        <Route path="/preview/:id" element={<FilePreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
