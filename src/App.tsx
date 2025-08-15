import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import BootScreen from './components/BootScreen/BootScreen';
import '98.css';
import './App.css';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="App">
      <Desktop />
    </div>
  );
}

export default App;