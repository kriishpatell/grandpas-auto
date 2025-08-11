import React, { useState } from 'react';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  if (!token) {
    return <Login onAuth={(t, r) => { setToken(t); setRole(r); }} />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Authenticated!</h2>
      <p>Token: <code style={{ wordBreak: 'break-all', color: 'green' }}>{token}</code></p>
      <p>Role: <strong>{role}</strong></p>
      <button onClick={() => { setToken(''); setRole(''); }}>Log out</button>
    </div>
  );
}

export default App;