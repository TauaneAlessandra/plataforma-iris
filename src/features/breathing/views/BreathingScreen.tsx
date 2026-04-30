import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from '../../../shared/button/Button';
import './BreathingScreen.css';

type BreathState = 'inhale' | 'hold' | 'exhale' | 'ready';

export const BreathingScreen: React.FC = () => {
  const [state, setState] = useState<BreathState>('ready');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      if (state === 'ready') {
        timer = setTimeout(() => setState('inhale'), 100);
      } else if (state === 'inhale') {
        timer = setTimeout(() => setState('hold'), 4000);
      } else if (state === 'hold') {
        timer = setTimeout(() => setState('exhale'), 4000);
      } else if (state === 'exhale') {
        timer = setTimeout(() => setState('inhale'), 4000);
      }
    }

    return () => clearTimeout(timer);
  }, [isActive, state]);

  const getStatusText = () => {
    switch (state) {
      case 'inhale': return 'Inspire pelo nariz...';
      case 'hold': return 'Segure a respiração...';
      case 'exhale': return 'Solte o ar pela boca...';
      default: return 'Prepare-se para começar';
    }
  };

  return (
    <div className="breathing-container">
      <header className="breathing-header">
        <h1>Exercício de Respiração</h1>
        <p>Acalme sua mente e sincronize seu corpo.</p>
      </header>

      <div className="visualizer-container">
        <AnimatePresence mode="wait">
          <motion.div 
            key={state}
            initial={{ scale: state === 'inhale' ? 1 : state === 'exhale' ? 1.5 : 1.2 }}
            animate={{ 
              scale: state === 'inhale' ? 1.5 : state === 'exhale' ? 1 : 1.5,
              backgroundColor: state === 'inhale' ? 'var(--primary-color)' : state === 'hold' ? 'var(--secondary-color)' : 'var(--accent-color)'
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className={`breath-circle ${state}`}
          >
            <div className="breath-inner" />
          </motion.div>
        </AnimatePresence>

        <div className="status-overlay">
          <motion.h2 
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="status-text"
          >
            {getStatusText()}
          </motion.h2>
        </div>
      </div>

      <div className="breathing-controls">
        <Button 
          variant={isActive ? 'secondary' : 'primary'}
          size="lg"
          onClick={() => setIsActive(!isActive)}
          leftIcon={isActive ? <Pause /> : <Play />}
        >
          {isActive ? 'Pausar' : 'Começar'}
        </Button>
        
        <Button 
          variant="ghost"
          onClick={() => {
            setIsActive(false);
            setState('ready');
          }}
          leftIcon={<RefreshCw size={18} />}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};
