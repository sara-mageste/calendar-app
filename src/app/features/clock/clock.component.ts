import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit, OnDestroy {
  readonly currentTime = signal<Date>(new Date());
  readonly secondHandDeg = signal<number>(0);
  readonly minuteHandDeg = signal<number>(0);
  readonly hourHandDeg = signal<number>(0);

  private timerId: any;

  ngOnInit(): void {
    this.updateClock();
    this.timerId = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateClock(): void {
    const now = new Date();
    this.currentTime.set(now);

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    this.secondHandDeg.set(seconds * 6);
    this.minuteHandDeg.set((minutes + seconds / 60) * 6);
    this.hourHandDeg.set(((hours % 12) + minutes / 60) * 30);
  }
}
