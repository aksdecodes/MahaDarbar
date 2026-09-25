import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/common/Input';
import { ShieldCheck, User, ArrowLeft, KeyRound, Phone, Lock } from 'lucide-react';
import axios from 'axios';
import '../styles/public.css';

const Login = () => {
  const [roleMode, setRoleMode] = useState('admin'); // 'admin' or 'member'
  const [memberTab, setMemberTab] = useState('signin'); // 'signin' or 'signup'

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('admin@maharashtradarbar.com');
  const [adminPassword, setAdminPassword] = useState('admin@2026');

  // Member form state — phone = username
  const [memberPhone, setMemberPhone] = useState('');
  const [memberPassword, setMemberPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memberAuthSuccess, setMemberAuthSuccess] = useState(false);
  const [memberName, setMemberName] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Where to go after member login (support returnTo state from QR verify page)
  const returnTo = location.state?.returnTo || '/';

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(adminEmail, adminPassword);
      toast.success('Admin login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!memberPhone || !memberPassword) {
      setError('Please enter your mobile number and password');
      return;
    }

    setLoading(true);
    try {
      if (memberTab === 'signin') {
        // SIGN IN
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/user-auth/login`, {
          mobile: memberPhone,
          password: memberPassword
        });

        if (res.data && res.data.token) {
          // Store member token SEPARATELY from admin token
          localStorage.setItem('memberToken', res.data.token);
          localStorage.setItem('memberUser', JSON.stringify(res.data.user));
          setMemberName(res.data.user.name);
          setMemberAuthSuccess(true);
          toast.success(`Welcome back, ${res.data.user.name}!`);
        }
      } else {
        // SIGN UP — backend auto-fills name from Member record
        const res = await axios.post('/api/user-auth/register', {
          mobile: memberPhone,
          password: memberPassword
        });

        if (res.data && res.data.token) {
          localStorage.setItem('memberToken', res.data.token);
          localStorage.setItem('memberUser', JSON.stringify(res.data.user));
          setMemberName(res.data.user.name);
          setMemberAuthSuccess(true);
          toast.success(`Welcome to Maharashtra Darbar, ${res.data.user.name}!`);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #290509 0%, #4a0c13 50%, #1a0306 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      position: 'relative'
    }}>
      {/* Top back link */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          color: '#f3e5ab',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 700,
          background: 'rgba(255,255,255,0.08)',
          padding: '8px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <ArrowLeft size={16} /> Back to Public Website
      </Link>

      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        border: '2px solid var(--darbar-gold)',
        overflow: 'hidden'
      }}>

        {/* Brand Header */}
        <div style={{
          background: 'var(--darbar-burgundy)',
          color: '#ffffff',
          padding: '32px 24px 24px',
          textAlign: 'center',
          borderBottom: '2px solid var(--darbar-gold)'
        }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #7a1520 0%, #4a0c13 100%)',
            border: '2px solid var(--darbar-gold)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '26px', color: 'var(--darbar-gold)',
            margin: '0 auto 12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            MD
          </div>
          <h1 style={{ fontFamily: "'Rozha One', Georgia, serif", fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
            Maharashtra Darbar
          </h1>
          <p style={{ fontSize: '13px', color: '#f3e5ab', opacity: 0.9 }}>
            Sign in to access your portal
          </p>
        </div>

        {/* Role Toggle */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
            background: '#f5efe6', padding: '4px', borderRadius: '14px',
            border: '1px solid var(--darbar-border)'
          }}>
            <button
              onClick={() => { setRoleMode('admin'); setError(''); setMemberAuthSuccess(false); }}
              style={{
                padding: '10px', borderRadius: '10px', border: 'none',
                background: roleMode === 'admin' ? 'var(--darbar-burgundy)' : 'transparent',
                color: roleMode === 'admin' ? '#ffffff' : 'var(--darbar-text-muted)',
                fontWeight: 800, fontSize: '13.5px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: roleMode === 'admin' ? '0 2px 8px rgba(74, 12, 19, 0.25)' : 'none'
              }}
            >
              <ShieldCheck size={16} color={roleMode === 'admin' ? '#fcd34d' : 'currentColor'} />
              <span>ADMIN</span>
            </button>
            <button
              onClick={() => { setRoleMode('member'); setError(''); setMemberAuthSuccess(false); }}
              style={{
                padding: '10px', borderRadius: '10px', border: 'none',
                background: roleMode === 'member' ? 'var(--darbar-burgundy)' : 'transparent',
                color: roleMode === 'member' ? '#ffffff' : 'var(--darbar-text-muted)',
                fontWeight: 800, fontSize: '13.5px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: roleMode === 'member' ? '0 2px 8px rgba(74, 12, 19, 0.25)' : 'none'
              }}
            >
              <User size={16} color={roleMode === 'member' ? '#fcd34d' : 'currentColor'} />
              <span>MEMBER</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>

          {error && (
            <div style={{
              padding: '12px', background: '#fee2e2', color: '#dc2626',
              borderRadius: '10px', marginBottom: '20px', fontSize: '13px',
              fontWeight: 600, border: '1px solid #fca5a5'
            }}>
              {error}
            </div>
          )}

          {/* ======================== ADMIN FORM ======================== */}
          {roleMode === 'admin' && (
            <form onSubmit={handleAdminSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--darbar-burgundy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <KeyRound size={16} color="var(--darbar-maroon)" />
                  <span>Admin Sign In</span>
                </div>
                <Input
                  label="Email / Username"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <Input
                  label="Password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #7a1520 0%, #4a0c13 100%)',
                  color: '#ffffff', border: '1px solid var(--darbar-gold)',
                  padding: '12px', borderRadius: '12px', fontWeight: 800,
                  fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 15px rgba(74, 12, 19, 0.35)'
                }}
              >
                {loading ? 'Authenticating Admin...' : 'Sign In as Admin'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--darbar-text-muted)' }}>
                Authorised administrative access to Mess & Inventory Management
              </div>
            </form>
          )}

          {/* ======================== MEMBER FORM ======================== */}
          {roleMode === 'member' && (
            <div>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--darbar-border)', marginBottom: '20px', paddingBottom: '8px' }}>
                {['signin', 'signup'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setMemberTab(tab); setError(''); setMemberAuthSuccess(false); }}
                    style={{
                      background: 'none', border: 'none', fontSize: '14px', fontWeight: 700,
                      color: memberTab === tab ? 'var(--darbar-burgundy)' : 'var(--darbar-text-muted)',
                      cursor: 'pointer',
                      borderBottom: memberTab === tab ? '2px solid var(--darbar-maroon)' : 'none',
                      paddingBottom: '4px'
                    }}
                  >
                    {tab === 'signin' ? 'Member Sign In' : 'Member Sign Up'}
                  </button>
                ))}
              </div>

              {/* SUCCESS STATE */}
              {memberAuthSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{
                    width: '56px', height: '56px', background: '#dcfce7', color: '#16a34a',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', fontSize: '28px', border: '3px solid #86efac'
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                    {memberTab === 'signup' ? 'Account Created!' : 'Welcome Back!'}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--darbar-text-muted)', marginTop: '4px', marginBottom: '6px' }}>
                    Signed in as <strong>{memberName}</strong>
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--darbar-text-muted)', marginBottom: '20px' }}>
                    You can now scan mess QR codes to mark daily attendance.
                  </p>
                  <button
                    onClick={() => navigate(returnTo)}
                    className="btn-darbar-primary"
                    style={{ width: '100%', borderRadius: '12px' }}
                  >
                    {returnTo !== '/' ? 'Go Back & Mark Attendance' : 'Go to Homepage'}
                  </button>
                </div>
              ) : (
                /* FORM */
                <form onSubmit={handleMemberSubmit}>
                  {/* Help text for signup */}
                  {memberTab === 'signup' && (
                    <div style={{
                      background: '#fffbeb', border: '1px solid #fef3c7',
                      borderRadius: '10px', padding: '10px 14px',
                      marginBottom: '16px', fontSize: '13px', color: '#92400e', fontWeight: 600
                    }}>
                      📋 Your mobile number must be registered as a mess member by the admin before you can sign up.
                    </div>
                  )}

                  <div style={{ marginBottom: '16px' }}>
                    <Input
                      label="Mobile Number (your username)"
                      type="text"
                      value={memberPhone}
                      onChange={(e) => setMemberPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <Input
                      label={memberTab === 'signup' ? 'Set Password' : 'Password'}
                      type="password"
                      value={memberPassword}
                      onChange={(e) => setMemberPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                      color: '#ffffff', border: '1px solid #fcd34d',
                      padding: '12px', borderRadius: '12px', fontWeight: 800,
                      fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 15px rgba(234, 88, 12, 0.35)'
                    }}
                  >
                    {loading
                      ? 'Please wait...'
                      : memberTab === 'signin' ? 'Sign In as Member' : 'Create Member Account'
                    }
                  </button>

                  {memberTab === 'signin' && (
                    <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: 'var(--darbar-text-muted)' }}>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => { setMemberTab('signup'); setError(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--darbar-maroon)', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
