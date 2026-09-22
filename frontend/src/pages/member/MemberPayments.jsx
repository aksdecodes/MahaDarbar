import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAuthService from '../../services/userAuthService';

const MemberPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await userAuthService.getMyPayments();
        setPayments(data || []);
      } catch (err) {
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Payment History</h1>
        <Link to="/member/dashboard" style={{ color: '#FF9933', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Dashboard</Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading payments...</div>
      ) : payments.length === 0 ? (
        <div style={{ padding: '3rem', background: 'white', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No payments found.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#fafafa' }}>
                <tr>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Date</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Amount</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Valid From</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Valid Till</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Mode</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{payment.date}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>₹{payment.amount}</td>
                    <td style={{ padding: '1rem' }}>{payment.validFrom || '-'}</td>
                    <td style={{ padding: '1rem' }}>{payment.validTill || '-'}</td>
                    <td style={{ padding: '1rem' }}>{payment.paymentMode || 'Online'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', background: payment.status === 'Completed' ? '#E8F5E9' : '#FFF3E0', color: payment.status === 'Completed' ? '#2E7D32' : '#EF6C00' }}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPayments;
