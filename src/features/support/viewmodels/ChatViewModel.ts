import { makeAutoObservable } from 'mobx';
import type { ChatMessage } from '../../../core/types';

export class ChatViewModel {
  messages: ChatMessage[] = [];
  inputText: string = '';
  isTyping: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.addSystemMessage('Olá! Eu sou a Íris. Como posso te ajudar hoje? Estou aqui para te ouvir em um espaço totalmente seguro e anônimo.');
  }

  setInput(text: string) {
    this.inputText = text;
  }

  async sendMessage() {
    if (!this.inputText.trim()) return;

    const userText = this.inputText;
    this.inputText = '';

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sessionId: 'session-1',
      sender: 'user',
      content: userText,
      timestamp: new Date()
    };
    this.messages.push(userMsg);

    // 2. Simulate IA Thinking
    this.isTyping = true;
    
    // Simulate Human-like typing delay
    const delay = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // 2. IA Response
    const iaResponse = this.getIAResponse(userText);
    const iaMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sessionId: 'session-1',
      sender: 'ia',
      content: iaResponse,
      timestamp: new Date()
    };
    
    this.messages.push(iaMsg);
    this.isTyping = false;
  }

  private addSystemMessage(text: string) {
    this.messages.push({
      id: 'sys-' + Date.now(),
      sessionId: 'session-1',
      sender: 'ia',
      content: text,
      timestamp: new Date()
    });
  }

  private getIAResponse(input: string): string {
    const text = input.toLowerCase();
    if (text.includes('triste') || text.includes('mal')) {
      return 'Sinto muito que você esteja se sentindo assim. É importante validar seus sentimentos. Quer me contar mais sobre o que aconteceu?';
    }
    if (text.includes('ansioso') || text.includes('ansiedade')) {
      return 'A ansiedade pode ser muito pesada. Tente focar na sua respiração por um momento. Eu estou aqui com você.';
    }
    return 'Entendo. Obrigado por compartilhar isso comigo. Como você se sente em relação a isso?';
  }
}

export const chatViewModel = new ChatViewModel();
