import React, { useState } from 'react';
import { login } from '../api/auth';

export default function Login({ onAuth }: { onAuth: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      const data = await login(email, password);
      onAuth(data.token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMsg(err?.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <form onSubmit={submit} style={{ margin: '2rem auto', maxWidth: 320 }}>
      <h2>Login</h2>
      <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" style={{ display: 'block', width: '100%', margin: '1rem 0' }}>Sign In</button>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
    </form>
  );
}
