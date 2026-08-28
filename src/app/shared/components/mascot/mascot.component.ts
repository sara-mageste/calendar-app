import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mascot.component.html',
  styleUrl: './mascot.component.css'
})
export class MascotComponent {
  readonly mood = signal<'happy' | 'sleepy' | 'playful'>('happy');
  readonly message = signal<string>('Miau! Bem-vindo ao seu calendário!');

  onInteract(): void {
    const moods: ('happy' | 'sleepy' | 'playful')[] = ['happy', 'sleepy', 'playful'];
    const messages = [
      'Purrrr! Tenha um ótimo dia!',
      'Zzz... hora da soneca...',
      'Vamos organizar suas tarefas!'
    ];

    const randomIndex = Math.floor(Math.random() * moods.length);
    this.mood.set(moods[randomIndex]);
    this.message.set(messages[randomIndex]);
  }
}
