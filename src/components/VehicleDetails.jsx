import { useState } from 'react';
import { updateVehicle } from '../services/mockApi';
import { X, Pencil, Check, XCircle, MapPin, Car, ActivitySquare } from "lucide-react";
import './VehicleDetails.css';

const VehicleDetails = ({ vehicle, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(vehicle.vehicleName);
  const [editedStatus, setEditedStatus] = useState(vehicle.status);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const updated = await updateVehicle(vehicle.id, {
        vehicleName: editedName,
        status: editedStatus
      });
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedName(vehicle.vehicleName);
    setEditedStatus(vehicle.status);
    setIsEditing(false);
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  return (
    <div className="vehicle-details-panel">
      <div className="details-header">
        <h2><Car size={20} className="header-icon" /> Vehicle Details</h2>

        <button onClick={onClose} className="close-btn">
          <X size={20} />
        </button>
      </div>

      <div className="details-content">

        <div className="detail-section">
          <label>ID:</label>
          <span>{vehicle.id}</span>
        </div>

        <div className="detail-section">
          <label>Vehicle Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="edit-input"
            />
          ) : (
            <span>{vehicle.vehicleName}</span>
          )}
        </div>

        <div className="detail-section">
          <label>Model:</label>
          <span>{vehicle.model}</span>
        </div>

        <div className="detail-section">
          <label>Status:</label>
          {isEditing ? (
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="edit-select"
            >
              <option value="online">online</option>
              <option value="offline">offline</option>
            </select>
          ) : (
            <span className={`status-badge ${vehicle.status === 'online' ? 'status-online' : 'status-offline'}`}>
              {vehicle.status}
            </span>
          )}
        </div>

        <div className="detail-section">
          <label>Last Seen:</label>
          <span>{formatDate(vehicle.lastSeen)}</span>
        </div>

        <div className="detail-section">
          <label><MapPin size={16} className="icon-inline" /> Location:</label>
          <span>{vehicle.location}</span>
        </div>

        <div className="telemetry-section">
          <h3><ActivitySquare size={18} className="icon-inline" /> Telemetry</h3>

          <div className="telemetry-grid">
            <div className="telemetry-item">
              <span className="telemetry-label">Speed:</span>
              <span className="telemetry-value">{vehicle.telemetry.speed} km/h</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">Battery:</span>
              <span className="telemetry-value">{vehicle.telemetry.battery}%</span>
            </div>
          </div>
        </div>

        <div className="activity-section">
          <h3><ActivitySquare size={18} className="icon-inline" /> Activity Logs</h3>
          <ul className="activity-list">
            {vehicle.activity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className="details-actions">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="save-btn"
              >
                <Check size={16} /> {saving ? 'Saving...' : 'Save'}
              </button>

              <button
                onClick={handleCancel}
                disabled={saving}
                className="cancel-btn"
              >
                <XCircle size={16} /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              <Pencil size={16} /> Edit
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default VehicleDetails;
