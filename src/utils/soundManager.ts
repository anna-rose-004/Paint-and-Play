// Sound Manager for the Color by Numbers Game
// Provides audio feedback and background music for better accessibility and engagement

export class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private backgroundMusic: OscillatorNode | null = null;
  private musicGainNode: GainNode | null = null;
  private ambientSounds: OscillatorNode[] = [];
  private isEnabled: boolean = true;
  private isMusicPlaying: boolean = false;

  constructor() {
    this.initializeAudioContext();
    this.generateSounds();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio not supported in this browser');
    }
  }

  private async generateSounds() {
    if (!this.audioContext) return;

    // Generate different tones for various actions with more musical qualities
    const sounds = {
      click: { frequency: 800, duration: 0.15, type: 'triangle' as OscillatorType },
      success: { frequency: 523, duration: 0.4, type: 'sine' as OscillatorType },
      levelComplete: { frequency: 659, duration: 0.6, type: 'sine' as OscillatorType },
      colorSelect: { frequency: 880, duration: 0.3, type: 'triangle' as OscillatorType },
      coinEarned: { frequency: 1047, duration: 0.25, type: 'sine' as OscillatorType },
      correctMatch: { frequency: 698, duration: 0.3, type: 'sine' as OscillatorType },
      celebration: { frequency: 880, duration: 0.5, type: 'sine' as OscillatorType },
      magical: { frequency: 1047, duration: 0.3, type: 'sine' as OscillatorType },
      sparkle: { frequency: 1319, duration: 0.2, type: 'triangle' as OscillatorType }
    };

    for (const [name, config] of Object.entries(sounds)) {
      const buffer = this.createTone(config.frequency, config.duration, config.type);
      if (buffer) {
        this.sounds.set(name, buffer);
      }
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'triangle':
          sample = 2 * Math.abs(2 * (t * frequency - Math.floor(t * frequency + 0.5))) - 1;
          break;
        case 'sawtooth':
          sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
        default:
          sample = Math.sin(2 * Math.PI * frequency * t);
      }

      // Apply envelope for smoother sound with more musical quality
      let envelope;
      if (type === 'triangle' && frequency > 800) {
        // Special envelope for coin-like sounds
        envelope = Math.exp(-t * 3) * (1 - Math.exp(-t * 15)) * (1 + 0.3 * Math.sin(2 * Math.PI * frequency * 2 * t));
      } else {
        envelope = Math.exp(-t * 2) * (1 - Math.exp(-t * 10));
      }
      channelData[i] = sample * envelope * 0.15; // Slightly higher volume for better engagement
    }

    return buffer;
  }

  async playSound(soundName: string) {
    if (!this.isEnabled || !this.audioContext || !this.sounds.has(soundName)) return;

    try {
      // Resume audio context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const buffer = this.sounds.get(soundName);
      if (!buffer) return;

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Set volume
      gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
      
      source.start();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  async startBackgroundMusic() {
    if (!this.isEnabled || !this.audioContext || this.isMusicPlaying) return;

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Create a gentle, looping background melody
      this.musicGainNode = this.audioContext.createGain();
      this.musicGainNode.connect(this.audioContext.destination);
      this.musicGainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime); // Very low volume

      // Play a gentle melody loop
      this.playMelodyLoop();
      this.isMusicPlaying = true;
    } catch (error) {
      console.warn('Error starting background music:', error);
    }
  }

  private playMelodyLoop() {
    if (!this.audioContext || !this.musicGainNode || !this.isEnabled) return;

    // Gentle melody notes (C major pentatonic scale for pleasant sound)
    const melody = [523, 587, 659, 784, 880]; // C, D, E, G, A
    const noteDuration = 1.5; // Slower, more relaxing
    
    melody.forEach((frequency, index) => {
      setTimeout(() => {
        if (this.isMusicPlaying && this.audioContext && this.musicGainNode) {
          this.playBackgroundNote(frequency, noteDuration);
        }
      }, index * noteDuration * 1000);
    });

    // Loop the melody
    setTimeout(() => {
      if (this.isMusicPlaying) {
        this.playMelodyLoop();
      }
    }, melody.length * noteDuration * 1000);
  }

  private playBackgroundNote(frequency: number, duration: number) {
    if (!this.audioContext || !this.musicGainNode) return;

    const oscillator = this.audioContext.createOscillator();
    const noteGain = this.audioContext.createGain();

    oscillator.connect(noteGain);
    noteGain.connect(this.musicGainNode);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';

    // Gentle envelope
    noteGain.gain.setValueAtTime(0, this.audioContext.currentTime);
    noteGain.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.backgroundMusic = null;
    }
    if (this.musicGainNode) {
      this.musicGainNode.disconnect();
      this.musicGainNode = null;
    }
  }

  async playAmbientSparkles() {
    if (!this.isEnabled || !this.audioContext) return;

    // Play random sparkle sounds for ambient effect
    const frequencies = [1047, 1319, 1568, 1760]; // High, pleasant frequencies
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
    
    setTimeout(() => {
      this.playCustomTone(randomFreq, 0.3);
    }, Math.random() * 2000); // Random delay up to 2 seconds
  }
  async playSuccessSequence() {
    if (!this.isEnabled) return;
    
    // Play a more elaborate success sequence
    const frequencies = [523, 659, 784, 1047, 1319]; // C, E, G, C, E (extended major chord)
    
    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        this.playCustomTone(frequencies[i], 0.3);
      }, i * 120);
    }

    // Add some sparkle effects
    setTimeout(() => this.playSound('sparkle'), 600);
    setTimeout(() => this.playSound('magical'), 800);
  }

  private async playCustomTone(frequency: number, duration: number) {
    if (!this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = 'sine';

      // Envelope
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Error playing custom tone:', error);
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stopBackgroundMusic();
    }
    return this.isEnabled;
  }

  isAudioEnabled() {
    return this.isEnabled;
  }

  isMusicEnabled() {
    return this.isMusicPlaying;
  }
}

export const soundManager = new SoundManager();