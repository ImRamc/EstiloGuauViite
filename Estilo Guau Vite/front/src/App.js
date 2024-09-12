import './App.css';
import './index.css';
import RoutesComponent from './routes';
import { UserProvider } from './Context/UserContext';
import { Component } from 'react';
import OfflineDemoComponent from './Components/OfflineDemoComponent/OfflineDemoComponent'; 

function App() {
  return (
    <div className="App">
      <UserProvider>
      <RoutesComponent />
      </UserProvider>
      <OfflineDemoComponent/>
    </div>
  );
}

export default App;
