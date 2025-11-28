import { useState } from "react";
import "./AddVehicleModal.css";

const AddVehicleModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    id: "",
    vehicleName: "",
    model: "",
    status: "online",
    lastSeen: "",
    location: "",
    speed: "",
    battery: "",
    activity: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newVehicle = {
      id: form.id,
      vehicleName: form.vehicleName,
      model: form.model,
      status: form.status,
      lastSeen: new Date(form.lastSeen).toISOString(),
      location: form.location,
      telemetry: {
        speed: Number(form.speed),
        battery: Number(form.battery)
      },
      activity: form.activity.split("\n")
    };

    onAdd(newVehicle);
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Add New Vehicle</h2>
        <form onSubmit={handleSubmit} className="modal-form">

          <input name="id" placeholder="ID (V1005)" onChange={handleChange} required />

          <input name="vehicleName" placeholder="Vehicle Name" onChange={handleChange} required />

          <input name="model" placeholder="Model" onChange={handleChange} required />

          <select name="status" onChange={handleChange}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <input type="datetime-local" name="lastSeen" onChange={handleChange} required />

          <input name="location" placeholder="Location" onChange={handleChange} required />

          <input name="speed" placeholder="Speed" type="number" onChange={handleChange} required />

          <input name="battery" placeholder="Battery %" type="number" onChange={handleChange} required />

          <textarea
            name="activity"
            placeholder="Activity logs (one per line)"
            rows="3"
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="add-btn">Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
