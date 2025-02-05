import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Transactions from './Transactions';
import Trade from './Trade';
import ViewStock from './ViewStock';

function App() {
  return (
    <Router>  
      <div className = "App">
        <Header />
        <div className='dashboard'>
          <Sidebar />
          <Routes>
            <Route path="/maincontent" element={<MainContent />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/view-stock" element={<ViewStock />} />
            <Route exact path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;