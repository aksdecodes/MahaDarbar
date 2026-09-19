import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, Search, ShoppingBag, AlertTriangle, CheckCircle, Package, 
  Truck, DollarSign, Edit, Trash2, Eye, RefreshCw, ArrowDownRight, ArrowUpRight 
} from 'lucide-react';
import { groceryService } from '../services/groceryService';
import { formatDate } from '../utils/dateUtils';
import { formatCurrency } from '../utils/formatters';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';

const CATEGORY_OPTIONS = ['Grains', 'Pulses', 'Oil', 'Spices', 'Dairy', 'Essentials', 'Vegetables', 'Miscellaneous'];
const UNIT_OPTIONS = ['KG', 'L', 'Pack', 'Grams', 'Piece', 'Box', 'Bottle', 'Dozen'];
const PAYMENT_MODES = ['CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE', 'OTHER'];

const Groceries = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('inventory'); // inventory | history | suppliers

  // Summary state
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  // Inventory state
  const [groceries, setGroceries] = useState([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [invSearch, setInvSearch] = useState('');
  const [invCategory, setInvCategory] = useState('ALL');
  const [invStatus, setInvStatus] = useState('ALL');
  const [invPage, setInvPage] = useState(1);
  const [invLimit, setInvLimit] = useState(10);
  const [invTotal, setInvTotal] = useState(0);
  const [invPages, setInvPages] = useState(1);

  // History state (Purchases + Usages)
  const [historyTab, setHistoryTab] = useState('purchases'); // purchases | usages
  const [purchases, setPurchases] = useState([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);
  const [purSearch, setPurSearch] = useState('');
  const [purPage, setPurPage] = useState(1);
  const [purLimit, setPurLimit] = useState(10);
  const [purTotal, setPurTotal] = useState(0);
  const [purPages, setPurPages] = useState(1);

  const [usages, setUsages] = useState([]);
  const [usagesLoading, setUsagesLoading] = useState(false);
  const [useSearch, setUseSearch] = useState('');
  const [usePage, setUsePage] = useState(1);
  const [useLimit, setUseLimit] = useState(10);
  const [useTotal, setUseTotal] = useState(0);
  const [usePages, setUsePages] = useState(1);

  // Suppliers state
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersLoading, setSuppliersLoading] = useState(false);

  // Modals state
  const [isGroceryModalOpen, setIsGroceryModalOpen] = useState(false);
  const [editingGrocery, setEditingGrocery] = useState(null);
  const [groceryFormData, setGroceryFormData] = useState({
    itemName: '', category: 'Grains', currentStock: 0, unit: 'KG',
    minimumStock: 5, averagePrice: 0, supplier: '', description: ''
  });
  const [groceryFormErrors, setGroceryFormErrors] = useState({});
  const [isSubmittingGrocery, setIsSubmittingGrocery] = useState(false);

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseFormData, setPurchaseFormData] = useState({
    item: '', supplier: '', quantity: '', unitPrice: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    paymentMode: 'CASH', notes: ''
  });
  const [purchaseFormErrors, setPurchaseFormErrors] = useState({});
  const [isSubmittingPurchase, setIsSubmittingPurchase] = useState(false);

  // Use Stock Modal state
  const [isUseStockModalOpen, setIsUseStockModalOpen] = useState(false);
  const [selectedItemForUse, setSelectedItemForUse] = useState(null);
  const [useStockFormData, setUseStockFormData] = useState({ quantity: '', reason: 'Daily Mess Use' });
  const [useStockFormErrors, setUseStockFormErrors] = useState({});
  const [isSubmittingUseStock, setIsSubmittingUseStock] = useState(false);

  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [supplierFormData, setSupplierFormData] = useState({
    name: '', contact: '', email: '', address: '', notes: ''
  });
  const [supplierFormErrors, setSupplierFormErrors] = useState({});
  const [isSubmittingSupplier, setIsSubmittingSupplier] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: null, id: null, name: '' });

  // Fetch summary
  const fetchSummary = useCallback(async () => {
    try {
      const data = await groceryService.getGrocerySummary();
      setSummary(data);
    } catch (error) {
      console.error('Failed to load grocery summary', error);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  // Fetch inventory
  const fetchInventory = useCallback(async () => {
    setInventoryLoading(true);
    try {
      const params = { page: invPage, limit: invLimit };
      if (invSearch) params.search = invSearch;
      if (invCategory !== 'ALL') params.category = invCategory;
      if (invStatus !== 'ALL') params.status = invStatus;

      const data = await groceryService.getGroceries(params);
      setGroceries(data.groceries);
      setInvTotal(data.total);
      setInvPages(data.pages);
    } catch (error) {
      toast.error('Failed to load groceries');
    } finally {
      setInventoryLoading(false);
    }
  }, [invPage, invLimit, invSearch, invCategory, invStatus, toast]);

  // Fetch purchases
  const fetchPurchases = useCallback(async () => {
    setPurchasesLoading(true);
    try {
      const params = { page: purPage, limit: purLimit };
      if (purSearch) params.search = purSearch;

      const data = await groceryService.getPurchases(params);
      setPurchases(data.purchases);
      setPurTotal(data.total);
      setPurPages(data.pages);
    } catch (error) {
      toast.error('Failed to load purchases');
    } finally {
      setPurchasesLoading(false);
    }
  }, [purPage, purLimit, purSearch, toast]);

  // Fetch usages
  const fetchUsages = useCallback(async () => {
    setUsagesLoading(true);
    try {
      const params = { page: usePage, limit: useLimit };
      if (useSearch) params.search = useSearch;

      const data = await groceryService.getUsageHistory(params);
      setUsages(data.usages);
      setUseTotal(data.total);
      setUsePages(data.pages);
    } catch (error) {
      toast.error('Failed to load stock usage history');
    } finally {
      setUsagesLoading(false);
    }
  }, [usePage, useLimit, useSearch, toast]);

  // Fetch suppliers
  const fetchSuppliers = useCallback(async () => {
    setSuppliersLoading(true);
    try {
      const data = await groceryService.getSuppliers();
      setSuppliers(data);
    } catch (error) {
      toast.error('Failed to load suppliers');
    } finally {
      setSuppliersLoading(false);
    }
  }, [toast]);

  // Initial loads
  useEffect(() => {
    fetchSummary();
    fetchSuppliers();
  }, [fetchSummary, fetchSuppliers]);

  useEffect(() => {
    if (activeTab === 'inventory') fetchInventory();
    if (activeTab === 'history') {
      if (historyTab === 'purchases') fetchPurchases();
      if (historyTab === 'usages') fetchUsages();
    }
    if (activeTab === 'suppliers') fetchSuppliers();
  }, [activeTab, historyTab, fetchInventory, fetchPurchases, fetchUsages, fetchSuppliers]);

  // Handle Grocery Form Submit
  const handleGrocerySubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!groceryFormData.itemName.trim()) errors.itemName = 'Item name is required';
    if (!groceryFormData.category.trim()) errors.category = 'Category is required';
    if (!groceryFormData.unit.trim()) errors.unit = 'Unit is required';
    if (groceryFormData.minimumStock < 0) errors.minimumStock = 'Minimum stock must be >= 0';
    if (groceryFormData.currentStock < 0) errors.currentStock = 'Current stock must be >= 0';

    if (Object.keys(errors).length > 0) {
      setGroceryFormErrors(errors);
      return;
    }

    setIsSubmittingGrocery(true);
    try {
      if (editingGrocery) {
        await groceryService.updateGrocery(editingGrocery._id, groceryFormData);
        toast.success('Grocery item updated successfully');
      } else {
        await groceryService.createGrocery(groceryFormData);
        toast.success('Grocery item created successfully');
      }
      setIsGroceryModalOpen(false);
      setEditingGrocery(null);
      fetchInventory();
      fetchSummary();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save grocery item');
    } finally {
      setIsSubmittingGrocery(false);
    }
  };

  // Open Edit Grocery
  const handleEditGrocery = (item) => {
    setEditingGrocery(item);
    setGroceryFormData({
      itemName: item.itemName,
      category: item.category,
      currentStock: item.currentStock,
      unit: item.unit,
      minimumStock: item.minimumStock,
      averagePrice: item.averagePrice || 0,
      supplier: item.supplier?._id || item.supplier || '',
      description: item.description || ''
    });
    setGroceryFormErrors({});
    setIsGroceryModalOpen(true);
  };

  // Open Use Stock Modal
  const handleOpenUseStockModal = (item) => {
    setSelectedItemForUse(item);
    setUseStockFormData({ quantity: '', reason: 'Daily Mess Use' });
    setUseStockFormErrors({});
    setIsUseStockModalOpen(true);
  };

  // Handle Use Stock Submit
  const handleUseStockSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    const qty = Number(useStockFormData.quantity);
    const availableStock = selectedItemForUse?.currentStock || 0;

    if (!useStockFormData.quantity || isNaN(qty) || qty <= 0) {
      errors.quantity = 'Quantity to use must be a positive number';
    } else if (qty > availableStock) {
      errors.quantity = `Cannot use more than available stock (${availableStock} ${selectedItemForUse?.unit || ''})`;
    }

    if (Object.keys(errors).length > 0) {
      setUseStockFormErrors(errors);
      return;
    }

    setIsSubmittingUseStock(true);
    try {
      await groceryService.useStock(selectedItemForUse._id, {
        quantity: qty,
        reason: useStockFormData.reason
      });
      toast.success('Stock updated successfully!');
      setIsUseStockModalOpen(false);
      setSelectedItemForUse(null);
      fetchInventory();
      fetchSummary();
      if (activeTab === 'history') fetchUsages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update stock');
    } finally {
      setIsSubmittingUseStock(false);
    }
  };

  // Handle Purchase Form Submit
  const handlePurchaseSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!purchaseFormData.item) errors.item = 'Select a grocery item';
    if (!purchaseFormData.supplier) errors.supplier = 'Select a supplier';
    if (!purchaseFormData.quantity || Number(purchaseFormData.quantity) <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }
    if (purchaseFormData.unitPrice === '' || Number(purchaseFormData.unitPrice) < 0) {
      errors.unitPrice = 'Unit price must be >= 0';
    }

    if (Object.keys(errors).length > 0) {
      setPurchaseFormErrors(errors);
      return;
    }

    setIsSubmittingPurchase(true);
    try {
      await groceryService.createPurchase({
        item: purchaseFormData.item,
        supplier: purchaseFormData.supplier,
        quantity: Number(purchaseFormData.quantity),
        unitPrice: Number(purchaseFormData.unitPrice),
        purchaseDate: purchaseFormData.purchaseDate,
        paymentMode: purchaseFormData.paymentMode,
        notes: purchaseFormData.notes
      });
      toast.success('Purchase recorded & stock updated!');
      setIsPurchaseModalOpen(false);
      setPurchaseFormData({
        item: '', supplier: '', quantity: '', unitPrice: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        paymentMode: 'CASH', notes: ''
      });
      fetchInventory();
      fetchPurchases();
      fetchSummary();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to record purchase');
    } finally {
      setIsSubmittingPurchase(false);
    }
  };

  // Open Add Purchase Modal & Auto-populate Item details
  const handleOpenPurchaseModal = (preselectedItem = null) => {
    const selectedItem = preselectedItem || groceries[0];
    setPurchaseFormData({
      item: selectedItem ? selectedItem._id : '',
      supplier: selectedItem?.supplier?._id || selectedItem?.supplier || (suppliers[0]?._id || ''),
      quantity: '',
      unitPrice: selectedItem?.averagePrice || '',
      purchaseDate: new Date().toISOString().split('T')[0],
      paymentMode: 'CASH',
      notes: ''
    });
    setPurchaseFormErrors({});
    setIsPurchaseModalOpen(true);
  };

  // When selected item in Purchase Modal changes
  const handlePurchaseItemChange = (itemId) => {
    const item = groceries.find(g => g._id === itemId);
    setPurchaseFormData(prev => ({
      ...prev,
      item: itemId,
      supplier: item?.supplier?._id || item?.supplier || prev.supplier,
      unitPrice: item?.averagePrice || prev.unitPrice
    }));
  };

  // Handle Supplier Form Submit
  const handleSupplierSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!supplierFormData.name.trim()) errors.name = 'Supplier name is required';

    if (Object.keys(errors).length > 0) {
      setSupplierFormErrors(errors);
      return;
    }

    setIsSubmittingSupplier(true);
    try {
      if (editingSupplier) {
        await groceryService.updateSupplier(editingSupplier._id, supplierFormData);
        toast.success('Supplier updated successfully');
      } else {
        await groceryService.createSupplier(supplierFormData);
        toast.success('Supplier created successfully');
      }
      setIsSupplierModalOpen(false);
      setEditingSupplier(null);
      fetchSuppliers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save supplier');
    } finally {
      setIsSubmittingSupplier(false);
    }
  };

  // Delete Action Confirm
  const handleConfirmDelete = async () => {
    const { type, id } = deleteConfirm;
    try {
      if (type === 'grocery') {
        await groceryService.deleteGrocery(id);
        toast.success('Grocery item deactivated');
        fetchInventory();
        fetchSummary();
      } else if (type === 'supplier') {
        await groceryService.deleteSupplier(id);
        toast.success('Supplier deactivated');
        fetchSuppliers();
      }
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setDeleteConfirm({ isOpen: false, type: null, id: null, name: '' });
    }
  };

  // Calculate live total amount in Purchase modal
  const calcPurchaseTotal = () => {
    const q = Number(purchaseFormData.quantity) || 0;
    const p = Number(purchaseFormData.unitPrice) || 0;
    return q * p;
  };

  const currentSelectedItem = groceries.find(g => g._id === purchaseFormData.item);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>Groceries</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
            Manage grocery inventory, stock usage, purchases and suppliers.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" icon={Plus} onClick={() => {
            setEditingGrocery(null);
            setGroceryFormData({ itemName: '', category: 'Grains', currentStock: 0, unit: 'KG', minimumStock: 5, averagePrice: 0, supplier: suppliers[0]?._id || '', description: '' });
            setGroceryFormErrors({});
            setIsGroceryModalOpen(true);
          }}>
            Add Grocery
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => handleOpenPurchaseModal()}>
            Add Purchase
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '28px' }}>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            <Package size={24} />
          </div>
          <div className="stat-card-value">{summaryLoading ? '...' : summary?.totalItems ?? 0}</div>
          <div className="stat-card-label">Total Items</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--active-bg)', color: 'var(--active)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-card-value">{summaryLoading ? '...' : summary?.inStockItems ?? 0}</div>
          <div className="stat-card-label">In Stock</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: 'var(--due-bg)', color: 'var(--due)' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-card-value">{summaryLoading ? '...' : (summary?.lowStockItems || 0) + (summary?.outOfStockItems || 0)}</div>
          <div className="stat-card-label">Low / Out of Stock</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ background: '#fff7ed', color: 'var(--primary)' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-card-value">{summaryLoading ? '...' : formatCurrency(summary?.monthlyPurchase || 0)}</div>
          <div className="stat-card-label">This Month Purchase</div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="filter-tabs" style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <button
          className={`filter-tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`filter-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Stock History & Movements
        </button>
        <button
          className={`filter-tab ${activeTab === 'suppliers' ? 'active' : ''}`}
          onClick={() => setActiveTab('suppliers')}
        >
          Suppliers
        </button>
      </div>

      {/* TAB 1: INVENTORY */}
      {activeTab === 'inventory' && (
        <div>
          {/* Controls Bar */}
          <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', flex: '1 1 260px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search groceries..."
                  value={invSearch}
                  onChange={(e) => { setInvSearch(e.target.value); setInvPage(1); }}
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                />
              </div>

              {/* Category Dropdown */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <select
                  className="form-input"
                  value={invCategory}
                  onChange={(e) => { setInvCategory(e.target.value); setInvPage(1); }}
                  style={{ width: 'auto' }}
                >
                  <option value="ALL">All Categories</option>
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                {/* Stock Status Buttons */}
                <div className="filter-tabs" style={{ margin: 0 }}>
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'IN_STOCK', label: 'In Stock' },
                    { id: 'LOW_STOCK', label: 'Low Stock' },
                    { id: 'OUT_OF_STOCK', label: 'Out of Stock' }
                  ].map(s => (
                    <button
                      key={s.id}
                      className={`filter-tab ${invStatus === s.id ? 'active' : ''}`}
                      onClick={() => { setInvStatus(s.id); setInvPage(1); }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="table-container">
            {inventoryLoading ? (
              <LoadingSpinner />
            ) : groceries.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title={invSearch ? "No groceries match search" : "No grocery items"}
                description="Get started by adding your first grocery item or recording a purchase."
                action={!invSearch && <Button onClick={() => setIsGroceryModalOpen(true)}>Add Grocery</Button>}
              />
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}></th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Min Stock</th>
                      <th>Avg Price</th>
                      <th>Supplier</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groceries.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className={`status-dot ${item.status?.toLowerCase().replace(/_/g, '-')}`}></div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{item.itemName}</div>
                          {item.description && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.description}</div>}
                        </td>
                        <td><Badge type={item.category} /></td>
                        <td style={{ fontWeight: 700, fontSize: '15px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{item.currentStock} <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.unit}</span></span>
                            <button
                              type="button"
                              onClick={() => handleOpenUseStockModal(item)}
                              title="Use Stock"
                              disabled={item.currentStock === 0}
                              style={{
                                background: item.currentStock === 0 ? '#f1f5f9' : '#fff7ed',
                                border: item.currentStock === 0 ? '1px solid #e2e8f0' : '1px solid var(--primary-light)',
                                borderRadius: '6px',
                                padding: '3px 8px',
                                cursor: item.currentStock === 0 ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s',
                                color: item.currentStock === 0 ? '#94a3b8' : 'var(--primary-dark)',
                                opacity: item.currentStock === 0 ? 0.6 : 1
                              }}
                              onMouseOver={e => { if (item.currentStock > 0) e.currentTarget.style.background = '#ffedd5'; }}
                              onMouseOut={e => { if (item.currentStock > 0) e.currentTarget.style.background = '#fff7ed'; }}
                            >
                              ✋ <span style={{ fontSize: '11px', fontWeight: 600 }}>Use</span>
                            </button>
                          </div>
                        </td>
                        <td>{item.minimumStock} {item.unit}</td>
                        <td>{item.averagePrice ? formatCurrency(item.averagePrice) : '—'}</td>
                        <td>{item.supplier?.name || '—'}</td>
                        <td><Badge stockStatus={item.status} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <Button variant="secondary" size="sm" onClick={() => handleOpenPurchaseModal(item)}>
                              + Stock
                            </Button>
                            <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleEditGrocery(item)} />
                            <Button variant="ghost" size="sm" icon={Trash2} style={{ color: 'var(--due)' }} onClick={() => setDeleteConfirm({ isOpen: true, type: 'grocery', id: item._id, name: item.itemName })} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {!inventoryLoading && groceries.length > 0 && (
            <Pagination
              currentPage={invPage}
              totalPages={invPages}
              onPageChange={setInvPage}
              totalItems={invTotal}
              itemsPerPage={invLimit}
              onItemsPerPageChange={(newLimit) => { setInvLimit(newLimit); setInvPage(1); }}
            />
          )}
        </div>
      )}

      {/* TAB 2: STOCK MOVEMENT & HISTORY */}
      {activeTab === 'history' && (
        <div>
          <div className="card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div className="filter-tabs" style={{ margin: 0 }}>
                <button
                  className={`filter-tab ${historyTab === 'purchases' ? 'active' : ''}`}
                  onClick={() => setHistoryTab('purchases')}
                >
                  Purchases History (+ Stock)
                </button>
                <button
                  className={`filter-tab ${historyTab === 'usages' ? 'active' : ''}`}
                  onClick={() => setHistoryTab('usages')}
                >
                  Usage History (- Stock)
                </button>
              </div>

              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder={historyTab === 'purchases' ? "Search purchases..." : "Search usage records..."}
                  value={historyTab === 'purchases' ? purSearch : useSearch}
                  onChange={(e) => {
                    if (historyTab === 'purchases') { setPurSearch(e.target.value); setPurPage(1); }
                    else { setUseSearch(e.target.value); setUsePage(1); }
                  }}
                  className="form-input"
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>
          </div>

          {/* PURCHASES HISTORY */}
          {historyTab === 'purchases' && (
            <div>
              <div className="table-container">
                {purchasesLoading ? (
                  <LoadingSpinner />
                ) : purchases.length === 0 ? (
                  <EmptyState
                    icon={ShoppingBag}
                    title="No purchases found"
                    description="Record grocery purchases to increase inventory stock."
                    action={<Button onClick={() => handleOpenPurchaseModal()}>Add Purchase</Button>}
                  />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Grocery Item</th>
                          <th>Type</th>
                          <th>Supplier</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total Amount</th>
                          <th>Payment Mode</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchases.map(p => (
                          <tr key={p._id}>
                            <td style={{ fontWeight: 500 }}>{formatDate(p.purchaseDate)}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{p.item?.itemName || '—'}</div>
                              {p.item?.category && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.item.category}</div>}
                            </td>
                            <td>
                              <span style={{ fontSize: '12px', background: '#d1fae5', color: '#059669', padding: '3px 8px', borderRadius: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <ArrowUpRight size={14} /> Purchase
                              </span>
                            </td>
                            <td>{p.supplier?.name || '—'}</td>
                            <td style={{ fontWeight: 700, color: 'var(--active)' }}>+{p.quantity} {p.item?.unit || ''}</td>
                            <td>{formatCurrency(p.unitPrice)}</td>
                            <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatCurrency(p.totalAmount)}</td>
                            <td>
                              <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 500 }}>
                                {p.paymentMode}
                              </span>
                            </td>
                            <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{p.notes || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {!purchasesLoading && purchases.length > 0 && (
                <Pagination
                  currentPage={purPage}
                  totalPages={purPages}
                  onPageChange={setPurPage}
                  totalItems={purTotal}
                  itemsPerPage={purLimit}
                  onItemsPerPageChange={(newLimit) => { setPurLimit(newLimit); setPurPage(1); }}
                />
              )}
            </div>
          )}

          {/* USAGE HISTORY */}
          {historyTab === 'usages' && (
            <div>
              <div className="table-container">
                {usagesLoading ? (
                  <LoadingSpinner />
                ) : usages.length === 0 ? (
                  <EmptyState
                    icon={ShoppingBag}
                    title="No usage history recorded"
                    description="Use the hand icon (✋) in inventory table to record daily grocery stock usage."
                  />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Grocery Item</th>
                          <th>Type</th>
                          <th>Quantity Used</th>
                          <th>Reason / Purpose</th>
                          <th>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usages.map(u => (
                          <tr key={u._id}>
                            <td style={{ fontWeight: 500 }}>{formatDate(u.usageDate)}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{u.item?.itemName || '—'}</div>
                            </td>
                            <td>
                              <span style={{ fontSize: '12px', background: '#fee2e2', color: '#dc2626', padding: '3px 8px', borderRadius: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <ArrowDownRight size={14} /> Usage
                              </span>
                            </td>
                            <td style={{ fontWeight: 700, color: 'var(--due)' }}>-{u.quantity} {u.item?.unit || ''}</td>
                            <td>
                              <div style={{ fontWeight: 500 }}>{u.reason || 'Daily Mess Use'}</div>
                            </td>
                            <td><Badge type={u.item?.category || 'General'} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {!usagesLoading && usages.length > 0 && (
                <Pagination
                  currentPage={usePage}
                  totalPages={usePages}
                  onPageChange={setUsePage}
                  totalItems={useTotal}
                  itemsPerPage={useLimit}
                  onItemsPerPageChange={(newLimit) => { setUseLimit(newLimit); setUsePage(1); }}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SUPPLIERS */}
      {activeTab === 'suppliers' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Suppliers List</h3>
            <Button variant="primary" icon={Plus} onClick={() => {
              setEditingSupplier(null);
              setSupplierFormData({ name: '', contact: '', email: '', address: '', notes: '' });
              setSupplierFormErrors({});
              setIsSupplierModalOpen(true);
            }}>
              Add Supplier
            </Button>
          </div>

          <div className="table-container">
            {suppliersLoading ? (
              <LoadingSpinner />
            ) : suppliers.length === 0 ? (
              <EmptyState
                icon={Truck}
                title="No suppliers found"
                description="Add suppliers to link grocery items and track purchases."
                action={<Button onClick={() => setIsSupplierModalOpen(true)}>Add Supplier</Button>}
              />
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Supplier Name</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Items Supplied</th>
                      <th>Total Purchases</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map(s => (
                      <tr key={s._id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{s.name}</div>
                          {s.notes && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.notes}</div>}
                        </td>
                        <td>{s.contact || '—'}</td>
                        <td>{s.email || '—'}</td>
                        <td>{s.address || '—'}</td>
                        <td style={{ fontWeight: 600 }}>{s.itemCount ?? 0} items</td>
                        <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatCurrency(s.totalPurchases || 0)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Button variant="ghost" size="sm" icon={Edit} onClick={() => {
                              setEditingSupplier(s);
                              setSupplierFormData({
                                name: s.name, contact: s.contact || '', email: s.email || '',
                                address: s.address || '', notes: s.notes || ''
                              });
                              setSupplierFormErrors({});
                              setIsSupplierModalOpen(true);
                            }} />
                            <Button variant="ghost" size="sm" icon={Trash2} style={{ color: 'var(--due)' }} onClick={() => setDeleteConfirm({ isOpen: true, type: 'supplier', id: s._id, name: s.name })} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD / EDIT GROCERY */}
      <Modal
        isOpen={isGroceryModalOpen}
        onClose={() => setIsGroceryModalOpen(false)}
        title={editingGrocery ? "Edit Grocery Item" : "Add New Grocery Item"}
        size="lg"
      >
        <form onSubmit={handleGrocerySubmit} className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input
              label="Item Name"
              value={groceryFormData.itemName}
              onChange={e => setGroceryFormData({ ...groceryFormData, itemName: e.target.value })}
              error={groceryFormErrors.itemName}
              placeholder="e.g. Basmati Rice, Sunflower Oil"
              required
            />

            <div className="form-group">
              <label className="form-label required">Category</label>
              <select
                className={`form-input ${groceryFormErrors.category ? 'error' : ''}`}
                value={groceryFormData.category}
                onChange={e => setGroceryFormData({ ...groceryFormData, category: e.target.value })}
              >
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label required">Unit</label>
              <select
                className={`form-input ${groceryFormErrors.unit ? 'error' : ''}`}
                value={groceryFormData.unit}
                onChange={e => setGroceryFormData({ ...groceryFormData, unit: e.target.value })}
              >
                {UNIT_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>

            <Input
              label="Minimum Stock Alert Level"
              type="number"
              value={groceryFormData.minimumStock}
              onChange={e => setGroceryFormData({ ...groceryFormData, minimumStock: e.target.value })}
              error={groceryFormErrors.minimumStock}
              required
            />

            <Input
              label={editingGrocery ? "Current Stock Quantity" : "Initial Stock Quantity"}
              type="number"
              value={groceryFormData.currentStock}
              onChange={e => setGroceryFormData({ ...groceryFormData, currentStock: e.target.value })}
              error={groceryFormErrors.currentStock}
            />

            <Input
              label="Estimated Average Price (₹)"
              type="number"
              value={groceryFormData.averagePrice}
              onChange={e => setGroceryFormData({ ...groceryFormData, averagePrice: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginTop: '8px' }}>
            <label className="form-label">Default Supplier</label>
            <select
              className="form-input"
              value={groceryFormData.supplier}
              onChange={e => setGroceryFormData({ ...groceryFormData, supplier: e.target.value })}
            >
              <option value="">Select Supplier (Optional)</option>
              {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>

          <Input
            label="Description / Usage Notes"
            type="textarea"
            value={groceryFormData.description}
            onChange={e => setGroceryFormData({ ...groceryFormData, description: e.target.value })}
            placeholder="e.g. Premium rice used for daily mess lunches"
          />

          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsGroceryModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmittingGrocery}>
              {editingGrocery ? 'Save Changes' : 'Add Grocery'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: USE STOCK (HAND ICON ✋ DIALOG) */}
      <Modal
        isOpen={isUseStockModalOpen}
        onClose={() => setIsUseStockModalOpen(false)}
        title="Use Stock"
        size="md"
      >
        <form onSubmit={handleUseStockSubmit} className="modal-body">
          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">Item</label>
            <input
              type="text"
              className="form-input"
              value={selectedItemForUse?.itemName || ''}
              disabled
              style={{ background: 'var(--surface-2)', fontWeight: 600, color: 'var(--text-primary)' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">Current Stock</label>
            <input
              type="text"
              className="form-input"
              value={`${selectedItemForUse?.currentStock || 0} ${selectedItemForUse?.unit || ''}`}
              disabled
              style={{ background: 'var(--surface-2)', fontWeight: 700, color: 'var(--primary-dark)' }}
            />
          </div>

          <Input
            label={`Quantity to Use (${selectedItemForUse?.unit || 'Units'})`}
            type="number"
            value={useStockFormData.quantity}
            onChange={e => {
              setUseStockFormData({ ...useStockFormData, quantity: e.target.value });
              setUseStockFormErrors({ ...useStockFormErrors, quantity: '' });
            }}
            error={useStockFormErrors.quantity}
            placeholder="e.g. 30"
            required
          />

          <Input
            label="Reason (Optional)"
            type="text"
            value={useStockFormData.reason}
            onChange={e => setUseStockFormData({ ...useStockFormData, reason: e.target.value })}
            placeholder="Daily Mess Use"
          />

          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsUseStockModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmittingUseStock}>
              OK
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: ADD PURCHASE */}
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        title="Record Grocery Purchase"
        size="lg"
      >
        <form onSubmit={handlePurchaseSubmit} className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label required">Grocery Item</label>
              <select
                className={`form-input ${purchaseFormErrors.item ? 'error' : ''}`}
                value={purchaseFormData.item}
                onChange={e => handlePurchaseItemChange(e.target.value)}
              >
                <option value="">Select Grocery Item</option>
                {groceries.map(g => (
                  <option key={g._id} value={g._id}>
                    {g.itemName} ({g.currentStock} {g.unit} in stock)
                  </option>
                ))}
              </select>
              {purchaseFormErrors.item && <div className="form-error">{purchaseFormErrors.item}</div>}
            </div>

            <div className="form-group">
              <label className="form-label required">Supplier</label>
              <select
                className={`form-input ${purchaseFormErrors.supplier ? 'error' : ''}`}
                value={purchaseFormData.supplier}
                onChange={e => setPurchaseFormData({ ...purchaseFormData, supplier: e.target.value })}
              >
                <option value="">Select Supplier</option>
                {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
              {purchaseFormErrors.supplier && <div className="form-error">{purchaseFormErrors.supplier}</div>}
            </div>

            <Input
              label={`Purchased Quantity (${currentSelectedItem?.unit || 'Units'})`}
              type="number"
              value={purchaseFormData.quantity}
              onChange={e => setPurchaseFormData({ ...purchaseFormData, quantity: e.target.value })}
              error={purchaseFormErrors.quantity}
              placeholder="e.g. 50"
              required
            />

            <Input
              label={`Unit Price (₹ per ${currentSelectedItem?.unit || 'Unit'})`}
              type="number"
              value={purchaseFormData.unitPrice}
              onChange={e => setPurchaseFormData({ ...purchaseFormData, unitPrice: e.target.value })}
              error={purchaseFormErrors.unitPrice}
              placeholder="e.g. 65"
              required
            />

            <Input
              label="Purchase Date"
              type="date"
              value={purchaseFormData.purchaseDate}
              onChange={e => setPurchaseFormData({ ...purchaseFormData, purchaseDate: e.target.value })}
              required
            />

            <div className="form-group">
              <label className="form-label required">Payment Mode</label>
              <select
                className="form-input"
                value={purchaseFormData.paymentMode}
                onChange={e => setPurchaseFormData({ ...purchaseFormData, paymentMode: e.target.value })}
              >
                {PAYMENT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <Input
            label="Purchase Notes / Bill Ref"
            type="text"
            value={purchaseFormData.notes}
            onChange={e => setPurchaseFormData({ ...purchaseFormData, notes: e.target.value })}
            placeholder="Invoice number, remarks..."
          />

          {/* Real-time total display */}
          <div style={{
            marginTop: '16px', padding: '16px 20px', background: '#fff7ed', borderRadius: '10px',
            border: '1.5px solid var(--primary-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Calculated Total Amount</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {purchaseFormData.quantity || 0} {currentSelectedItem?.unit || 'units'} × ₹{purchaseFormData.unitPrice || 0}
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>
              {formatCurrency(calcPurchaseTotal())}
            </div>
          </div>

          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsPurchaseModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmittingPurchase}>
              Record Purchase & Update Stock
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 4: ADD / EDIT SUPPLIER */}
      <Modal
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        title={editingSupplier ? "Edit Supplier" : "Add New Supplier"}
      >
        <form onSubmit={handleSupplierSubmit} className="modal-body">
          <Input
            label="Supplier / Business Name"
            value={supplierFormData.name}
            onChange={e => setSupplierFormData({ ...supplierFormData, name: e.target.value })}
            error={supplierFormErrors.name}
            placeholder="e.g. Shree Traders, Om Foods"
            required
          />

          <Input
            label="Contact Mobile / Phone"
            value={supplierFormData.contact}
            onChange={e => setSupplierFormData({ ...supplierFormData, contact: e.target.value })}
            placeholder="9876543210"
          />

          <Input
            label="Email Address"
            type="email"
            value={supplierFormData.email}
            onChange={e => setSupplierFormData({ ...supplierFormData, email: e.target.value })}
            placeholder="supplier@email.com"
          />

          <Input
            label="Market / Shop Address"
            type="textarea"
            value={supplierFormData.address}
            onChange={e => setSupplierFormData({ ...supplierFormData, address: e.target.value })}
            placeholder="Market Yard, Pune..."
          />

          <Input
            label="Notes"
            type="text"
            value={supplierFormData.notes}
            onChange={e => setSupplierFormData({ ...supplierFormData, notes: e.target.value })}
            placeholder="Wholesaler for grains, fast delivery..."
          />

          <div className="modal-footer" style={{ margin: '24px -24px -24px', background: 'var(--surface-2)' }}>
            <Button variant="ghost" type="button" onClick={() => setIsSupplierModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit" loading={isSubmittingSupplier}>
              {editingSupplier ? 'Save Changes' : 'Add Supplier'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, type: null, id: null, name: '' })}
        onConfirm={handleConfirmDelete}
        title={`Deactivate ${deleteConfirm.type === 'grocery' ? 'Grocery Item' : 'Supplier'}`}
        message={`Are you sure you want to deactivate ${deleteConfirm.name}? It will no longer appear in active lists.`}
        confirmLabel="Deactivate"
        confirmVariant="danger"
      />
    </div>
  );
};

export default Groceries;
