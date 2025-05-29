import { computed, Injectable, signal } from '@angular/core';
import { Session } from '../enums/session';

@Injectable({
  providedIn: 'root',
})
export class PomodoroEngine {
  // Default session durations
  pomodoroTime = signal(25 * 60);
  shortBreakTime = signal(5 * 60);
  longBreakTime = signal(10 * 60);
  pomodoros = signal(4);

  // Session state
  currentSession = signal(Session.Pomodoro);
  completedPomodoros = signal(0);

  // Timer state
  running = signal(false);
  private startTimestamp = 0;
  private intervalId?: number;
  private elapsedMs = signal(0);

  // Duration for current session
  private sessionDuration = computed(() => {
    switch (this.currentSession()) {
      case Session.ShortBreak:
        return this.shortBreakTime();
      case Session.LongBreak:
        return this.longBreakTime();
      default:
        return this.pomodoroTime();
    }
  });

  // Countdown in seconds
  countdown = computed(() => {
    const elapsed = Math.floor(this.elapsedMs() / 1000);
    return Math.max(this.sessionDuration() - elapsed, 0);
  });

  private tick(): void {
    this.elapsedMs.set(Date.now() - this.startTimestamp);

    if (this.countdown() === 0) {
      this.pause();
      this.updateSession();
    }
  }

  play(): void {
    if (this.running()) return;
    this.running.set(true);
    this.startTimestamp = Date.now() - this.elapsedMs();

    this.tick();
    this.intervalId = window.setInterval(() => this.tick(), 250);
  }

  pause(): void {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.elapsedMs.set(Date.now() - this.startTimestamp);
    this.running.set(false);
  }

  jump(): void {
    this.pause();
    this.updateSession();
  }

  reset(): void {
    this.pause();
    this.currentSession.set(Session.Pomodoro);
    this.completedPomodoros.set(0);
    this.elapsedMs.set(0);
  }

  /** Sets the next pomodoro session */
  private updateSession(): void {
    if (this.currentSession() === Session.Pomodoro) {
      this.completedPomodoros.update((count) => count + 1);
      const isLong = this.completedPomodoros() % this.pomodoros() === 0;
      this.currentSession.set(isLong ? Session.LongBreak : Session.ShortBreak);
    } else {
      this.currentSession.set(Session.Pomodoro);
    }

    this.elapsedMs.set(0);
  }
}
