import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Megaphone, Edit, Trash2 } from 'lucide-react';
import announcementService from '../../services/announcementService';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import { formatDate } from '../../utils/dateUtils';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general',
    active: true,
    expiryDate: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const data = await announcementService.getAllAnnouncements();
      setAnnouncements(data || []);
    } catch (error) {
      toast.error('Failed to fetch announcements');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentId(null);
    setFormData({
      title: '',
      message: '',
      type: 'general',
      active: true,
      expiryDate: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (announcement) => {
    setModalMode('edit');
    setCurrentId(announcement.id || announcement._id);
    setFormData({
      title: announcement.title || '',
      message: announcement.message || '',
      type: announcement.type || 'general',
      active: announcement.active !== false,
      expiryDate: announcement.expiryDate ? new Date(announcement.expiryDate).toISOString().split('T')[0] : ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await announcementService.deleteAnnouncement(id);
      toast.success('Announcement deleted');
      fetchAnnouncements();
    } catch (error) {
      toast.error('Failed to delete announcement');
    }
  };

  const handleToggleActive = async (announcement) => {
    try {
      const id = announcement.id || announcement._id;
      await announcementService.updateAnnouncement(id, { active: !announcement.active });
      toast.success(`Announcement ${announcement.active ? 'deactivated' : 'activated'}`);
      fetchAnnouncements();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { ...formData };
      if (!payload.expiryDate) delete payload.expiryDate;

      if (modalMode === 'add') {
        await announcementService.createAnnouncement(payload);
        toast.success('Announcement added successfully');
      } else {
        await announcementService.updateAnnouncement(currentId, payload);
        toast.success('Announcement updated successfully');
      }
      setIsModalOpen(false);
      fetchAnnouncements();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>Announcements</h2>
        <Button icon={Plus} onClick={handleOpenAdd}>Add Announcement</Button>
      </div>

      <div className="table-container">
        {loading ? (
          <LoadingSpinner />
        ) : announcements.length === 0 ? (
          <EmptyState 
            icon={Megaphone}
            title="No announcements found"
            description="Create an announcement to share news, offers, or alerts with members."
            action={<Button onClick={handleOpenAdd}>Add Announcement</Button>}
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Expiry Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((ann) => {
                  const id = ann.id || ann._id;
                  return (
                    <tr key={id}>
                      <td>
                        <button 
                          onClick={() => handleToggleActive(ann)}
                          style={{
                            background: ann.active ? '#E8F5E9' : '#FFEBEE',
                            color: ann.active ? '#2E7D32' : '#C62828',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '0.8rem'
                          }}
                        >
                          {ann.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td style={{ fontWeight: 600 }}>{ann.title}</td>
                      <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ann.message}
                      </td>
                      <td>
                        <Badge type={ann.type === 'festival' ? 'Special' : ann.type === 'warning' ? 'Due' : 'Regular'}>
                          {ann.type.charAt(0).toUpperCase() + ann.type.slice(1)}
                        </Badge>
                      </td>
                      <td>{ann.expiryDate ? formatDate(ann.expiryDate) : 'Never'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleOpenEdit(ann)}>Edit</Button>
                          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => handleDelete(id)} style={{ color: '#d32f2f' }}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add New Announcement' : 'Edit Announcement'}>
        <form onSubmit={handleSubmit} className="modal-body">
          <Input
            label="Title"
            value={formData.title}
            onChange={e => { setFormData({...formData, title: e.target.value}); setFormErrors({...formErrors, title: ''}); }}
            error={formErrors.title}
            required
            style={{ marginBottom: '16px' }}
          />
          
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label required">Message</label>
            <textarea
              className={`form-input ${formErrors.message ? 'error' : ''}`}
              value={formData.message}
              onChange={e => { setFormData({...formData, message: e.target.value}); setFormErrors({...formErrors, message: ''}); }}
              rows={4}
              style={{ width: '100%', resize: 'vertical' }}
            />
            {formErrors.message && <div className="form-error">{formErrors.message}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">Type</label>
              <select 
                className="form-input" 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                style={{ width: '100%' }}
              >
                <option value="general">General</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="festival">Festival</option>
              </select>
            </div>
            
            <Input
              label="Expiry Date (Optional)"
              type="date"
              value={formData.expiryDate}
              onChange={e => setFormData({...formData, expiryDate: e.target.value})}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input 
              type="checkbox" 
              id="activeToggle"
              checked={formData.active}
              onChange={e => setFormData({...formData, active: e.target.checked})}
            />
            <label htmlFor="activeToggle" style={{ cursor: 'pointer', fontWeight: 500 }}>Active immediately</label>
          </div>

          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmitting}>{modalMode === 'add' ? 'Save Announcement' : 'Update Announcement'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Announcements;
