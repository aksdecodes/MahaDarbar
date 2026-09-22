import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { ShieldCheck, User, ArrowLeft, KeyRound, Mail, Lock, Phone } from 'lucide-react';
import '../styles/public.css';

const Login = () => {
  const [roleMode, setRoleMode] = useState('admin'); // 'admin' or 'member'
  const [memberTab, setMemberTab] = useState('signin'); // 'signin' or 'signup'

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('admin@maharashtriandarbar.com');
  const [adminPassword, setAdminPassword] = useState('Admin@123');

  // Member form state
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPassword, setMemberPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memberAuthSuccess, setMemberAuthSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      setError('Please enter both email/username and password');
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

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (memberTab === 'signin') {
      if (!memberEmail || !memberPassword) {
        setError('Please enter mobile/email and password');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMemberAuthSuccess(true);
        toast.success(`Welcome back! Logged in as member.`);
      }, 600);
    } else {
      if (!memberName || !memberPhone || !memberPassword) {
        setError('Please fill in all required fields');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMemberAuthSuccess(true);
        toast.success(`Welcome to Maharashtra Darbar, ${memberName}! Account created.`);
      }, 600);
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
          position: 'relative',
          borderBottom: '2px solid var(--darbar-gold)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #7a1520 0%, #4a0c13 100%)',
            border: '2px solid var(--darbar-gold)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '26px',
            color: 'var(--darbar-gold)',
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

        {/* Role Toggle Selector (ADMIN vs MEMBER) */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            background: '#f5efe6',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid var(--darbar-border)'
          }}>
            <button
              onClick={() => { setRoleMode('admin'); setError(''); setMemberAuthSuccess(false); }}
              style={{
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: roleMode === 'admin' ? 'var(--darbar-burgundy)' : 'transparent',
                color: roleMode === 'admin' ? '#ffffff' : 'var(--darbar-text-muted)',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
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
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: roleMode === 'member' ? 'var(--darbar-burgundy)' : 'transparent',
                color: roleMode === 'member' ? '#ffffff' : 'var(--darbar-text-muted)',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: roleMode === 'member' ? '0 2px 8px rgba(74, 12, 19, 0.25)' : 'none'
              }}
            >
              <User size={16} color={roleMode === 'member' ? '#fcd34d' : 'currentColor'} />
              <span>MEMBER</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px' }}>
          
          {error && (
            <div style={{
              padding: '12px',
              background: '#fee2e2',
              color: '#dc2626',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid #fca5a5'
            }}>
              {error}
            </div>
          )}

          {/* ADMIN LOGIN FORM */}
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
                  color: '#ffffff',
                  border: '1px solid var(--darbar-gold)',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: loading ? 'not-allowed' : 'pointer',
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

          {/* MEMBER LOGIN / SIGNUP FORM */}
          {roleMode === 'member' && (
            <div>
              {/* Member Signin/Signup sub-tabs */}
              <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--darbar-border)', marginBottom: '20px', paddingBottom: '8px' }}>
                <button
                  onClick={() => setMemberTab('signin')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: memberTab === 'signin' ? 'var(--darbar-burgundy)' : 'var(--darbar-text-muted)',
                    cursor: 'pointer',
                    borderBottom: memberTab === 'signin' ? '2px solid var(--darbar-maroon)' : 'none',
                    paddingBottom: '4px'
                  }}
                >
                  Member Sign In
                </button>
                <button
                  onClick={() => setMemberTab('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: memberTab === 'signup' ? 'var(--darbar-burgundy)' : 'var(--darbar-text-muted)',
                    cursor: 'pointer',
                    borderBottom: memberTab === 'signup' ? '2px solid var(--darbar-maroon)' : 'none',
                    paddingBottom: '4px'
                  }}
                >
                  Member Sign Up
                </button>
              </div>

              {memberAuthSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: '48px', height: '48px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                    Member Access Active
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--darbar-text-muted)', marginTop: '6px', marginBottom: '20px' }}>
                    You are now signed in as a Maharashtra Darbar Member. Enjoy your mess benefits & orders!
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-darbar-primary"
                    style={{ width: '100%', borderRadius: '12px' }}
                  >
                    Go to Homepage & Order
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMemberSubmit}>
                  {memberTab === 'signup' && (
                    <div style={{ marginBottom: '16px' }}>
                      <Input
                        label="Full Name"
                        type="text"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        placeholder="e.g. Rahul Patil"
                        required
                      />
                    </div>
                  )}

                  <div style={{ marginBottom: '16px' }}>
                    <Input
                      label={memberTab === 'signup' ? "Mobile Number" : "Mobile / Email"}
                      type="text"
                      value={memberTab === 'signup' ? memberPhone : memberEmail}
                      onChange={(e) => memberTab === 'signup' ? setMemberPhone(e.target.value) : setMemberEmail(e.target.value)}
                      placeholder={memberTab === 'signup' ? "10-digit mobile number" : "Enter registered mobile or email"}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <Input
                      label="Password"
                      type="password"
                      value={memberPassword}
                      onChange={(e) => setMemberPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: '1px solid #fcd34d',
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 15px rgba(234, 88, 12, 0.35)'
                    }}
                  >
                    {loading ? 'Processing...' : (memberTab === 'signin' ? 'Sign In as Member' : 'Create Member Account')}
                  </button>
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
