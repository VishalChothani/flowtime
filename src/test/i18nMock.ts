import { vi } from 'vitest';

/** Shared mock for react-i18next used across component tests */
export const mockI18n = {
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts?.returnObjects) {
        return ['Test quote one.', 'Test quote two.'];
      }
      const map: Record<string, string> = {
        'header.appName': 'flowtime',
        'language.switchLanguage': 'Switch language',
        'language.en': 'English',
        'language.es': 'Español',
        'language.it': 'Italiano',
        'timer.countdownTimer': 'Countdown timer',
        'timer.setCountdownDuration': 'Set countdown duration',
        'timer.minutes': 'Minutes',
        'timer.seconds': 'Seconds',
        'timer.minMax': 'Min 00:10 · Max 59:59',
        'timer.timerControls': 'Timer controls',
        'timer.start': 'Start',
        'timer.pause': 'Pause',
        'timer.resume': 'Resume',
        'timer.reset': 'Reset',
        'timer.focusTime': 'Focus time...',
        'timer.paused': 'Paused',
        'timer.timesUp': "Time's up! 🎉",
        'timer.startCountdown': 'Start countdown',
        'timer.pauseCountdown': 'Pause countdown',
        'timer.resumeCountdown': 'Resume countdown',
        'timer.resetCountdown': 'Reset countdown',
        'timer.timeRemaining': `Time remaining: ${opts?.time ?? ''}`,
        'actions.quickActions': 'Quick actions',
        'actions.theme': 'Theme',
        'actions.music': 'Music',
        'actions.edit': 'Edit',
        'shortcuts.title': 'Keyboard Shortcuts',
        'theme.title': 'Theme',
        'theme.light': 'Light',
        'theme.dark': 'Dark',
        'theme.gradient': 'Gradient',
        'theme.shuffle': 'Shuffle gradient',
        'music.title': 'Ambient Sounds',
        'music.ocean': 'Ocean Waves',
        'music.rain': 'Rain',
        'music.white': 'White Noise',
        'music.stop': 'Stop',
        'music.playing': 'Playing',
        'notes.title': 'Quick Notes',
        'notes.placeholder': 'Write your notes here...',
        'notes.saved': 'Saved',
        'notes.close': 'Close notes',
      };
      return map[key] ?? key;
    },
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
};
