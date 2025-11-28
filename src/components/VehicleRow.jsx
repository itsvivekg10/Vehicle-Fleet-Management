import './VehicleRow.css';
import { Car, MapPin, Clock3, Activity } from 'lucide-react';

const VehicleRow = ({ vehicle, onSelect, isSelected }) => {
  function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  function getStatusClass(status) {
    return status === 'online' ? 'status-online' : 'status-offline';
  }

  return (
    <tr
      className={`vehicle-row ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vehicle)}
    >
      <td>{vehicle.id}</td>

      <td className="vehicle-name">
        <Car size={16} className="icon" />
        {vehicle.vehicleName}
      </td>

      <td className="row-icon-col">
        <Activity size={16} className="icon" />
        {vehicle.model}
      </td>

      <td>
        <span className={`status-badge ${getStatusClass(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </td>

      <td className="row-icon-col">
        <Clock3 size={16} className="icon" />
        {formatDate(vehicle.lastSeen)}
      </td>

      <td className="row-icon-col">
        <MapPin size={16} className="icon" />
        {vehicle.location}
      </td>
    </tr>
  );
};

export default VehicleRow;
