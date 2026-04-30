import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from '../../../shared/card/Card';
import { checkInViewModel } from '../../checkin/viewmodels/CheckInViewModel';
import { onboardingViewModel } from '../../user/viewmodels/OnboardingViewModel';
import { 
  TrendingUp, 
  Calendar, 
  Shield, 
  ArrowRight,
  Heart,
  Wind,
  Sparkles,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DashboardScreen.css';

export const DashboardScreen: React.FC = observer(() => {
  const userVm = onboardingViewModel;
  const checkInVm = checkInViewModel;
  const navigate = useNavigate();

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Olá, {userVm.userName || 'Viajante'}</h1>
          <p>Seu espaço de paz e autoconhecimento.</p>
        </div>
        <div className="date-display">
          <Calendar size={18} />
          <span>{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</span>
        </div>
      </header>

      {/* ⚡ AÇÕES RÁPIDAS */}
      <section className="dashboard-section">
        <span className="section-title">Ações Rápidas</span>
        <div className="actions-grid">
          <Card 
            variant="glass" 
            padding="md" 
            className="action-card main"
            onClick={() => navigate('/checkin')}
          >
            <div className="action-icon primary">
              <Heart size={24} />
            </div>
            <div className="action-text">
              <h3>Fazer Check-in</h3>
              <p>Como você está se sentindo agora?</p>
            </div>
            <ArrowRight className="action-arrow" size={20} />
          </Card>

          <Card 
            variant="glass" 
            padding="md" 
            className="action-card"
            onClick={() => navigate('/breathing')}
          >
            <div className="action-icon secondary">
              <Wind size={24} />
            </div>
            <div className="action-text">
              <h3>Respirar</h3>
              <p>Exercício de 4 minutos</p>
            </div>
          </Card>
        </div>
      </section>

      {/* 📊 MÉTRICAS E PROGRESSO */}
      <section className="dashboard-section">
        <span className="section-title">Seu Progresso</span>
        <div className="metrics-grid">
          <Card variant="default" padding="md" className="metric-card">
            <div className="metric-header">
              <TrendingUp size={18} />
              <span>Humor Semanal</span>
            </div>
            <div className="metric-content">
              <span className="metric-value">Equilibrado</span>
              <span className="metric-label">Baseado nos últimos 7 dias</span>
            </div>
          </Card>

          <Card variant="default" padding="md" className="metric-card">
            <div className="metric-header">
              <Award size={18} />
              <span>Sessões</span>
            </div>
            <div className="metric-content">
              <span className="metric-value">{checkInVm.history.length}</span>
              <span className="metric-label">Total de interações</span>
            </div>
          </Card>
        </div>
      </section>

      {/* ✨ DICA DO DIA E SEGURANÇA */}
      <div className="bottom-grid">
        <section className="dashboard-section insight-section">
          <span className="section-title">Dica do Dia</span>
          <Card variant="glass" padding="lg" className="daily-tip-card">
            <Sparkles size={24} className="tip-icon" />
            <p>"A jornada de mil milhas começa com um único passo. Hoje, seu passo foi estar aqui."</p>
          </Card>
        </section>

        <section className="dashboard-section security-section">
          <span className="section-title">Sua Segurança</span>
          <Card variant="outline" padding="md" className="mini-security-card">
            <div className="security-mini-content">
              <Shield size={20} />
              <p>Dados 100% criptografados localmente.</p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
});
