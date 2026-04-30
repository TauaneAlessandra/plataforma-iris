/**
 * EncryptionService
 * Implements real client-side encryption using Web Crypto API.
 * Follows the Zero-Trust Client-Side principle (SDD 4.2).
 */
export class EncryptionService {
  private static instance: EncryptionService;
  private cryptoKey: CryptoKey | null = null;

  private constructor() {}

  public static getInstance(): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService();
    }
    return EncryptionService.instance;
  }

  /**
   * Derives a cryptographic key from a passphrase.
   * In production, this ensures data is never accessible without the user's secret.
   */
  public async initialize(passphrase: string): Promise<void> {
    const encoder = new TextEncoder();
    const salt = encoder.encode('iris-salt-123'); // In production, use a unique per-user salt
    
    // Import raw passphrase as a key
    const baseKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    // Derive the actual AES-GCM key
    this.cryptoKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    console.log('[Security] Real Encryption service initialized with AES-GCM.');
  }

  /**
   * Encrypts text using AES-GCM.
   */
  public async encrypt(text: string): Promise<string> {
    if (!this.cryptoKey) throw new Error('Encryption service not initialized');

    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization Vector
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.cryptoKey,
      encoder.encode(text)
    );

    // Combine IV and Encrypted Data for storage
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    // Return as Base64 string
    return btoa(String.fromCharCode(...combined));
  }

  /**
   * Decrypts AES-GCM encrypted strings.
   */
  public async decrypt(encryptedBase64: string): Promise<string> {
    if (!this.cryptoKey) throw new Error('Encryption service not initialized');

    try {
      const combined = new Uint8Array(
        atob(encryptedBase64).split('').map(char => char.charCodeAt(0))
      );

      const iv = combined.slice(0, 12);
      const data = combined.slice(12);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        this.cryptoKey,
        data
      );

      return new TextDecoder().decode(decryptedBuffer);
    } catch {
      return 'Erro na descriptografia: Chave inválida ou dados corrompidos.';
    }
  }
}

export const encryptionService = EncryptionService.getInstance();
