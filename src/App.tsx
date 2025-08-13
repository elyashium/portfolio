import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import BootScreen from './components/BootScreen/BootScreen';
import '98.css';
import './App.css';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    // Check if user has visited before (in this session)
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsBooting(false);
      setHasBooted(true);
    } else {
      // Mark as visited for this session
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
    setHasBooted(true);
  };

  if (isBooting && !hasBooted) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="App">
      <Desktop />
    </div>
  );
}

export default App;