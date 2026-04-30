import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { onboardingViewModel } from '../viewmodels/OnboardingViewModel';
import { Button } from '../../../shared/button/Button';
import { Card } from '../../../shared/card/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Sparkles, ArrowRight, UserCircle } from 'lucide-react';
import './OnboardingScreen.css';

export const OnboardingScreen: React.FC = observer(() => {
  const vm = onboardingViewModel;
  const navigate = useNavigate();

  const handleNext = () => {
    if (vm.step === 3) {
      navigate('/dashboard');
    } else {
      vm.nextStep();
    }
  };

  const renderStep = () => {
    switch (vm.step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div className="icon-wrapper">
              <Shield size={48} className="step-icon" />
            </div>
            <h1>Seu Refúgio Seguro</h1>
            <p>Um espaço anônimo e protegido para cuidar da sua saúde mental com total privacidade.</p>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div className="icon-wrapper">
              <Users size={48} className="step-icon" />
            </div>
            <h1>Comunidade Empática</h1>
            <p>Conecte-se com pessoas que entendem o que você está passando, sem julgamentos.</p>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="step-content"
          >
            <div className="icon-wrapper">
              <UserCircle size={48} className="step-icon" />
            </div>
            <h1>Identidade Anônima</h1>
            <p>Vamos criar sua identidade única na plataforma Íris.</p>
            
            <Card variant="glass" padding="md" className="identity-card">
              {vm.userName ? (
                <div className="identity-display">
                  <span className="label">Sua Identidade:</span>
                  <span className="username">{vm.userName}</span>
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  onClick={() => vm.generateAnonymousIdentity()}
                  isLoading={vm.isGeneratingIdentity}
                  leftIcon={<Sparkles size={18} />}
                >
                  Gerar Nome Anônimo
                </Button>
              )}
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${vm.progress}%` }}
        />
      </div>

      <div className="onboarding-main">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="onboarding-footer">
        <div className="step-dots">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`dot ${s === vm.step ? 'active' : ''}`} 
            />
          ))}
        </div>
        
        <Button 
          onClick={handleNext}
          rightIcon={<ArrowRight size={18} />}
          disabled={vm.step === 3 && !vm.userName}
        >
          {vm.step === 3 ? 'Começar Jornada' : 'Próximo'}
        </Button>
      </div>
    </div>
  );
});
