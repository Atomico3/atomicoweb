import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import RoutesOutlet from './routes/RoutesOutlet.tsx';
import { Navbar } from './components/Navbar.tsx';
import Footer from './components/Footer.jsx';
// Import the debug component
import AuthDebug from './components/AuthDebug';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark-darker">
        <Navbar />
        <main className="flex-grow">
          <RoutesOutlet />
        </main>
        <Footer />
        {/* Add the debug component to help troubleshoot */}
        <AuthDebug />
      </div>
    </Router>
  );
}

export default App;
