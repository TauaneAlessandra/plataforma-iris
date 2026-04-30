import React from 'react';
import { observer } from 'mobx-react-lite';
import { checkInViewModel } from '../viewmodels/CheckInViewModel';
import { Button } from '../../../shared/button/Button';
import { Card } from '../../../shared/card/Card';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { MoodPicker } from '../components/MoodPicker';
import './CheckInScreen.css';

export const CheckInScreen: React.FC = observer(() => {
  const vm = checkInViewModel;

  return (
    <div className="checkin-container">
      <header className="checkin-header">
        <h1>Como você está se sentindo?</h1>
        <p>Seu check-in é totalmente privado e criptografado.</p>
      </header>

      <MoodPicker 
        selectedMood={vm.currentMood} 
        onSelect={(mood) => vm.setMood(mood)} 
      />

      <AnimatePresence>
        {vm.currentMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="note-section"
          >
            <Card variant="glass" padding="md">
              <textarea
                placeholder="Quer escrever algo sobre o seu dia? (Opcional)"
                value={vm.note}
                onChange={(e) => vm.setNote(e.target.value)}
                className="note-input"
              />
              <div className="security-badge">
                <span className="dot animate-glow" />
                Criptografia de ponta-a-ponta ativa
              </div>
            </Card>

            <Button 
              className="save-btn" 
              size="lg"
              isLoading={vm.isSaving}
              onClick={() => vm.saveCheckIn()}
              rightIcon={<Send size={18} />}
            >
              Salvar Check-in
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="history-section">
        <h3>Histórico Recente</h3>
        <div className="history-list">
          {vm.decryptedHistory.map((item) => (
            <Card key={item.id} variant="default" padding="sm" className="history-item">
              <div className="history-mood">
                {item.mood}
              </div>
              <div className="history-date">
                {item.timestamp.toLocaleTimeString()}
              </div>
              {item.note && <div className="history-note">{item.note}</div>}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
});

import { AnimatePresence } from 'framer-motion';
