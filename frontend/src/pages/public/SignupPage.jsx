import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext';
import { useToast } from '../../hooks/useToast';
import userAuthService from '../../services/userAuthService';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login: userLogin } = useUserAuth();
  const { error: toastError, success: toastSuccess } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await userAuthService.register({ name, mobile, email, password });
      userLogin(res.user, res.token);
      toastSuccess('Account created successfully!');
      navigate('/member/dashboard');
    } catch (err) {
      toastError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #FF9933, #CC6600)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Maharashtra Darbar</h1>
        <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>Join our community today</p>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create Account</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
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

            <input 
              type="email" 
              placeholder="Email Address (Optional)" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <input 
              type="password" 
              placeholder="Password (Min 6 chars)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              minLength="6"
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '0.75rem', background: '#FF9933', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ color: '#FF9933', textDecoration: 'none' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
