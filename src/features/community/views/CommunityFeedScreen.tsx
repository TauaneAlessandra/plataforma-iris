import React, { useState } from 'react';
import { Card } from '../../../shared/card/Card';
import { Button } from '../../../shared/button/Button';
import { MessageSquare, Heart, Share2, Plus, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './CommunityFeedScreen.css';

const MOCK_POSTS = [
  {
    id: '1',
    author: 'SereneEagle223',
    content: 'Hoje consegui lidar com uma crise de ansiedade usando a técnica de respiração da Íris. Me sinto vitorioso.',
    likes: 12,
    comments: 4,
    time: '2h ago',
    mood: 'good'
  },
  {
    id: '2',
    author: 'QuietWolf882',
    content: 'Às vezes o silêncio é a melhor resposta. Alguém mais se sente assim hoje?',
    likes: 8,
    comments: 2,
    time: '5h ago',
    mood: 'ok'
  }
];

export const CommunityFeedScreen: React.FC = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    // Simulate real-time moderation pipeline (SDD 4.3)
    if (newPost.toLowerCase().includes('morrer') || newPost.toLowerCase().includes('suicidio')) {
      alert('Detectamos palavras sensíveis. Vamos te conectar com nosso suporte agora para te ajudar.');
      return;
    }

    const post = {
      id: Date.now().toString(),
      author: 'Você (Anônimo)',
      content: newPost,
      likes: 0,
      comments: 0,
      time: 'Just now',
      mood: 'neutral'
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="community-container">
      <header className="community-header">
        <h1>Comunidade Íris</h1>
        <p>Compartilhe, apoie e seja apoiado. Tudo 100% anônimo.</p>
      </header>

      <Card variant="glass" padding="md" className="create-post-card">
        <textarea 
          placeholder="O que está no seu coração?" 
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <div className="post-actions">
          <div className="moderation-info">
            <ShieldAlert size={14} />
            <span>Moderação automática ativa</span>
          </div>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handlePost}
            disabled={!newPost.trim()}
            leftIcon={<Plus size={16} />}
          >
            Publicar
          </Button>
        </div>
      </Card>

      <div className="feed-list">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              layout
            >
              <Card variant="default" padding="md" className="post-card">
                <div className="post-header">
                  <div className="post-author-info">
                    <div className="author-avatar" />
                    <span className="author-name">{post.author}</span>
                  </div>
                  <span className="post-time">{post.time}</span>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-footer">
                  <button className="post-action-btn">
                    <Heart size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="post-action-btn">
                    <MessageSquare size={18} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="post-action-btn">
                    <Share2 size={18} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
