import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`card card-${variant} card-p-${padding} ${onClick ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
