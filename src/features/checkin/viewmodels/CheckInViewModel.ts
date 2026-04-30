import { makeAutoObservable } from 'mobx';
import type { Mood, EmotionalCheckIn } from '../../../core/types';
import { encryptionService } from '../../../core/security/EncryptionService';

export class CheckInViewModel {
  currentMood: Mood | null = null;
  note: string = '';
  isSaving: boolean = false;
  history: EmotionalCheckIn[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setMood(mood: Mood) {
    this.currentMood = mood;
  }

  setNote(note: string) {
    this.note = note;
  }

  async saveCheckIn() {
    if (!this.currentMood) return;

    this.isSaving = true;
    
    // 1. Encrypt note client-side as per SDD 4.2
    const encryptedNote = this.note ? encryptionService.encrypt(this.note) : undefined;
    
    // 2. Prepare payload
    const checkIn: EmotionalCheckIn = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'anonymous-user-123',
      mood: this.currentMood,
      note: encryptedNote,
      timestamp: new Date()
    };

    // 3. Simulate API Call
    console.log('[CheckIn] Saving encrypted check-in:', checkIn);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.history.unshift(checkIn);
    this.reset();
    this.isSaving = false;
  }

  private reset() {
    this.currentMood = null;
    this.note = '';
  }

  get decryptedHistory() {
    return this.history.map(item => ({
      ...item,
      note: item.note ? encryptionService.decrypt(item.note) : undefined
    }));
  }
}

export const checkInViewModel = new CheckInViewModel();
