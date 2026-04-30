import { makeAutoObservable, runInAction } from 'mobx';
import type { Mood, EmotionalCheckIn } from '../../../core/types';
import { encryptionService } from '../../../core/security/EncryptionService';

export class CheckInViewModel {
  currentMood: Mood | null = null;
  note: string = '';
  isSaving: boolean = false;
  history: EmotionalCheckIn[] = [
    { id: '1', userId: 'u1', mood: 'great', timestamp: new Date(Date.now() - 86400000 * 4) },
    { id: '2', userId: 'u1', mood: 'good', timestamp: new Date(Date.now() - 86400000 * 3) },
    { id: '3', userId: 'u1', mood: 'ok', timestamp: new Date(Date.now() - 86400000 * 2) },
    { id: '4', userId: 'u1', mood: 'bad', timestamp: new Date(Date.now() - 86400000 * 1) },
    { id: '5', userId: 'u1', mood: 'good', timestamp: new Date() },
  ];

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
    
    // 1. Encrypt note client-side using real AES-GCM
    let encryptedNote: string | undefined = undefined;
    if (this.note) {
      encryptedNote = await encryptionService.encrypt(this.note);
    }
    
    // 2. Prepare payload
    const checkIn: EmotionalCheckIn = {
      id: Math.random().toString(36).substring(2, 9),
      userId: 'anonymous-user-123',
      mood: this.currentMood,
      note: encryptedNote,
      timestamp: new Date()
    };

    // 3. Simulate API Call
    console.log('[CheckIn] Saving real encrypted check-in:', checkIn);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    runInAction(() => {
      this.history.unshift(checkIn);
      this.reset();
      this.isSaving = false;
    });
  }

  /**
   * Helper to decrypt a note on demand.
   * This ensures we don't block the UI thread and follow async patterns.
   */
  async getDecryptedNote(encryptedNote: string): Promise<string> {
    return await encryptionService.decrypt(encryptedNote);
  }

  private reset() {
    this.currentMood = null;
    this.note = '';
  }
}

export const checkInViewModel = new CheckInViewModel();
