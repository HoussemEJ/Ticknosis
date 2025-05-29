import { Component, computed, inject } from '@angular/core';
import { Clock } from '../clock/clock';
import { PomodoroEngine } from '../../services/pomodoro-engine';
import { Session } from '../../enums/session';

@Component({
  selector: 'app-timer',
  imports: [Clock],
  templateUrl: './timer.html',
  styleUrl: './timer.scss',
})
export class Timer {
  private pomodoroEngine = inject(PomodoroEngine);

  sessions = Object.values(Session);
  currentSession = this.pomodoroEngine.currentSession;

  running = this.pomodoroEngine.running;

  countdown = computed(() => {
    const total = this.pomodoroEngine.countdown();
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  });

  togglePlayPause() {
    this.pomodoroEngine.running()
      ? this.pomodoroEngine.pause()
      : this.pomodoroEngine.play();
  }

  reset() {
    this.pomodoroEngine.reset();
  }

  jump() {
    this.pomodoroEngine.jump();
  }
}
