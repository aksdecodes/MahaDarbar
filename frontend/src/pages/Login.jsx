import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('admin@maharashtriandarbar.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div style={{ maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ 
            width: '120px', height: '120px', background: 'white', borderRadius: '30px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '48px', fontWeight: 800, color: 'var(--primary)', 
            margin: '0 auto 32px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            MD
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.2 }}>
            Maharashtra Darbar
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9, lineHeight: 1.5 }}>
            Premium Mess Management System
          </p>
        </div>
      </div>
      
      <div className="login-right">
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <div className="login-logo" style={{ display: 'none' }}>MD</div> {/* Visible only on mobile */}
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Please enter your details to sign in.
          </p>
          
          {error && (
            <div style={{ padding: '12px', background: 'var(--due-bg)', color: '#dc2626', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            
            <div style={{ position: 'relative' }}>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                <span>Remember me</span>
              </label>
              <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
            </div>
            
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .login-logo { display: flex !important; margin: 0 auto 24px; }
        }
      `}</style>
    </div>
  );
};

export default Login;
