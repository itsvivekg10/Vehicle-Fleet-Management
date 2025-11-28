import { useState, useEffect, useMemo } from 'react';

import { 
  Search, 
  Filter, 
  Plus, 
  Hash, 
  Car, 
  BadgeInfo, 
  Clock, 
  MapPin,
  ArrowUp,
  ArrowDown,
  Wifi,
  PowerOff,
  Eye,
  Calendar
} from 'lucide-react';

import { getVehicles } from '../services/mockApi';
import VehicleRow from './VehicleRow';
import VehicleDetails from './VehicleDetails';
import AddVehicleModal from './AddVehicleModal';
import './VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = (newVehicle) => {
    setVehicles(prev => [newVehicle, ...prev]);
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleVehicleUpdate = (updatedVehicle) => {
    setVehicles(prev =>
      prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v)
    );

    if (selectedVehicle?.id === updatedVehicle.id) {
      setSelectedVehicle(updatedVehicle);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles;

    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === statusFilter);
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;

        if (sortBy === 'vehicleName') {
          aValue = a.vehicleName.toLowerCase();
          bValue = b.vehicleName.toLowerCase();
        } 
        else if (sortBy === 'lastSeen') {
          aValue = new Date(a.lastSeen);
          bValue = new Date(b.lastSeen);
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [vehicles, searchTerm, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);

  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedVehicles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedVehicles, currentPage, itemsPerPage]);

  const exportToCSV = () => {
    const headers = ['ID', 'Vehicle Name', 'Model', 'Status', 'Last Seen', 'Date & Time', 'Location'];
    const rows = vehicles.map(v => [
      v.id,
      v.vehicleName,
      v.model || '',
      v.status,
      v.lastSeen,
      v.dateTime || '',
      v.location || ''
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vehicles.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading vehicles...</div>
      </div>
    );
  }

  return (
    <div className="vehicle-fleet-container">
      <div className="vehicle-list-section">

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-icon"><Car size={18} /></span>
            <span>
              <span className="stat-label">Total</span>
              <span className="stat-value">{vehicles.length}</span>
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-icon"><Wifi size={18} /></span>
            <span>
              <span className="stat-label">Online</span>
              <span className="stat-value online">
                {vehicles.filter(v => v.status === 'online').length}
              </span>
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-icon"><PowerOff size={18} /></span>
            <span>
              <span className="stat-label">Offline</span>
              <span className="stat-value offline">
                {vehicles.filter(v => v.status === 'offline').length}
              </span>
            </span>
          </div>

          <div className="stat-item">
            <span className="stat-icon"><Eye size={18} /></span>
            <span>
              <span className="stat-label">Showing</span>
              <span className="stat-value">{filteredAndSortedVehicles.length}</span>
            </span>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search vehicle..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <button onClick={() => setShowAddModal(true)} className="export-btn">
            <Plus size={18} /> Add Vehicle
          </button>

          <button onClick={exportToCSV} className="export-btn">
            <Car size={18} /> Export CSV
          </button>
        </div>

        <div className="table-container">
          <table className="vehicle-table">
            <thead>
              <tr>
                <th><Hash size={16} /></th>
                <th className="sortable" onClick={() => handleSort('vehicleName')}>
                  <Car size={16} /> Vehicle
                  {sortBy === 'vehicleName' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </th>
                <th><BadgeInfo size={16} /> Model</th>
                <th>Status</th>
                <th className="sortable" onClick={() => handleSort('lastSeen')}>
                  <Clock size={16} /> Last Seen
                  {sortBy === 'lastSeen' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </th>
                <th><Calendar size={16} /> Date & Time</th>
                <th><MapPin size={16} /> Location</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVehicles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">No vehicles found</td>
                </tr>
              ) : (
                paginatedVehicles.map(vehicle => (
                  <VehicleRow
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSelect={handleVehicleSelect}
                    isSelected={selectedVehicle?.id === vehicle.id}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="page-btn">
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages || totalPages === 0} className="page-btn">
            Next
          </button>
        </div>
      </div>

      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onUpdate={handleVehicleUpdate}
        />
      )}

      {showAddModal && (
        <AddVehicleModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddVehicle}
        />
      )}
    </div>
  );
};

export default VehicleList;
