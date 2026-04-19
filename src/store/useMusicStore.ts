import { create } from 'zustand';

import oceanSrc from '../sounds/ocean.mp3';
import rainSrc from '../sounds/rain.mp3';
import whiteSrc from '../sounds/white.mp3';

export type SoundKey = 'ocean' | 'rain' | 'white' | null;

export const SOUND_SOURCES: Record<Exclude<SoundKey, null>, string> = {
  ocean: oceanSrc,
  rain: rainSrc,
  white: whiteSrc,
};

interface MusicState {
  activeSound: SoundKey;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  play: (sound: Exclude<SoundKey, null>) => void;
  stop: () => void;
  toggle: (sound: Exclude<SoundKey, null>) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  activeSound: null,
  isPlaying: false,
  audio: null,

  play: (sound) => {
    const { audio } = get();

    // Stop current audio if playing
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const newAudio = new Audio(SOUND_SOURCES[sound]);
    newAudio.loop = true;
    newAudio.volume = 0.5;
    newAudio.play();

    set({ activeSound: sound, isPlaying: true, audio: newAudio });
  },

  stop: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    set({ activeSound: null, isPlaying: false, audio: null });
  },

  toggle: (sound) => {
    const { activeSound, isPlaying } = get();
    if (activeSound === sound && isPlaying) {
      get().stop();
    } else {
      get().play(sound);
    }
  },
}));
