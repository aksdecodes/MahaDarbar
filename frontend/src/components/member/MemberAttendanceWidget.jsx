import React, { useState, useEffect } from 'react';
import { attendanceService } from '../../services/attendanceService';
import { CheckCircle2, Clock, Calendar, Utensils } from 'lucide-react';

const MemberAttendanceWidget = () => {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyAttendance = async () => {
    try {
      const data = await attendanceService.getMyTodayAttendance();
      if (data && data.success) {
        setAttendance(data);
      }
    } catch (err) {
      console.error('Failed to fetch member today attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  if (loading) {
    return <div style={{ padding: '16px', textTransform: 'center', color: 'var(--darbar-text-muted)' }}>Loading attendance status...</div>;
  }

  if (!attendance) return null;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid var(--darbar-border)',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
      marginTop: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #f5efe6', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Utensils size={18} color="var(--darbar-maroon)" />
          Today's Attendance
        </h3>
        <span style={{ fontSize: '12px', color: 'var(--darbar-text-muted)', fontWeight: 600 }}>
          {attendance.formattedDate}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* LUNCH CARD */}
        <div style={{
          background: attendance.lunch?.status === 'PRESENT' ? '#f0fdf4' : '#fafafa',
          border: attendance.lunch?.status === 'PRESENT' ? '1px solid #bbf7d0' : '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '14px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>🍛</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>Lunch</div>
          {attendance.lunch?.status === 'PRESENT' ? (
            <div style={{ marginTop: '8px' }}>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} /> 🟢 Present
              </span>
              {attendance.lunch.markedAtFormatted && (
                <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px', fontWeight: 600 }}>
                  Confirmed at {attendance.lunch.markedAtFormatted}
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginTop: '8px' }}>
              <span style={{ background: '#f3f4f6', color: '#6b7280', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                Not Marked
              </span>
            </div>
          )}
        </div>

        {/* DINNER CARD */}
        <div style={{
          background: attendance.dinner?.status === 'PRESENT' ? '#f0fdf4' : '#fafafa',
          border: attendance.dinner?.status === 'PRESENT' ? '1px solid #bbf7d0' : '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '14px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>🍽</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>Dinner</div>
          {attendance.dinner?.status === 'PRESENT' ? (
            <div style={{ marginTop: '8px' }}>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} /> 🟢 Present
              </span>
              {attendance.dinner.markedAtFormatted && (
                <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px', fontWeight: 600 }}>
                  Confirmed at {attendance.dinner.markedAtFormatted}
                </div>
              )}
            </div>
          ) : (
            <div style={{ marginTop: '8px' }}>
              <span style={{ background: '#f3f4f6', color: '#6b7280', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                Not Marked
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberAttendanceWidget;
