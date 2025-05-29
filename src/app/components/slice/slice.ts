import { Component, computed, inject } from '@angular/core';
import { ClockEngine } from '../../services/clock-engine';
import { PomodoroEngine } from '../../services/pomodoro-engine';

@Component({
  selector: 'app-slice',
  imports: [],
  templateUrl: './slice.html',
  styleUrl: './slice.scss',
})
export class Slice {
  private clockEngine = inject(ClockEngine);
  private pomodoroEngine = inject(PomodoroEngine);

  startPosition = computed(() => `${this.clockEngine.minuteDegrees()}deg`);

  sliceLength = computed(() => {
    return `${(this.pomodoroEngine.countdown() / 60) * 6}deg`;
  });
}
