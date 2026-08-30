import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly currentTime = signal<Date>(new Date());
  readonly hours = signal<string>('00');
  readonly minutes = signal<string>('00');
  readonly seconds = signal<string>('00');
  readonly period = signal<'AM' | 'PM'>('AM');

  readonly formattedTime = signal<string>('8:00 | AM');

  readonly hourDegrees = signal<number>(0);
  readonly minuteDegrees = signal<number>(0);
  readonly secondDegrees = signal<number>(0);

  ngOnInit(): void {
    timer(0, 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateClock());
  }

  private updateClock(): void {
    const now = new Date();
    this.currentTime.set(now);

    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();

    const periodValue = rawHours >= 12 ? 'PM' : 'AM';
    const displayHour12 = rawHours % 12 === 0 ? 12 : rawHours % 12;
    const formattedMin = rawMinutes.toString().padStart(2, '0');
    const formattedSec = rawSeconds.toString().padStart(2, '0');

    this.hours.set(rawHours.toString().padStart(2, '0'));
    this.minutes.set(formattedMin);
    this.seconds.set(formattedSec);
    this.period.set(periodValue);

    this.formattedTime.set(`${displayHour12}:${formattedMin} | ${periodValue}`);

    const secDeg = rawSeconds * 6;
    const minDeg = (rawMinutes + rawSeconds / 60) * 6;
    const hrDeg = ((rawHours % 12) + rawMinutes / 60 + rawSeconds / 3600) * 30;

    this.secondDegrees.set(secDeg);
    this.minuteDegrees.set(minDeg);
    this.hourDegrees.set(hrDeg);
  }
}