import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { chatViewModel } from '../viewmodels/ChatViewModel';
import { Button } from '../../../shared/button/Button';
import { Card } from '../../../shared/card/Card';
import { Send, Shield, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatScreen.css';

export const ChatScreen: React.FC = observer(() => {
  const vm = chatViewModel;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [vm.messages.length, vm.isTyping]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="chat-info">
          <h1>Suporte Íris</h1>
          <div className="security-tag">
            <Shield size={12} />
            Criptografado ponta-a-ponta
          </div>
        </div>
      </header>

      <div className="messages-list" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {vm.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`message-wrapper ${msg.sender}`}
            >
              <div className="message-avatar">
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="message-content">
                <Card variant={msg.sender === 'user' ? 'default' : 'glass'} padding="sm">
                  {msg.content}
                </Card>
                <span className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {vm.isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="typing-indicator">
            <span>Íris está digitando</span>
            <div className="dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Descreva como você se sente..."
          value={vm.inputText}
          onChange={(e) => vm.setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && vm.sendMessage()}
        />
        <Button 
          variant="primary" 
          onClick={() => vm.sendMessage()}
          disabled={!vm.inputText.trim()}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
});
