import VehicleList from './components/VehicleList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Vehicle Fleet Management</h1>
      </header>
      <main>
        <VehicleList />
      </main>
    </div>
  );
}

export default App;
