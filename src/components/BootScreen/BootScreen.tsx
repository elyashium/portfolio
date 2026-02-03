import React from 'react';
import MatrixRain from '../MatrixRain/MatrixRain';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  return <MatrixRain duration={3000} onComplete={onBootComplete} />;
};

export default BootScreen;
