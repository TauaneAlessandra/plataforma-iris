import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ShieldCheck, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { Card } from '../../../shared/card/Card';
import { Button } from '../../../shared/button/Button';
import { MoodPicker } from '../components/MoodPicker';
import { checkInViewModel } from '../viewmodels/CheckInViewModel';
import type { EmotionalCheckIn } from '../../../core/types';
import './CheckInScreen.css';

const HistoryItem: React.FC<{ item: EmotionalCheckIn }> = ({ item }) => {
  const [decryptedNote, setDecryptedNote] = useState<string | undefined>(undefined);
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    async function decrypt() {
      if (item.note) {
        setIsDecrypting(true);
        const note = await checkInViewModel.getDecryptedNote(item.note);
        setDecryptedNote(note);
        setIsDecrypting(false);
      }
    }
    decrypt();
  }, [item.note]);

  const dateStr = new Date(item.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card variant="outline" padding="sm" className="history-item">
      <div className="history-main">
        <div className="history-mood-badge">
          <span className="history-mood">{item.mood.toUpperCase()}</span>
          <span className="history-date">{dateStr}</span>
        </div>
        {item.note && (
          <div className="history-note">
            <MessageSquare size={14} />
            <p>{isDecrypting ? 'Descriptografando...' : decryptedNote || 'Nota Protegida'}</p>
          </div>
        )}
      </div>
      <ChevronRight size={18} className="history-arrow" />
    </Card>
  );
};

export const CheckInScreen: React.FC = observer(() => {
  return (
    <div className="checkin-container animate-in">
      <header className="checkin-header">
        <h1>Check-in</h1>
        <p>Como está seu mundo interior agora?</p>
      </header>

      <div className="checkin-content">
        <Card variant="glass" padding="lg">
          <MoodPicker 
            selectedMood={checkInViewModel.currentMood} 
            onSelect={(mood) => checkInViewModel.setMood(mood)} 
          />

          <div className="note-section">
            <textarea 
              placeholder="Quer escrever algo sobre isso? (Opcional e Criptografado)"
              className="note-input"
              value={checkInViewModel.note}
              onChange={(e) => checkInViewModel.setNote(e.target.value)}
            />
          </div>

          <div className="checkin-actions">
            <div className="security-badge">
              <ShieldCheck size={16} />
              <span>Criptografia de ponta-a-ponta ativa</span>
            </div>
            
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => checkInViewModel.saveCheckIn()}
              disabled={!checkInViewModel.currentMood || checkInViewModel.isSaving}
            >
              {checkInViewModel.isSaving ? 'Salvando...' : 'Finalizar Check-in'}
            </Button>
          </div>
        </Card>

        {checkInViewModel.history.length > 0 && (
          <section className="history-section">
            <div className="section-header">
              <Calendar size={18} />
              <h2>Histórico Recente</h2>
            </div>
            <div className="history-list">
              {checkInViewModel.history.map((item) => (
                <HistoryItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});
