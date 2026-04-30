import React from 'react';
import { observer } from 'mobx-react-lite';
import { 
  Heart, 
  Wind, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Card } from '../../../shared/card/Card';
import { checkInViewModel } from '../../checkin/viewmodels/CheckInViewModel';
import { motion } from 'framer-motion';
import './DashboardScreen.css';

export const DashboardScreen: React.FC = observer(() => {
  const today = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  // Simple chart logic based on mood history
  const moodValues = { terrible: 1, bad: 2, ok: 3, good: 4, great: 5 };
  const chartData = [...checkInViewModel.history].reverse().slice(-7);
  
  const points = chartData.map((item, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - (moodValues[item.mood] / 5) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="dashboard-container animate-in">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Olá, Íris</h1>
          <p>Como você está se sentindo hoje?</p>
        </div>
        <div className="date-display">
          <Calendar size={18} />
          <span>{today}</span>
        </div>
      </header>

      {/* Quick Actions Hierarchy */}
      <section className="dashboard-section">
        <span className="section-title">Ações Rápidas</span>
        <div className="actions-grid">
          <Card variant="default" padding="md" className="action-card" isClickable>
            <div className="action-icon primary">
              <Heart size={28} />
            </div>
            <div className="action-text">
              <h3>Fazer Check-in</h3>
              <p>Registre seu humor atual</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Card>

          <Card variant="default" padding="md" className="action-card" isClickable>
            <div className="action-icon secondary">
              <Wind size={28} />
            </div>
            <div className="action-text">
              <h3>Respirar</h3>
              <p>Exercício de 4 minutos</p>
            </div>
            <ChevronRight className="action-arrow" />
          </Card>
        </div>
      </section>

      {/* Metrics & Evolution */}
      <div className="bottom-grid">
        <section className="dashboard-section">
          <span className="section-title">Sua Evolução</span>
          <Card variant="glass" padding="lg" className="evolution-card">
            <div className="chart-header">
              <div className="chart-info">
                <TrendingUp size={20} className="chart-icon" />
                <h3>Tendência de Humor</h3>
              </div>
              <span className="chart-period">Últimos 7 dias</span>
            </div>
            
            <div className="chart-container">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mood-chart-svg">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area under the line */}
                <motion.polyline
                  fill="url(#chartGradient)"
                  points={`0,100 ${points} 100,100`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                />
                
                {/* Main Path */}
                <motion.polyline
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Dots */}
                {chartData.map((item, i) => {
                  const x = (i / (chartData.length - 1)) * 100;
                  const y = 100 - (moodValues[item.mood] / 5) * 100;
                  return (
                    <circle 
                      key={item.id} 
                      cx={x} cy={y} r="2" 
                      fill="var(--primary-color)"
                      className="chart-dot"
                    />
                  );
                })}
              </svg>
              <div className="chart-labels">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
              </div>
            </div>
          </Card>
        </section>

        <section className="dashboard-section">
          <span className="section-title">Insight do Dia</span>
          <Card variant="default" padding="lg" className="daily-tip-card">
            <Sparkles className="tip-icon" size={24} />
            <p>"Pequenos passos diários levam a grandes transformações mentais."</p>
            <div className="security-mini">
              <ShieldCheck size={14} />
              <span>Privacidade Zero-Trust Ativa</span>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
});
