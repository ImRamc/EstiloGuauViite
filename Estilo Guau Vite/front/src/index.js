import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './Context/UserContext';  // Importa el UserProvider

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>  {/* Envuelve tu aplicación con el UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
