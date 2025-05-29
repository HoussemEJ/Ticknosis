import { Component, inject } from '@angular/core';
import { Slice } from "../slice/slice";
import { ClockEngine } from '../../services/clock-engine';
import { PomodoroEngine } from '../../services/pomodoro-engine';

@Component({
  selector: 'app-clock',
  imports: [Slice],
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
})
export class Clock {
  private clockEngine = inject(ClockEngine);
  private pomodoroEngine = inject(PomodoroEngine);

  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  hourDegrees = this.clockEngine.hourDegrees;
  minuteDegrees = this.clockEngine.minuteDegrees;
  secondDegrees = this.clockEngine.secondDegrees;

  running = this.pomodoroEngine.running;
  completedPomodoros = this.pomodoroEngine.completedPomodoros;
}
