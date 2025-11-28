import { useState, useEffect, useMemo } from 'react';
import { getVehicles } from '../services/mockApi';
import VehicleRow from './VehicleRow';
import VehicleDetails from './VehicleDetails';
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

  function handleVehicleSelect(vehicle) {
    setSelectedVehicle(vehicle);
  }

  const handleVehicleUpdate = (updatedVehicle) => {
    setVehicles(prevVehicles =>
      prevVehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v)
    );
    if (selectedVehicle && selectedVehicle.id === updatedVehicle.id) {
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
        } else if (sortBy === 'lastSeen') {
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

  function handleExportCSV() {
    const headers = ['ID', 'Vehicle Name', 'Model', 'Status', 'Last Seen', 'Location'];
    const rows = filteredAndSortedVehicles.map(vehicle => {
      return [
        vehicle.id,
        vehicle.vehicleName,
        vehicle.model,
        vehicle.status,
        new Date(vehicle.lastSeen).toLocaleString(),
        vehicle.location
      ];
    });

    const csvRows = rows.map(row => {
      return row.map(cell => `"${cell}"`).join(',');
    });
    
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vehicles_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

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
            <span className="stat-label">Total Vehicles</span>
            <span className="stat-value">{vehicles.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Online</span>
            <span className="stat-value online">{vehicles.filter(v => v.status === 'online').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Offline</span>
            <span className="stat-value offline">{vehicles.filter(v => v.status === 'offline').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Showing</span>
            <span className="stat-value">{filteredAndSortedVehicles.length}</span>
          </div>
        </div>
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by vehicle name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <button onClick={handleExportCSV} className="export-btn">
            Export CSV
          </button>
        </div>

        <div className="table-container">
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>ID</th>
                <th
                  className="sortable"
                  onClick={() => handleSort('vehicleName')}
                >
                  Vehicle Name
                  {sortBy === 'vehicleName' && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th>Model</th>
                <th>Status</th>
                <th
                  className="sortable"
                  onClick={() => handleSort('lastSeen')}
                >
                  Last Seen
                  {sortBy === 'lastSeen' && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVehicles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No vehicles found
                  </td>
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
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="page-btn"
          >
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
    </div>
  );
};

export default VehicleList;
