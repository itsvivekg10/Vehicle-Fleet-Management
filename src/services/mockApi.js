const mockVehicles = [
  {
    id: "V1001",
    vehicleName: "Axon Ranger",
    model: "AR-1",
    status: "online",
    lastSeen: "2025-11-18T09:30:00Z",
    location: "Pune",
    telemetry: {
      speed: 12,
      battery: 87
    },
    activity: [
      "2025-11-17T09:00:00Z - Started",
      "2025-11-17T11:30:00Z - Route completed"
    ]
  },
  {
    id: "V1002",
    vehicleName: "City Glider",
    model: "CG-2",
    status: "offline",
    lastSeen: "2025-11-15T16:10:00Z",
    location: "Mumbai",
    telemetry: {
      speed: 0,
      battery: 24
    },
    activity: [
      "2025-11-14T07:30:00Z - Maintenance"
    ]
  },
  {
    id: "V1003",
    vehicleName: "Swift Runner",
    model: "SR-3",
    status: "online",
    lastSeen: "2025-11-18T10:15:00Z",
    location: "Delhi",
    telemetry: {
      speed: 45,
      battery: 92
    },
    activity: [
      "2025-11-18T08:00:00Z - Started",
      "2025-11-18T09:45:00Z - In transit"
    ]
  },
  {
    id: "V1004",
    vehicleName: "Urban Express",
    model: "UE-4",
    status: "offline",
    lastSeen: "2025-11-16T14:20:00Z",
    location: "Bangalore",
    telemetry: {
      speed: 0,
      battery: 15
    },
    activity: [
      "2025-11-16T13:00:00Z - Parked",
      "2025-11-16T14:20:00Z - Last update"
    ]
  },
  {
    id: "V1005",
    vehicleName: "Metro Cruiser",
    model: "MC-5",
    status: "online",
    lastSeen: "2025-11-18T11:00:00Z",
    location: "Chennai",
    telemetry: {
      speed: 30,
      battery: 78
    },
    activity: [
      "2025-11-18T10:00:00Z - Started",
      "2025-11-18T10:30:00Z - Route in progress"
    ]
  },
  {
    id: "V1006",
    vehicleName: "Highway Star",
    model: "HS-6",
    status: "online",
    lastSeen: "2025-11-18T09:45:00Z",
    location: "Hyderabad",
    telemetry: {
      speed: 65,
      battery: 85
    },
    activity: [
      "2025-11-18T08:30:00Z - Started",
      "2025-11-18T09:00:00Z - High speed route"
    ]
  },
  {
    id: "V1007",
    vehicleName: "Eco Mover",
    model: "EM-7",
    status: "offline",
    lastSeen: "2025-11-14T12:00:00Z",
    location: "Kolkata",
    telemetry: {
      speed: 0,
      battery: 8
    },
    activity: [
      "2025-11-14T11:00:00Z - Maintenance required"
    ]
  },
  {
    id: "V1008",
    vehicleName: "City Sprinter",
    model: "CS-8",
    status: "online",
    lastSeen: "2025-11-18T10:30:00Z",
    location: "Pune",
    telemetry: {
      speed: 25,
      battery: 90
    },
    activity: [
      "2025-11-18T09:00:00Z - Started",
      "2025-11-18T10:00:00Z - Delivery completed"
    ]
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getVehicles = async () => {
  await delay(300);
  return [...mockVehicles];
};

export const getVehicleById = async (id) => {
  await delay(200);
  const vehicle = mockVehicles.find(v => v.id === id);
  if (!vehicle) {
    throw new Error(`Vehicle with id ${id} not found`);
  }
  return { ...vehicle };
};

export const updateVehicle = async (id, updates) => {
  await delay(400);
  const index = mockVehicles.findIndex(v => v.id === id);
  if (index === -1) {
    throw new Error(`Vehicle with id ${id} not found`);
  }
  
  mockVehicles[index] = {
    ...mockVehicles[index],
    ...updates
  };
  
  return { ...mockVehicles[index] };
};
