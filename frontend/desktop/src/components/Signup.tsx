import React, { useState } from 'react';
import { signup } from '../api/auth.ts';

export default function Signup({ onRegistered }: { onRegistered: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      await signup(form.name, form.email, form.password, form.role);
      setMsg('Registration successful! Please login.');
      onRegistered();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMsg(err?.response?.data?.error || 'Error registering.');
    }
  };

  return (
    <form onSubmit={submit} style={{ margin: '2rem auto', maxWidth: 320 }}>
      <h2>Register</h2>
      <input required placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
      <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
        <option value="employee">Employee</option>
        <option value="owner">Owner</option>
      </select>
      <button type="submit" style={{ display: 'block', width: '100%', margin: '1rem 0' }}>Sign Up</button>
      {msg && <p style={{ color: msg.startsWith('Error') ? 'red' : 'green' }}>{msg}</p>}
    </form>
  );
}
