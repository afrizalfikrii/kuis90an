// Audio Manager untuk handle semua sound effects dan background music
class AudioManager {
  constructor() {
    this.sounds = {
      menu: new Audio('/sounds/menu utama.mp3'),
      gameplay: new Audio('/sounds/gameplay.mp3'),
      gameover: new Audio('/sounds/gameover.wav'),
      gamewin: new Audio('/sounds/gamewin.wav')
    };

    // Set background music to loop
    this.sounds.menu.loop = true;
    this.sounds.gameplay.loop = true;

    // Set volume
    this.sounds.menu.volume = 0.3;
    this.sounds.gameplay.volume = 0.3;
    this.sounds.gameover.volume = 0.5;
    this.sounds.gamewin.volume = 0.5;

    this.currentBgMusic = null;
    this.isMuted = false;
  }

  playBgMusic(type) {
    // Stop current background music
    this.stopBgMusic();

    // Play new background music
    if (this.sounds[type] && !this.isMuted) {
      this.currentBgMusic = this.sounds[type];
      this.currentBgMusic.currentTime = 0;
      this.currentBgMusic.play().catch(err => {
        console.log('Audio play prevented:', err);
      });
    }
  }

  stopBgMusic() {
    if (this.currentBgMusic) {
      this.currentBgMusic.pause();
      this.currentBgMusic.currentTime = 0;
    }
  }

  playSound(type) {
    if (this.sounds[type] && !this.isMuted) {
      const sound = this.sounds[type].cloneNode();
      sound.volume = this.sounds[type].volume;
      sound.play().catch(err => {
        console.log('Audio play prevented:', err);
      });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      this.stopBgMusic();
    } else if (this.currentBgMusic) {
      // Resume current music
      this.currentBgMusic.play().catch(err => {
        console.log('Audio play prevented:', err);
      });
    }
    
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stopBgMusic();
    }
  }
}

// Create singleton instance
export const audioManager = new AudioManager();
