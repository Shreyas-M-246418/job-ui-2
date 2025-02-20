import React, { useEffect, useState } from 'react';
import TransformerService from '../services/transformerService';

const ModelInitializer = ({ onInitialized }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const initializeModel = async () => {
      try {
        await TransformerService.initialize((progress) => {
          setStatus(progress.status);
          setProgress(progress.progress || 0);
        });
        onInitialized();
      } catch (error) {
        console.error('Error initializing model:', error);
      }
    };

    initializeModel();
  }, [onInitialized]);

  return (
    <div className="loading">
      <div className="loader"></div>
      <p>{status}</p>
      {progress > 0 && <p>{Math.round(progress * 100)}%</p>}
    </div>
  );
};

export default ModelInitializer; 