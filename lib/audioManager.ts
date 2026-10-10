// lib/audioManager.ts
class AudioManager {
  private audio: HTMLAudioElement | null = null;

  getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio();
    }
    return this.audio;
  }

  setSrc(url: string) {
    const audio = this.getAudio();
    if (audio.src !== url) {
      audio.pause();
      audio.src = url;
      audio.load();
    }
  }

  play() {
    return this.getAudio().play();
  }

  pause() {
    this.getAudio().pause();
  }

  setVolume(v: number) {
    this.getAudio().volume = v;
  }

  seek(time: number) {
    this.getAudio().currentTime = time;
  }
}

export const audioManager = new AudioManager();
