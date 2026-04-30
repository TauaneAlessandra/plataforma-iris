import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart } from 'lucide-react';
import type { Mood } from '../../../core/types';
import './MoodPicker.css';

interface MoodPickerProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

const MOODS: { type: Mood; icon: React.ElementType; label: string; color: string }[] = [
  { type: 'great', icon: Heart, label: 'Incrível', color: '#fb7185' },
  { type: 'good', icon: Smile, label: 'Bem', color: '#2dd4bf' },
  { type: 'ok', icon: Meh, label: 'Ok', color: '#94a3b8' },
  { type: 'bad', icon: Frown, label: 'Mal', color: '#8b5cf6' },
  { type: 'terrible', icon: Frown, label: 'Péssimo', color: '#f43f5e' },
];

export const MoodPicker: React.FC<MoodPickerProps> = ({ selectedMood, onSelect }) => {
  return (
    <div className="mood-selector">
      {MOODS.map((mood) => {
        const Icon = mood.icon;
        const isActive = selectedMood === mood.type;
        
        return (
          <motion.button
            key={mood.type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`mood-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(mood.type)}
            style={{ '--mood-color': mood.color } as React.CSSProperties}
          >
            <Icon size={32} />
            <span>{mood.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
