import axios from 'axios';
const BASE = 'http://localhost:3000/';

export async function signup(name: string, email: string, password: string, role: string = 'employee') {
  const res = await axios.post(`${BASE}/auth/signup`, { name, email, password, role });
  return res.data;
}

export async function login(email: string, password: string) {
  const res = await axios.post(`${BASE}/auth/login`, { email, password });
  return res.data;
}
