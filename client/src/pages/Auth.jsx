import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const { setUser } = useApp();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    setUser({ name: form.name || 'Pratik Customer', email: form.email, mobile: form.mobile, role: 'user' });
    navigate('/dashboard');
  };

  return (
    <Page className="auth-page">
      <form className="form-card auth-card" onSubmit={submit}>
        <div className="segmented">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        </div>
        {mode === 'register' && (
          <>
            <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label>Mobile Number<input required value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} /></label>
          </>
        )}
        <label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Password<input required minLength="6" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        <button className="button full">{mode === 'login' ? 'Login' : 'Create Account'}</button>
      </form>
    </Page>
  );
}
