import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Jobs from './pages/Jobs';
import Links from './pages/Links';

function App() {
  const [activePage, setActivePage] = useState('jobs');

  return (
    <div className="App">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'jobs' ? <Jobs /> : <Links />}
    </div>
  );
}

export default App;