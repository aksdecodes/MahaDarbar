import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAuthService from '../../services/userAuthService';
import announcementService from '../../services/announcementService';

const MemberDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, paymentsData, announcementsData] = await Promise.all([
          userAuthService.getProfile(),
          userAuthService.getMyPayments(),
          announcementService.getActiveAnnouncements()
        ]);
        setProfile(profileData);
        setPayments(paymentsData || []);
        setAnnouncements(announcementsData || []);
      } catch (err) {
        console.error('Error fetching member data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem', color: '#333' }}>Welcome, {profile?.name || 'Member'}!</h1>
      
      {announcements.length > 0 && (
        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#FFF3E0', borderRadius: '8px', borderLeft: '4px solid #FF9933' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#E65100' }}>Latest Announcements</h3>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            {announcements.map(a => (
              <li key={a.id} style={{ marginBottom: '0.25rem' }}>{a.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Profile</h3>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Mobile:</strong> {profile?.mobile}</p>
          <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
          <p><strong>Member ID:</strong> {profile?.memberId || 'Not Linked'}</p>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/member/profile" style={{ color: '#FF9933', textDecoration: 'none', fontWeight: 'bold' }}>View Profile &rarr;</Link>
          </div>
        </div>

        <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Membership Status</h3>
          <p><strong>Status:</strong> <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: profile?.status === 'Active' ? '#E8F5E9' : '#FFEBEE', color: profile?.status === 'Active' ? '#2E7D32' : '#C62828' }}>{profile?.status || 'Inactive'}</span></p>
          <p><strong>Valid Till:</strong> {profile?.validTill || 'N/A'}</p>
          <p><strong>Monthly Fee:</strong> {profile?.monthlyFee ? `₹${profile.monthlyFee}` : 'N/A'}</p>
          <p><strong>Type:</strong> {profile?.membershipType || 'Standard'}</p>
        </div>
      </div>

      <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>Recent Payments</h3>
          <Link to="/member/payments" style={{ color: '#FF9933', textDecoration: 'none', fontWeight: 'bold' }}>View All &rarr;</Link>
        </div>
        
        {payments.length === 0 ? (
          <p>No recent payments found.</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '0.75rem 0' }}>Date</th>
                <th style={{ padding: '0.75rem 0' }}>Amount</th>
                <th style={{ padding: '0.75rem 0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 3).map(payment => (
                <tr key={payment.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem 0' }}>{payment.date}</td>
                  <td style={{ padding: '0.75rem 0' }}>₹{payment.amount}</td>
                  <td style={{ padding: '0.75rem 0' }}>
                    <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', background: payment.status === 'Completed' ? '#E8F5E9' : '#FFF3E0', color: payment.status === 'Completed' ? '#2E7D32' : '#EF6C00' }}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
