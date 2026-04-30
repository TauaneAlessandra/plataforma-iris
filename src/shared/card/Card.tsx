import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  isClickable = false
}) => {
  return (
    <div 
      className={`card card-${variant} card-p-${padding} ${(onClick || isClickable) ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
