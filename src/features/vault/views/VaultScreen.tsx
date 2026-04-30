import React, { useState } from 'react';
import { Card } from '../../../shared/card/Card';
import { Button } from '../../../shared/button/Button';
import { Lock, Unlock, ShieldCheck, Plus, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './VaultScreen.css';

export const VaultScreen: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');

  const handleUnlock = () => {
    if (password === '1234') { // Mock password
      setIsLocked(false);
    } else {
      alert('Senha incorreta. (Dica: 1234)');
    }
  };

  return (
    <div className="vault-container">
      <header className="vault-header">
        <div className="vault-icon-wrapper">
          {isLocked ? <Lock size={48} /> : <Unlock size={48} />}
        </div>
        <h1>Cofre de Segurança</h1>
        <p>Seu espaço pessoal criptografado com Zero-Trust.</p>
      </header>

      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div 
            key="locked"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="vault-lock-screen"
          >
            <Card variant="glass" padding="lg">
              <h3>Desbloquear Cofre</h3>
              <p>Insira sua senha mestre para acessar seus dados protegidos.</p>
              
              <div className="password-input-wrapper">
                <input 
                  type="password" 
                  placeholder="Senha Mestre" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                />
              </div>
              
              <Button variant="primary" onClick={handleUnlock} className="unlock-btn">
                Acessar Cofre
              </Button>

              <div className="security-notice">
                <ShieldCheck size={16} />
                <span>Dados cifrados localmente com AES-256</span>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            key="unlocked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="vault-content"
          >
            <div className="vault-grid">
              <Card variant="default" padding="md" className="vault-item">
                <div className="item-header">
                  <span className="item-tag">Nota Protegida</span>
                  <Button variant="ghost" size="sm"><EyeOff size={16} /></Button>
                </div>
                <h3>Meus Pensamentos</h3>
                <p className="item-preview">Conteúdo criptografado...</p>
              </Card>

              <Card variant="outline" padding="md" className="add-vault-item">
                <Plus size={32} />
                <span>Adicionar Item</span>
              </Card>
            </div>

            <Button variant="secondary" onClick={() => setIsLocked(true)} className="lock-again-btn">
              Bloquear Agora
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
