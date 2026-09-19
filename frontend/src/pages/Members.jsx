import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Search, Eye, Users } from 'lucide-react';
import { memberService } from '../services/memberService';
import { formatDate, getDaysRemaining } from '../utils/dateUtils';
import { formatCurrency } from '../utils/formatters';
import { validateMemberForm } from '../utils/validators';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters & Pagination state
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(searchParams.get('add') === 'true');
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', address: '', 
    joiningDate: new Date().toISOString().split('T')[0],
    membershipType: 'Regular', monthlyFee: 2300
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const membershipOptions = [
    { type: 'Regular', price: 2300 },
    { type: 'Special', price: 2800 },
    { type: 'Premium', price: 3200 }
  ];

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit, sortBy };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'ALL') params.status = statusFilter;

      const data = await memberService.getAll(params);
      setMembers(data.members);
      setTotalItems(data.total);
      setTotalPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, debouncedSearch, statusFilter, toast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const errors = validateMemberForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await memberService.create(formData);
      toast.success('Member added successfully');
      setIsAddModalOpen(false);
      setFormData({
        name: '', mobile: '', email: '', address: '', 
        joiningDate: new Date().toISOString().split('T')[0],
        membershipType: 'Regular', monthlyFee: 2300
      });
      fetchMembers();
      
      if (searchParams.get('add')) {
        searchParams.delete('add');
        setSearchParams(searchParams);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add member');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>Members</h2>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>Add New Member</Button>
      </div>

      <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name, mobile, or member ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
          
          <div className="filter-tabs" style={{ margin: 0 }}>
            {['ALL', 'ACTIVE', 'DUE'].map(status => (
              <button
                key={status}
                className={`filter-tab ${statusFilter === status ? 'active' : ''}`}
                onClick={() => { setStatusFilter(status); setPage(1); }}
              >
                {status === 'ALL' ? 'All' : status === 'ACTIVE' ? 'Active' : 'Fees Due'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              className="form-input" 
              value={sortBy} 
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              style={{ width: 'auto' }}
            >
              <option value="createdAt">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="validTill">Valid Till (Asc)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <LoadingSpinner />
        ) : members.length === 0 ? (
          <EmptyState 
            icon={Users}
            title={searchTerm ? "No members match your search" : "No members found"}
            description={searchTerm ? "Try adjusting your search criteria." : "Get started by adding your first mess member."}
            action={!searchTerm && <Button onClick={() => setIsAddModalOpen(true)}>Add Member</Button>}
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>Sr. No.</th>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Fee</th>
                  <th>Membership</th>
                  <th>Valid Till</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => {
                  const daysLeft = getDaysRemaining(member.validTill);
                  const status = member.currentStatus || 'DUE';
                  const isExp = status === 'DUE';
                  
                  return (
                    <tr key={member._id} onClick={() => navigate(`/members/${member._id}`)}>
                      <td>
                        <div className={`status-dot ${status.toLowerCase()}`}></div>
                      </td>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{member.memberId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{member.name}</div>
                        {member.email && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{member.email}</div>}
                      </td>
                      <td>{member.mobile}</td>
                      <td style={{ fontWeight: 500 }}>{formatCurrency(member.monthlyFee)}</td>
                      <td><Badge type={member.membershipType} /></td>
                      <td>
                        <div>{member.validTill ? formatDate(member.validTill) : '—'}</div>
                        {member.validTill && (
                          <div style={{ fontSize: '12px', color: isExp ? 'var(--due)' : 'var(--text-muted)' }}>
                            {isExp ? `Expired ${Math.abs(daysLeft)} days ago` : `${daysLeft} days left`}
                          </div>
                        )}
                        {!member.validTill && <div style={{ fontSize: '12px', color: 'var(--due)' }}>No payment</div>}
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <Button variant="secondary" size="sm" icon={Eye} onClick={() => navigate(`/members/${member._id}`)}>View</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && members.length > 0 && (
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={totalItems}
          itemsPerPage={limit}
          onItemsPerPageChange={(newLimit) => { setLimit(newLimit); setPage(1); }}
        />
      )}

      {/* Add Member Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Member" size="lg">
        <form onSubmit={handleAddSubmit} className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Input
              label="Full Name"
              value={formData.name}
              onChange={e => { setFormData({...formData, name: e.target.value}); setFormErrors({...formErrors, name: ''}); }}
              error={formErrors.name}
              required
            />
            <Input
              label="Mobile Number"
              value={formData.mobile}
              onChange={e => { setFormData({...formData, mobile: e.target.value}); setFormErrors({...formErrors, mobile: ''}); }}
              error={formErrors.mobile}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={e => { setFormData({...formData, email: e.target.value}); setFormErrors({...formErrors, email: ''}); }}
              error={formErrors.email}
            />
            <Input
              label="Joining Date"
              type="date"
              value={formData.joiningDate}
              onChange={e => { setFormData({...formData, joiningDate: e.target.value}); setFormErrors({...formErrors, joiningDate: ''}); }}
              error={formErrors.joiningDate}
              required
            />
          </div>

          <Input
            label="Address"
            type="textarea"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
            style={{ marginTop: '20px' }}
          />

          <div style={{ marginTop: '24px' }}>
            <label className="form-label required">Membership Type</label>
            <div className="membership-cards">
              {membershipOptions.map(opt => (
                <div 
                  key={opt.type}
                  className={`membership-card ${formData.membershipType === opt.type ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, membershipType: opt.type, monthlyFee: opt.price})}
                >
                  <div className="membership-card-title">{opt.type}</div>
                  <div className="membership-card-price">₹{opt.price}</div>
                  <div className="membership-card-period">per month</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Input
              label="Custom Monthly Fee (₹)"
              type="number"
              value={formData.monthlyFee}
              onChange={e => { setFormData({...formData, monthlyFee: e.target.value}); setFormErrors({...formErrors, monthlyFee: ''}); }}
              error={formErrors.monthlyFee}
              required
            />
          </div>
          
          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmitting}>Save Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Members;
