import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, UserX, Plus, Eye, ShoppingCart, ArrowRight, Package, AlertTriangle, DollarSign } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { groceryService } from '../services/groceryService';
import { formatCurrency } from '../utils/formatters';
import { getDaysRemaining } from '../utils/dateUtils';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [grocerySummary, setGrocerySummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberStats, gSummary] = await Promise.all([
          dashboardService.getStats(),
          groceryService.getGrocerySummary()
        ]);
        setStats(memberStats);
        setGrocerySummary(gSummary);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner fullPage />;

  return (
    <div>
      {/* Overview Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>Overview</h2>
        <Button icon={Plus} onClick={() => navigate('/members?add=true')}>Add New Member</Button>
      </div>

      {/* Member Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            <Users size={24} />
          </div>
          <div className="stat-card-value">{stats?.totalMembers || 0}</div>
          <div className="stat-card-label">Total Members</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--active-bg)', color: 'var(--active)' }}>
            <UserCheck size={24} />
          </div>
          <div className="stat-card-value">{stats?.activeMembers || 0}</div>
          <div className="stat-card-label">Active Members</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--due-bg)', color: 'var(--due)' }}>
            <UserX size={24} />
          </div>
          <div className="stat-card-value">{stats?.feesDue ?? 0}</div>
          <div className="stat-card-label">Fees Due</div>
        </div>
      </div>

      {/* Member Recent & Fees Due Lists */}
      <div className="detail-grid">
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Members</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentMembers?.length > 0 ? (
                  stats.recentMembers.map(member => (
                    <tr key={member._id} onClick={() => navigate(`/members/${member._id}`)}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="avatar-sm">{member.name.charAt(0)}</div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{member.memberId}</div>
                          </div>
                        </div>
                      </td>
                      <td><Badge status={member.currentStatus || 'DUE'} /></td>
                      <td>
                        <Button variant="ghost" size="sm" icon={Eye}>View</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No recent members
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Fees Due</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentDueMembers?.length > 0 ? (
                  stats.recentDueMembers.map(member => (
                    <tr key={member._id} onClick={() => navigate(`/members/${member._id}`)}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="avatar-sm" style={{ background: 'var(--due-bg)', color: 'var(--due)' }}>
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--due)' }}>
                              {member.latestValidTill
                                ? `Expired ${Math.abs(getDaysRemaining(member.latestValidTill))} days ago`
                                : 'No payment recorded'
                              }
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{formatCurrency(member.monthlyFee)}</td>
                      <td onClick={e => e.stopPropagation()}>
                        <Button variant="primary" size="sm" onClick={() => navigate(`/members/${member._id}`)}>Pay Now</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No members with pending fees
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GROCERY SECTION (PLACED BELOW MEMBERS SECTION) */}
      <div style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', 
              color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center'
            }}>
              <ShoppingCart size={20} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>Groceries Overview</h2>
          </div>
          <Button variant="ghost" onClick={() => navigate('/groceries')}>
            View Inventory <ArrowRight size={16} style={{ marginLeft: '4px' }} />
          </Button>
        </div>

        {/* Compact Grocery Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
              <Package size={22} />
            </div>
            <div className="stat-card-value">{grocerySummary?.totalItems ?? 0}</div>
            <div className="stat-card-label">Total Grocery Items</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: 'var(--due-bg)', color: 'var(--due)' }}>
              <AlertTriangle size={22} />
            </div>
            <div className="stat-card-value">
              {(grocerySummary?.lowStockItems || 0) + (grocerySummary?.outOfStockItems || 0)}
            </div>
            <div className="stat-card-label">Low / Out of Stock</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-icon" style={{ background: '#fff7ed', color: 'var(--primary)' }}>
              <DollarSign size={22} />
            </div>
            <div className="stat-card-value">{formatCurrency(grocerySummary?.monthlyPurchase || 0)}</div>
            <div className="stat-card-label">This Month Purchase</div>
          </div>
        </div>

        {/* Low Stock Items List */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
              Low Stock Items
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Items needing reorder
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Stock / Min Level</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {grocerySummary?.lowStockList?.length > 0 ? (
                  grocerySummary.lowStockList.map(item => (
                    <tr key={item._id} onClick={() => navigate('/groceries')}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{item.itemName}</div>
                        {item.supplier?.name && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supplier: {item.supplier.name}</div>}
                      </td>
                      <td><Badge type={item.category} /></td>
                      <td style={{ fontWeight: 600 }}>
                        {item.currentStock} {item.unit} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>/ Min: {item.minimumStock} {item.unit}</span>
                      </td>
                      <td><Badge stockStatus={item.status} /></td>
                      <td onClick={e => e.stopPropagation()}>
                        <Button variant="primary" size="sm" onClick={() => navigate('/groceries')}>
                          Restock
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                      All grocery items are sufficiently stocked!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
