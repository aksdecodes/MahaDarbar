import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertTriangle, QrCode, ArrowLeft, UserCheck, Phone, Lock } from 'lucide-react';
import axios from 'axios';
import Input from '../components/common/Input';
import '../styles/public.css';

const AttendanceVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Session info (what meal/date this QR is for) ──────────────────
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [sessionError, setSessionError] = useState('');

  // ── Member auth — ONLY use memberToken, NEVER admin token ─────────
  const getMemberToken = () => localStorage.getItem('memberToken') || null;
  const getMemberUser = () => {
    try {
      const s = localStorage.getItem('memberUser');
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  };

  const [memberToken, setMemberToken] = useState(getMemberToken);
  const [memberUser, setMemberUser] = useState(getMemberUser);

  // ── Inline sign-in form ───────────────────────────────────────────
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ── Attendance result ─────────────────────────────────────────────
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // 1. Fetch and validate session token
  useEffect(() => {
    const fetchSession = async () => {
      setLoadingSession(true);
      setSessionError('');
      try {
        const res = await axios.get(`/api/attendance/verify-session/${token}`);
        if (res.data?.success) {
          setSessionInfo(res.data.data);
        } else {
          setSessionError(res.data?.message || 'Invalid QR code');
        }
      } catch (err) {
        setSessionError(err.response?.data?.message || 'This QR code is no longer valid or does not exist.');
      } finally {
        setLoadingSession(false);
      }
    };
    if (token) fetchSession();
  }, [token]);

  // 2. Member sign-in inline
  const handleMemberLogin = async (e) => {
    e.preventDefault();
    if (!mobile || !password) {
      setLoginError('Please enter your mobile number and password');
      return;
    }
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await axios.post('/api/user-auth/login', { mobile, password });
      if (res.data?.token) {
        localStorage.setItem('memberToken', res.data.token);
        localStorage.setItem('memberUser', JSON.stringify(res.data.user));
        setMemberToken(res.data.token);
        setMemberUser(res.data.user);
        // Auto-mark attendance immediately after login
        markAttendance(res.data.token);
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Sign in failed. Check your mobile and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  // 3. Mark attendance via API
  const markAttendance = async (tok = memberToken) => {
    if (!tok || !token) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await axios.post(
        '/api/attendance/scan',
        { token },
        { headers: { Authorization: `Bearer ${tok}` } }
      );
      setResult({
        status: 'ELIGIBLE',
        code: 'ELIGIBLE',
        message: res.data.message,
        data: res.data.data
      });
    } catch (err) {
      const errData = err.response?.data || {};
      const code = errData.code || 'ERROR';
      const message = errData.message || 'Verification failed. Please try again.';

      if (code === 'UNAUTHORIZED') {
        // Token expired or invalid — clear and show login form
        localStorage.removeItem('memberToken');
        localStorage.removeItem('memberUser');
        setMemberToken(null);
        setMemberUser(null);
        setLoginError('Your session has expired. Please sign in again.');
      } else if (code === 'ALREADY_MARKED') {
        setResult({ status: 'ALREADY_MARKED', code, message });
      } else if (code === 'NOT_ELIGIBLE') {
        setResult({ status: 'NOT_ELIGIBLE', code, message });
      } else {
        setResult({ status: 'INVALID_QR', code, message });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const mealEmoji = sessionInfo?.mealType === 'LUNCH' ? '🍛' : '🍽';
  const mealColor = sessionInfo?.mealType === 'LUNCH' ? '#d97706' : '#7c3aed';

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
      <Link
        to="/"
        style={{
          position: 'absolute', top: '24px', left: '24px',
          color: '#f3e5ab', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '14px', fontWeight: 700,
          background: 'rgba(255,255,255,0.08)',
          padding: '8px 16px', borderRadius: '20px',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        <ArrowLeft size={16} /> Back to Website
      </Link>

      <div style={{
        width: '100%', maxWidth: '440px',
        background: '#ffffff', borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        border: '2px solid var(--darbar-gold)',
        overflow: 'hidden'
      }}>

        {/* ── Card Header ───────────────────────────────────── */}
        <div style={{
          background: 'var(--darbar-burgundy)',
          padding: '24px', textAlign: 'center',
          borderBottom: '2px solid var(--darbar-gold)'
        }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'linear-gradient(135deg, #7a1520 0%, #4a0c13 100%)',
            border: '2px solid var(--darbar-gold)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 10px'
          }}>
            <QrCode size={26} color="var(--darbar-gold)" />
          </div>
          <h1 style={{ fontFamily: "'Rozha One', Georgia, serif", fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
            Maharashtra Darbar
          </h1>
          <p style={{ fontSize: '13px', color: '#f3e5ab' }}>Mess Attendance Verification</p>
        </div>

        {/* ── Card Body ─────────────────────────────────────── */}
        <div style={{ padding: '24px' }}>

          {/* LOADING SESSION */}
          {loadingSession && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--darbar-text-muted)', fontSize: '14px' }}>
              Validating QR session...
            </div>
          )}

          {/* INVALID SESSION */}
          {!loadingSession && sessionError && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '64px', height: '64px', background: '#fee2e2', color: '#dc2626',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', border: '3px solid #fca5a5'
              }}>
                <XCircle size={36} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#dc2626', marginBottom: '8px' }}>
                🔴 INVALID QR
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--darbar-text-muted)', marginBottom: '24px' }}>
                {sessionError}
              </p>
              <Link to="/" style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                padding: '12px', background: 'var(--darbar-burgundy)', color: '#fff',
                borderRadius: '12px', fontWeight: 700, fontSize: '14px'
              }}>
                Return to Public Website
              </Link>
            </div>
          )}

          {/* SESSION VALID */}
          {!loadingSession && sessionInfo && (
            <div>

              {/* Session Badge */}
              <div style={{
                background: '#fcf8f2', border: '1px solid var(--darbar-border)',
                borderRadius: '14px', padding: '14px 16px',
                marginBottom: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '28px' }}>{mealEmoji}</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                      {sessionInfo.mealType} SESSION
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--darbar-text-muted)' }}>
                      {sessionInfo.formattedDate}
                    </div>
                  </div>
                </div>
                <span style={{
                  background: '#dcfce7', color: '#15803d',
                  padding: '4px 12px', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  🟢 ACTIVE
                </span>
              </div>

              {/* ─────── RESULT DISPLAY ─────── */}
              {result ? (
                <div style={{ textAlign: 'center' }}>

                  {/* ✅ ELIGIBLE */}
                  {result.status === 'ELIGIBLE' && (
                    <div>
                      {/* Big green success ring */}
                      <div style={{
                        width: '90px', height: '90px',
                        background: 'radial-gradient(circle, #dcfce7 0%, #bbf7d0 100%)',
                        color: '#15803d',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '4px solid #86efac',
                        boxShadow: '0 0 0 8px rgba(134, 239, 172, 0.2)'
                      }}>
                        <CheckCircle2 size={48} strokeWidth={2.5} />
                      </div>

                      <div style={{
                        fontSize: '26px', fontWeight: 900, color: '#15803d',
                        marginBottom: '6px', letterSpacing: '-0.5px'
                      }}>
                        🟢 ELIGIBLE
                      </div>

                      <div style={{
                        fontSize: '15px', fontWeight: 700, color: 'var(--darbar-burgundy)',
                        marginBottom: '4px'
                      }}>
                        {memberUser?.name && `${memberUser.name} — `}{sessionInfo.mealType} attendance confirmed!
                      </div>

                      <p style={{ fontSize: '14px', color: '#16a34a', fontWeight: 600, marginBottom: '4px' }}>
                        {result.message}
                      </p>

                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: '#f0fdf4', border: '1px solid #bbf7d0',
                        borderRadius: '10px', padding: '8px 16px', marginTop: '8px', marginBottom: '20px'
                      }}>
                        <span style={{ fontSize: '13px', color: '#166534', fontWeight: 700 }}>
                          📅 {sessionInfo.formattedDate}
                          {result.data?.markedAtFormatted ? ` · ⏰ ${result.data.markedAtFormatted}` : ''}
                        </span>
                      </div>

                      <Link to="/" style={{
                        display: 'block', textDecoration: 'none',
                        padding: '13px', background: 'var(--darbar-burgundy)',
                        color: '#fff', borderRadius: '14px',
                        fontWeight: 800, fontSize: '15px', textAlign: 'center'
                      }}>
                        Back to Homepage
                      </Link>
                    </div>
                  )}

                  {/* 🟠 ALREADY MARKED */}
                  {result.status === 'ALREADY_MARKED' && (
                    <div>
                      <div style={{
                        width: '80px', height: '80px',
                        background: '#fef9c3', color: '#ca8a04',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '4px solid #fde047',
                        boxShadow: '0 0 0 6px rgba(253, 224, 71, 0.2)'
                      }}>
                        <AlertTriangle size={42} strokeWidth={2.5} />
                      </div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#ca8a04', marginBottom: '8px' }}>
                        🟠 ALREADY MARKED
                      </div>
                      <p style={{ fontSize: '14px', color: '#92400e', fontWeight: 600, marginBottom: '20px' }}>
                        {result.message}
                      </p>
                      <Link to="/" style={{
                        display: 'block', textDecoration: 'none',
                        padding: '12px', background: 'var(--darbar-burgundy)',
                        color: '#fff', borderRadius: '12px', fontWeight: 700, textAlign: 'center'
                      }}>
                        Back to Homepage
                      </Link>
                    </div>
                  )}

                  {/* 🔴 NOT ELIGIBLE */}
                  {result.status === 'NOT_ELIGIBLE' && (
                    <div>
                      <div style={{
                        width: '80px', height: '80px',
                        background: '#fee2e2', color: '#dc2626',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '4px solid #fca5a5'
                      }}>
                        <XCircle size={42} strokeWidth={2.5} />
                      </div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#dc2626', marginBottom: '8px' }}>
                        🔴 NOT ELIGIBLE
                      </div>
                      <p style={{ fontSize: '14px', color: '#991b1b', fontWeight: 600, marginBottom: '20px' }}>
                        {result.message}
                      </p>
                      <Link to="/" style={{
                        display: 'block', textDecoration: 'none',
                        padding: '12px', background: 'var(--darbar-burgundy)',
                        color: '#fff', borderRadius: '12px', fontWeight: 700, textAlign: 'center'
                      }}>
                        Back to Homepage
                      </Link>
                    </div>
                  )}

                  {/* 🔴 INVALID QR / other errors */}
                  {result.status === 'INVALID_QR' && (
                    <div>
                      <div style={{
                        width: '80px', height: '80px',
                        background: '#fee2e2', color: '#dc2626',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '4px solid #fca5a5'
                      }}>
                        <XCircle size={42} strokeWidth={2.5} />
                      </div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#dc2626', marginBottom: '8px' }}>
                        🔴 INVALID QR
                      </div>
                      <p style={{ fontSize: '14px', color: '#991b1b', fontWeight: 600, marginBottom: '20px' }}>
                        {result.message}
                      </p>
                      <Link to="/" style={{
                        display: 'block', textDecoration: 'none',
                        padding: '12px', background: 'var(--darbar-burgundy)',
                        color: '#fff', borderRadius: '12px', fontWeight: 700, textAlign: 'center'
                      }}>
                        Back to Homepage
                      </Link>
                    </div>
                  )}

                </div>
              ) : (
                /* ─────── BEFORE SUBMISSION ─────── */
                <div>

                  {/* NOT SIGNED IN → show inline sign-in form */}
                  {!memberToken ? (
                    <div>
                      <div style={{
                        background: '#fffbeb', border: '1px solid #fef3c7',
                        borderRadius: '12px', padding: '12px 14px',
                        marginBottom: '18px', fontSize: '13.5px',
                        color: '#92400e', fontWeight: 600
                      }}>
                        🔒 Sign in with your registered mobile number to mark attendance.
                      </div>

                      {loginError && (
                        <div style={{
                          padding: '10px 14px', background: '#fee2e2', color: '#dc2626',
                          borderRadius: '10px', marginBottom: '14px',
                          fontSize: '13px', fontWeight: 600
                        }}>
                          {loginError}
                        </div>
                      )}

                      <form onSubmit={handleMemberLogin}>
                        <div style={{ marginBottom: '14px' }}>
                          <Input
                            label="Mobile Number"
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Your 10-digit mobile number"
                            required
                          />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                          <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loginLoading}
                          style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, #7a1520 0%, #4a0c13 100%)',
                            color: '#fff', border: '1px solid var(--darbar-gold)',
                            padding: '13px', borderRadius: '12px',
                            fontWeight: 800, fontSize: '15px',
                            cursor: loginLoading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 14px rgba(74, 12, 19, 0.3)'
                          }}
                        >
                          {loginLoading ? 'Signing in...' : `Sign In & Mark ${sessionInfo?.mealType || ''} Attendance`}
                        </button>
                      </form>

                      <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '13px', color: 'var(--darbar-text-muted)' }}>
                        First time?{' '}
                        <Link
                          to="/login"
                          state={{ returnTo: location.pathname }}
                          style={{ color: 'var(--darbar-maroon)', fontWeight: 700 }}
                        >
                          Create your member account
                        </Link>
                      </div>
                    </div>

                  ) : (
                    /* SIGNED IN → show mark attendance button */
                    <div>
                      {/* Member info strip */}
                      <div style={{
                        background: '#f8fafc', border: '1px solid #e2e8f0',
                        borderRadius: '12px', padding: '12px 14px',
                        marginBottom: '20px',
                        display: 'flex', alignItems: 'center', gap: '12px'
                      }}>
                        <div style={{
                          width: '40px', height: '40px',
                          background: 'var(--darbar-burgundy)', color: '#fcd34d',
                          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 800, fontSize: '18px', flexShrink: 0
                        }}>
                          {memberUser?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--darbar-burgundy)' }}>
                            {memberUser?.name || 'Member'}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--darbar-text-muted)' }}>
                            📱 {memberUser?.mobile || memberToken?.slice(0, 8) + '...'}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            localStorage.removeItem('memberToken');
                            localStorage.removeItem('memberUser');
                            setMemberToken(null);
                            setMemberUser(null);
                          }}
                          style={{
                            marginLeft: 'auto', background: 'none', border: 'none',
                            fontSize: '11px', color: '#9ca3af', cursor: 'pointer', fontWeight: 600
                          }}
                        >
                          Sign out
                        </button>
                      </div>

                      {/* Mark Attendance Button */}
                      <button
                        onClick={() => markAttendance()}
                        disabled={submitting}
                        style={{
                          width: '100%',
                          background: submitting
                            ? '#9ca3af'
                            : 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                          color: '#ffffff', border: '1px solid #fcd34d',
                          padding: '16px', borderRadius: '14px',
                          fontWeight: 800, fontSize: '16px',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          boxShadow: submitting ? 'none' : '0 4px 15px rgba(234, 88, 12, 0.35)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <CheckCircle2 size={22} />
                        {submitting
                          ? 'Verifying & Marking...'
                          : `Mark Today's ${sessionInfo?.mealType || ''} Attendance`
                        }
                      </button>

                      <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '10px' }}>
                        This will record your attendance for today's {sessionInfo?.mealType?.toLowerCase() || 'meal'}.
                      </p>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceVerify;
