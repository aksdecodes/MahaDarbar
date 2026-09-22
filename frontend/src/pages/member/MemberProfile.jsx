import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAuthService from '../../services/userAuthService';

const MemberProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userAuthService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>My Profile</h1>
        <Link to="/member/dashboard" style={{ color: '#FF9933', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Dashboard</Link>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FF9933', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {profile?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>{profile?.name}</h2>
            <p style={{ margin: 0, color: '#666' }}>{profile?.mobile}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Email:</strong>
            <span>{profile?.email || 'Not provided'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Member ID:</strong>
            <span>{profile?.memberId || 'Not Linked'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Joined On:</strong>
            <span>{profile?.joinedDate || 'N/A'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Address:</strong>
            <span>{profile?.address || 'Not provided'}</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Membership Details</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Status:</strong>
            <span style={{ fontWeight: 'bold', color: profile?.status === 'Active' ? '#2E7D32' : '#C62828' }}>{profile?.status || 'Inactive'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Valid Till:</strong>
            <span>{profile?.validTill || 'N/A'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center' }}>
            <strong style={{ color: '#555' }}>Plan:</strong>
            <span>{profile?.membershipType || 'Standard'} (₹{profile?.monthlyFee || 0}/month)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
