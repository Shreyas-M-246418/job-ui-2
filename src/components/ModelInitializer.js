import React, { useEffect, useState } from 'react';
import TransformerService from '../services/transformerService';

const ModelInitializer = ({ onInitialized }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeModel = async () => {
      try {
        await TransformerService.initialize((progress) => {
          setStatus(progress.status);
          setProgress(progress.progress || 0);
        });
        setIsInitialized(true);
        onInitialized();
      } catch (error) {
        console.error('Error initializing model:', error);
        setStatus('Error initializing model');
      }
    };

    initializeModel();
  }, [onInitialized]);

  if (isInitialized) return null;

  return (
    <div className="loading">
      <div className="loader"></div>
      <div className="loading-content">
        <p>{status}</p>
        {progress > 0 && <p>{(progress * 100).toFixed(2)}%</p>}
      </div>
    </div>
  );
};

export default ModelInitializer; 