import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestHub } from './pages/TestHub';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { JoinPage } from './pages/JoinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHub />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
