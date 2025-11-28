import './VehicleRow.css';

const VehicleRow = ({ vehicle, onSelect, isSelected }) => {
  function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  function getStatusClass(status) {
    if (status === 'online') {
      return 'status-online';
    }
    return 'status-offline';
  }

  return (
    <tr
      className={`vehicle-row ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(vehicle)}
    >
      <td>{vehicle.id}</td>
      <td className="vehicle-name">{vehicle.vehicleName}</td>
      <td>{vehicle.model}</td>
      <td>
        <span className={`status-badge ${getStatusClass(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </td>
      <td>{formatDate(vehicle.lastSeen)}</td>
      <td>{vehicle.location}</td>
    </tr>
  );
};

export default VehicleRow;

