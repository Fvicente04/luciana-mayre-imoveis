import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  imports: [],
  template: `
    <div class="skeleton-card">
      <div class="sk-image"></div>
      <div class="sk-body">
        <div class="sk-line sk-price"></div>
        <div class="sk-line sk-title"></div>
        <div class="sk-meta">
          <div class="sk-line sk-chip"></div>
          <div class="sk-line sk-chip"></div>
          <div class="sk-line sk-chip"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      background: var(--color-bg-card);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .sk-image {
      aspect-ratio: 4 / 3;
      background: var(--color-primary-light);
      animation: pulse 1.4s ease-in-out infinite;
    }

    .sk-body {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .sk-line {
      border-radius: var(--radius-sm);
      background: var(--color-primary-light);
      animation: pulse 1.4s ease-in-out infinite;
    }

    .sk-price { height: 1.25rem; width: 55%; }
    .sk-title { height: 0.875rem; width: 75%; }
    .sk-meta { display: flex; gap: 0.75rem; }
    .sk-chip { height: 0.75rem; width: 40px; }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `]
})
export class SkeletonCardComponent {}
