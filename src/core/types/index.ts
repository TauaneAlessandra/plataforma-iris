export type Mood = 'great' | 'ok' | 'bad' | 'terrible' | 'good';

export interface UserProfile {
  id: string;
  uuid: string;
  displayName: string;
  anonymousAvatar: string;
  isModerator: boolean;
  createdAt: Date;
}

export interface EmotionalCheckIn {
  id: string;
  userId: string;
  mood: Mood;
  note?: string; // This will be encrypted client-side
  timestamp: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  authorName: string;
  content: string;
  isFlagged: boolean;
  likes: number;
  commentsCount: number;
  createdAt: Date;
}

export interface SupportSession {
  id: string;
  userId: string;
  status: 'active' | 'escalated' | 'closed';
  startedAt: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'ia' | 'human';
  content: string; // Encrypted client-side
  timestamp: Date;
}
