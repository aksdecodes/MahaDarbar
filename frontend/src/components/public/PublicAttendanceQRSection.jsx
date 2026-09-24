import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { attendanceService } from '../../services/attendanceService';
import '../../styles/public.css';

const PublicAttendanceQRSection = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicAttendance = async () => {
    try {
      const data = await attendanceService.getPublicToday();
      if (data && data.success) {
        setAttendanceData(data);
      }
    } catch (err) {
      console.error('Failed to load public mess QR attendance:', err);
      setError('Unable to load today\'s mess QR code. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicAttendance();
    // Poll every 10 seconds for real-time QR activation updates
    const interval = setInterval(fetchPublicAttendance, 10000);
    return () => clearInterval(interval);
  }, []);

  const getQRUrl = (token) => {
    const origin = window.location.origin;
    return `${origin}/attendance/verify/${token}`;
  };

  return (
    <section 
      id="mess-attendance-qr"
      style={{
        background: 'linear-gradient(180deg, #fdfbf7 0%, #f5efe6 100%)',
        padding: '48px 16px',
        borderTop: '1px solid var(--darbar-border)',
        borderBottom: '1px solid var(--darbar-border)'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(122, 21, 32, 0.08)',
            color: 'var(--darbar-burgundy)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '12px'
          }}>
            <Sparkles size={16} color="var(--darbar-gold)" />
            Daily Mess Attendance
          </div>

          <h2 style={{
            fontFamily: "'Rozha One', Georgia, serif",
            fontSize: 'clamp(26px, 4vw, 36px)',
            color: 'var(--darbar-burgundy)',
            fontWeight: 800,
            marginBottom: '8px'
          }}>
            TODAY'S MESS ATTENDANCE
          </h2>

          <p style={{
            fontSize: '15px',
            color: 'var(--darbar-text-muted)',
            fontWeight: 500,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {attendanceData?.formattedDate ? `${attendanceData.formattedDate}` : 'Scan today\'s active QR code to mark your Lunch & Dinner attendance'}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--darbar-text-muted)' }}>
            <Clock size={32} className="animate-spin" style={{ margin: '0 auto 12px', color: 'var(--darbar-burgundy)' }} />
            <p>Loading today's QR codes...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '16px',
            background: '#fee2e2',
            color: '#dc2626',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        {/* QR Cards Grid */}
        {!loading && attendanceData && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}>
            
            {/* LUNCH QR CARD */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: attendanceData.lunch.active ? '2px solid var(--darbar-gold)' : '1px solid var(--darbar-border)',
              boxShadow: attendanceData.lunch.active ? '0 12px 30px rgba(122, 21, 32, 0.12)' : '0 4px 12px rgba(0,0,0,0.04)',
              padding: '28px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #f3e5ab'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '24px' }}>🍛</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)', margin: 0 }}>
                      TODAY'S LUNCH QR
                    </h3>
                  </div>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 800,
                    background: attendanceData.lunch.active ? '#dcfce7' : '#f3f4f6',
                    color: attendanceData.lunch.active ? '#15803d' : '#6b7280'
                  }}>
                    {attendanceData.lunch.active ? '🟢 ACTIVE' : '⚪ INACTIVE'}
                  </span>
                </div>

                {attendanceData.lunch.active ? (
                  <div>
                    {/* QR Display Container */}
                    <div style={{
                      background: '#ffffff',
                      padding: '20px',
                      borderRadius: '16px',
                      border: '2px dashed var(--darbar-gold)',
                      display: 'inline-block',
                      margin: '0 auto 16px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                    }}>
                      <QRCodeSVG
                        value={getQRUrl(attendanceData.lunch.token)}
                        size={190}
                        level="H"
                        includeMargin={true}
                      />
                    </div>

                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--darbar-text-main)', marginBottom: '16px' }}>
                      Scan this QR code with your mobile phone to mark your Lunch attendance.
                    </p>
                  </div>
                ) : (
                  <div style={{ padding: '36px 16px' }}>
                    <Clock size={44} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--darbar-text-muted)' }}>
                      Lunch QR Not Available Yet
                    </h4>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                      Please check again later when admin generates today's Lunch QR.
                    </p>
                  </div>
                )}
              </div>

              {attendanceData.lunch.active && (
                <div style={{ marginTop: '12px' }}>
                  <a
                    href={getQRUrl(attendanceData.lunch.token)}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '12px',
                      background: 'var(--darbar-burgundy)',
                      color: '#ffffff',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(122, 21, 32, 0.25)'
                    }}
                  >
                    <QrCode size={18} color="#fcd34d" />
                    Open Attendance Link / Scan
                  </a>
                </div>
              )}
            </div>

            {/* DINNER QR CARD */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: attendanceData.dinner.active ? '2px solid var(--darbar-gold)' : '1px solid var(--darbar-border)',
              boxShadow: attendanceData.dinner.active ? '0 12px 30px rgba(122, 21, 32, 0.12)' : '0 4px 12px rgba(0,0,0,0.04)',
              padding: '28px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #f3e5ab'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '24px' }}>🍽</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--darbar-burgundy)', margin: 0 }}>
                      TODAY'S DINNER QR
                    </h3>
                  </div>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 800,
                    background: attendanceData.dinner.active ? '#dcfce7' : '#f3f4f6',
                    color: attendanceData.dinner.active ? '#15803d' : '#6b7280'
                  }}>
                    {attendanceData.dinner.active ? '🟢 ACTIVE' : '⚪ INACTIVE'}
                  </span>
                </div>

                {attendanceData.dinner.active ? (
                  <div>
                    {/* QR Display Container */}
                    <div style={{
                      background: '#ffffff',
                      padding: '20px',
                      borderRadius: '16px',
                      border: '2px dashed var(--darbar-gold)',
                      display: 'inline-block',
                      margin: '0 auto 16px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                    }}>
                      <QRCodeSVG
                        value={getQRUrl(attendanceData.dinner.token)}
                        size={190}
                        level="H"
                        includeMargin={true}
                      />
                    </div>

                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--darbar-text-main)', marginBottom: '16px' }}>
                      Scan this QR code with your mobile phone to mark your Dinner attendance.
                    </p>
                  </div>
                ) : (
                  <div style={{ padding: '36px 16px' }}>
                    <Clock size={44} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--darbar-text-muted)' }}>
                      Dinner QR Not Available Yet
                    </h4>
                    <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                      Please check again later when admin generates today's Dinner QR.
                    </p>
                  </div>
                )}
              </div>

              {attendanceData.dinner.active && (
                <div style={{ marginTop: '12px' }}>
                  <a
                    href={getQRUrl(attendanceData.dinner.token)}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '12px',
                      background: 'var(--darbar-burgundy)',
                      color: '#ffffff',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(122, 21, 32, 0.25)'
                    }}
                  >
                    <QrCode size={18} color="#fcd34d" />
                    Open Attendance Link / Scan
                  </a>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default PublicAttendanceQRSection;
