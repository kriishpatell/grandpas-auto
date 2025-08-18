import React, { useState } from 'react';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';

const Dashboard = () => (
  <div style={{ textAlign: 'center', marginTop: '4rem' }}>
    <h2>Welcome to Grandpa's Auto Dashboard!</h2>
    {/* Add your dashboard logic/components here */}
  </div>
);

export default function App() {
  const [view, setView] = useState<'login' | 'signup' | 'dashboard'>('signup');
  const [token, setToken] = useState<string | null>(null);

  if (!token && view === 'signup') {
    return <Signup onRegistered={() => setView('login')} />;
  }

  if (!token && view === 'login') {
    return <Login onAuth={t => { setToken(t); setView('dashboard'); }} />;
  }

  return (
    <Dashboard />
  );
}