import { makeAutoObservable } from 'mobx';
import { encryptionService } from '../../../core/security/EncryptionService';

export class OnboardingViewModel {
  step: number = 1;
  totalSteps: number = 3;
  userName: string = '';
  isGeneratingIdentity: boolean = false;
  
  constructor() {
    makeAutoObservable(this);
  }

  nextStep() {
    if (this.step < this.totalSteps) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  async generateAnonymousIdentity() {
    this.isGeneratingIdentity = true;
    // Simulate API call or complex logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const adjectives = ['Calm', 'Serene', 'Brave', 'Quiet', 'Bright'];
    const animals = ['Panda', 'Eagle', 'Wolf', 'Deer', 'Otter'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    this.userName = `${randomAdj}${randomAnimal}${randomNum}`;
    
    // Initialize encryption service with the identity as master key (for study purposes)
    await encryptionService.initialize(this.userName);
    
    this.isGeneratingIdentity = false;
  }

  get progress() {
    return (this.step / this.totalSteps) * 100;
  }
}

export const onboardingViewModel = new OnboardingViewModel();
