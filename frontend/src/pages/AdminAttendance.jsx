import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { attendanceService } from '../services/attendanceService';
import { useToast } from '../contexts/ToastContext';
import { QrCode, PlusCircle, RefreshCw, CheckCircle, Users, Clock, Calendar } from 'lucide-react';
import Button from '../components/common/Button';

const AdminAttendance = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creatingLunch, setCreatingLunch] = useState(false);
  const [creatingDinner, setCreatingDinner] = useState(false);
  const toast = useToast();

  const fetchTodaySummary = async (showToastOnErr = false) => {
    try {
      const data = await attendanceService.getTodaySummary();
      if (data && data.success) {
        setSummary(data);
      }
    } catch (err) {
      console.error('Failed to fetch attendance summary:', err);
      if (showToastOnErr) toast.error('Failed to refresh today\'s attendance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaySummary();
    // Live update via polling every 3 seconds
    const interval = setInterval(() => {
      fetchTodaySummary(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateLunchQR = async () => {
    setCreatingLunch(true);
    try {
      const res = await attendanceService.createLunchSession();
      if (res.success) {
        toast.success("Today's Lunch QR code generated successfully!");
        fetchTodaySummary();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate Lunch QR code");
    } finally {
      setCreatingLunch(false);
    }
  };

  const handleCreateDinnerQR = async () => {
    setCreatingDinner(true);
    try {
      const res = await attendanceService.createDinnerSession();
      if (res.success) {
        toast.success("Today's Dinner QR code generated successfully!");
        fetchTodaySummary();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate Dinner QR code");
    } finally {
      setCreatingDinner(false);
    }
  };

  const getQRUrl = (token) => {
    const origin = window.location.origin;
    return `${origin}/attendance/verify/${token}`;
  };

  return (
    <div className="dashboard-page" style={{ padding: '24px' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
            TODAY'S MESS ATTENDANCE
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>
            <Calendar size={16} color="var(--primary)" />
            <span>{summary?.formattedDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => fetchTodaySummary(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={16} />
          <span>Refresh Live</span>
        </Button>
      </div>

      {loading && !summary ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading attendance dashboard...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          
          {/* ================================================= */}
          {/* 1. LUNCH ATTENDANCE SECTION                       */}
          {/* ================================================= */}
          <div className="card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f3e5ab'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>🍛</span>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                    LUNCH ATTENDANCE
                  </h2>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Session Status: {summary?.lunch?.active ? '🟢 ACTIVE' : '⚪ INACTIVE'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateLunchQR}
                disabled={creatingLunch}
                className="btn-darbar-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: creatingLunch ? 'not-allowed' : 'pointer'
                }}
              >
                <PlusCircle size={18} />
                {creatingLunch ? 'Generating...' : "CREATE TODAY'S LUNCH QR"}
              </button>
            </div>

            {/* Session Card Content */}
            {summary?.lunch?.active && summary?.lunch?.session ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* QR Display */}
                <div style={{
                  background: '#ffffff',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '2px dashed var(--darbar-gold)',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                }}>
                  <QRCodeSVG
                    value={getQRUrl(summary.lunch.session.token)}
                    size={180}
                    level="H"
                    includeMargin={true}
                  />
                  <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Active Lunch QR Token
                  </div>
                </div>

                {/* Session Meta */}
                <div style={{
                  background: '#fcf8f2',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Date:</span>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>{summary.formattedDate}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Meal:</span>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>Lunch</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Status:</span>
                    <div>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
                        🟢 ACTIVE
                      </span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Attendance:</span>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d' }}>
                      {summary.lunch.count} members
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
                No active Lunch QR generated for today yet. Click "CREATE TODAY'S LUNCH QR" above to generate one.
              </div>
            )}

            {/* Attendance Member List Table */}
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--primary)" />
              TODAY'S LUNCH ATTENDANCE LIST (Total Present: {summary?.lunch?.count || 0})
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f5efe6', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Member ID</th>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>Time</th>
                    <th style={{ padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {summary?.lunch?.members && summary.lunch.members.length > 0 ? (
                    summary.lunch.members.map((row) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>{row.memberId}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{row.time}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ color: '#15803d', fontWeight: 700, background: '#dcfce7', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>
                            🟢 Present
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No members have marked Lunch attendance yet today.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>


          {/* ================================================= */}
          {/* 2. DINNER ATTENDANCE SECTION                      */}
          {/* ================================================= */}
          <div className="card" style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f3e5ab'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>🍽</span>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                    DINNER ATTENDANCE
                  </h2>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Session Status: {summary?.dinner?.active ? '🟢 ACTIVE' : '⚪ INACTIVE'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateDinnerQR}
                disabled={creatingDinner}
                className="btn-darbar-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: creatingDinner ? 'not-allowed' : 'pointer'
                }}
              >
                <PlusCircle size={18} />
                {creatingDinner ? 'Generating...' : "CREATE TODAY'S DINNER QR"}
              </button>
            </div>

            {/* Session Card Content */}
            {summary?.dinner?.active && summary?.dinner?.session ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* QR Display */}
                <div style={{
                  background: '#ffffff',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '2px dashed var(--darbar-gold)',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                }}>
                  <QRCodeSVG
                    value={getQRUrl(summary.dinner.session.token)}
                    size={180}
                    level="H"
                    includeMargin={true}
                  />
                  <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Active Dinner QR Token
                  </div>
                </div>

                {/* Session Meta */}
                <div style={{
                  background: '#fcf8f2',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Date:</span>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>{summary.formattedDate}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Meal:</span>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>Dinner</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Status:</span>
                    <div>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
                        🟢 ACTIVE
                      </span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Attendance:</span>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d' }}>
                      {summary.dinner.count} members
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>
                No active Dinner QR generated for today yet. Click "CREATE TODAY'S DINNER QR" above to generate one.
              </div>
            )}

            {/* Attendance Member List Table */}
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="var(--primary)" />
              TODAY'S DINNER ATTENDANCE LIST (Total Present: {summary?.dinner?.count || 0})
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f5efe6', borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Member ID</th>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>Time</th>
                    <th style={{ padding: '12px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {summary?.dinner?.members && summary.dinner.members.length > 0 ? (
                    summary.dinner.members.map((row) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>{row.memberId}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{row.time}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ color: '#15803d', fontWeight: 700, background: '#dcfce7', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>
                            🟢 Present
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No members have marked Dinner attendance yet today.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminAttendance;
