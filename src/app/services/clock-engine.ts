import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClockEngine {
  secondDegrees = signal(0);
  minuteDegrees = signal(0);
  hourDegrees = signal(0);

  constructor() {
    this.updateClock();
    setInterval(() => this.updateClock(), 250);
  }

  private updateClock(): void {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.secondDegrees.set(seconds * 6);
    this.minuteDegrees.set((minutes + seconds / 60) * 6);
    this.hourDegrees.set((hours + minutes / 60) * 30);
  }
}
