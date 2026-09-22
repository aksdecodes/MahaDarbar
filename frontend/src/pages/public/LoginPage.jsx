import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { useToast } from '../../hooks/useToast';
import authService from '../../services/authService';
import userAuthService from '../../services/userAuthService';

const LoginPage = () => {
  const [tab, setTab] = useState('member'); // 'member' or 'admin'
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login: adminLogin } = useAuth();
  const { login: userLogin } = useUserAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === 'admin') {
        const res = await authService.login({ email, password });
        adminLogin(res.user, res.token);
        navigate('/admin/dashboard');
      } else {
        const res = await userAuthService.login({ mobile, password });
        userLogin(res.user, res.token);
        navigate('/member/dashboard');
      }
    } catch (err) {
      toastError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #FF9933, #CC6600)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Maharashtra Darbar</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>Authentic Maharashtrian Cuisine & Mess Services</p>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Welcome Back</h2>
          
          <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
            <button 
              onClick={() => setTab('member')}
              style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: tab === 'member' ? '2px solid #FF9933' : 'none', fontWeight: tab === 'member' ? 'bold' : 'normal', cursor: 'pointer' }}
            >
              Member
            </button>
            <button 
              onClick={() => setTab('admin')}
              style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: tab === 'admin' ? '2px solid #FF9933' : 'none', fontWeight: tab === 'admin' ? 'bold' : 'normal', cursor: 'pointer' }}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tab === 'admin' ? (
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            ) : (
              <input 
                type="text" 
                placeholder="Mobile Number" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
                required 
                pattern="[6-9][0-9]{9}"
                title="10 digit mobile number starting with 6-9"
                style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            )}
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '0.75rem', background: '#FF9933', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {tab === 'member' && (
            <p style={{ marginTop: '2rem', textAlign: 'center' }}>
              New here? <Link to="/signup" style={{ color: '#FF9933', textDecoration: 'none' }}>Create Account</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
