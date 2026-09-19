import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, CreditCard, Trash2 } from 'lucide-react';
import { memberService } from '../services/memberService';
import { paymentService } from '../services/paymentService';
import { formatDate, getDaysRemaining, isExpired } from '../utils/dateUtils';
import { formatCurrency } from '../utils/formatters';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import ConfirmDialog from '../components/common/ConfirmDialog';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [member, setMember] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Payment form
  const [paymentData, setPaymentData] = useState({
    amount: '', paymentDate: new Date().toISOString().split('T')[0],
    mode: 'Cash', duration: 1, notes: ''
  });
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  // Edit form
  const [editData, setEditData] = useState({});
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [memberData, paymentsData] = await Promise.all([
        memberService.getById(id),
        paymentService.getMemberPayments(id)
      ]);
      setMember(memberData);
      setPayments(paymentsData);
      setPaymentData(prev => ({ ...prev, amount: memberData.monthlyFee }));
    } catch (error) {
      toast.error('Failed to load member details');
      navigate('/members');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingPayment(true);
    try {
      await paymentService.createPayment(id, {
        amount: paymentData.amount,
        paymentDate: paymentData.paymentDate,
        paymentMode: paymentData.mode.replace(' ', '_').toUpperCase(),
        notes: paymentData.notes,
        months: paymentData.duration
      });
      toast.success('Payment recorded successfully');
      setIsPaymentModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to record payment');
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingEdit(true);
    try {
      await memberService.update(id, editData);
      toast.success('Member updated successfully');
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to update member');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDelete = async () => {
    try {
      await memberService.delete(id);
      toast.success('Member deleted successfully');
      navigate('/members');
    } catch (error) {
      toast.error('Failed to delete member');
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (!member) return null;

  const daysRemaining = getDaysRemaining(member.validTill);
  const expired = !member.validTill || isExpired(member.validTill);
  const currentStatus = member.currentStatus || 'DUE';

  // Calculate preview dates for payment modal
  const calcPaymentPreview = () => {
    const pDate = new Date(paymentData.paymentDate);
    if (isNaN(pDate)) return null;
    
    let fromDate;
    if (!expired && member.validTill) {
      fromDate = new Date(member.validTill);
      fromDate.setDate(fromDate.getDate() + 1);
    } else {
      fromDate = pDate;
    }
    
    const tillDate = new Date(fromDate);
    tillDate.setMonth(tillDate.getMonth() + Number(paymentData.duration));
    tillDate.setDate(tillDate.getDate() - 1);
    
    return { from: fromDate, till: tillDate };
  };
  
  const preview = calcPaymentPreview();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('/members')}
          style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {member.name}
            <Badge status={currentStatus} />
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Member ID: {member.memberId}</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={Edit} onClick={() => { setEditData(member); setIsEditModalOpen(true); }}>Edit</Button>
          <Button variant="primary" icon={CreditCard} onClick={() => setIsPaymentModalOpen(true)}>Mark Fee Paid</Button>
        </div>
      </div>

      <div className="detail-grid">
        {/* Profile Card */}
        <div className="card">
          <div className="profile-header">
            <div className="avatar-lg">{member.name.charAt(0)}</div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>{member.name}</h3>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{member.mobile} • {member.email || 'No email'}</div>
              <Badge type={member.membershipType} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Joining Date</div>
              <div style={{ fontWeight: 500 }}>{formatDate(member.joiningDate)}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Address</div>
              <div style={{ fontWeight: 500 }}>{member.address || '—'}</div>
            </div>
          </div>
        </div>

        {/* Fee Status Card */}
        <div className="card" style={{ background: expired ? 'var(--due-bg)' : 'white', borderColor: expired ? '#fca5a5' : 'var(--border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
            Fee Status
            <Badge status={currentStatus} />
          </h3>
          
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {formatCurrency(member.monthlyFee)} <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>/ month</span>
          </div>
          
          {expired ? (
            <div style={{ color: '#dc2626', fontWeight: 500, margin: '16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: '#dc2626', borderRadius: '50%' }}></div>
              Fees overdue. Please collect payment.
            </div>
          ) : daysRemaining <= 7 ? (
            <div style={{ color: '#d97706', fontWeight: 500, margin: '16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
              Membership expiring soon ({daysRemaining} days left)
            </div>
          ) : null}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Valid From</div>
              <div style={{ fontWeight: 500 }}>{formatDate(member.latestPayment?.validFrom)}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Valid Till</div>
              <div style={{ fontWeight: 600, color: expired ? '#dc2626' : 'var(--active)' }}>{formatDate(member.validTill)}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Last Payment</div>
              <div style={{ fontWeight: 500 }}>{formatDate(member.latestPayment?.paymentDate)}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Monthly Fee</div>
              <div style={{ fontWeight: 500 }}>{formatCurrency(member.monthlyFee)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Payment History</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Valid From</th>
                <th>Valid Till</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(payment.paymentDate)}</td>
                    <td style={{ fontWeight: 600, color: 'var(--active)' }}>+{formatCurrency(payment.amount)}</td>
                    <td>{formatDate(payment.validFrom)}</td>
                    <td>{formatDate(payment.validTill)}</td>
                    <td>
                      <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {payment.paymentMode || 'CASH'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No payment history. Record the first payment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        <Button variant="ghost" style={{ color: 'var(--due)' }} icon={Trash2} onClick={() => setIsDeleteModalOpen(true)}>
          Delete Member
        </Button>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title={`Record Payment - ${member.name}`}>
        <form onSubmit={handlePaymentSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input
                label="Payment Date"
                type="date"
                value={paymentData.paymentDate}
                onChange={e => setPaymentData({...paymentData, paymentDate: e.target.value})}
                required
              />
              <Input
                label="Amount (₹)"
                type="number"
                value={paymentData.amount}
                onChange={e => setPaymentData({...paymentData, amount: e.target.value})}
                required
              />
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <label className="form-label required">Payment Mode</label>
              <div className="payment-modes">
                {['Cash', 'UPI', 'Bank Transfer', 'Cheque'].map(mode => (
                  <button
                    key={mode}
                    type="button"
                    className={`payment-mode-btn ${paymentData.mode === mode ? 'active' : ''}`}
                    onClick={() => setPaymentData({...paymentData, mode})}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Notes (Optional)"
              type="text"
              value={paymentData.notes}
              onChange={e => setPaymentData({...paymentData, notes: e.target.value})}
              placeholder="Transaction ID, remarks, etc."
            />

            {preview && (
              <div style={{ marginTop: '20px', padding: '16px', background: 'var(--surface-2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Validity Preview</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
                  <span>{formatDate(preview.from)}</span>
                  <span style={{ color: 'var(--text-muted)' }}>→</span>
                  <span style={{ color: 'var(--active)' }}>{formatDate(preview.till)}</span>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <Button variant="ghost" type="button" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmittingPayment}>Record Payment</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Member" size="lg">
        <form onSubmit={handleEditSubmit} className="modal-body">
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Input label="Full Name" value={editData.name || ''} onChange={e => setEditData({...editData, name: e.target.value})} required />
            <Input label="Mobile Number" value={editData.mobile || ''} onChange={e => setEditData({...editData, mobile: e.target.value})} required />
            <Input label="Email Address" type="email" value={editData.email || ''} onChange={e => setEditData({...editData, email: e.target.value})} />
          </div>
          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmittingEdit}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Member"
        message={`Are you sure you want to delete ${member.name}? This action cannot be undone and will delete all payment history.`}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};

export default MemberDetail;
