import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-site-like-button',
  standalone: true,
  templateUrl: './site-like-button.html',
  styleUrl: './site-like-button.scss',
})
export class SiteLikeButton {
  readonly count = signal(3248);
  readonly liked = signal(false);
  readonly toastVisible = signal(false);

  private readonly storageKey = 'boubaker-chieb-site-liked';
  private readonly defaultCount = 3248;
  private toastTimer?: number;

  constructor() {
    this.loadLikes();

    if (typeof window !== 'undefined') {
      this.liked.set(localStorage.getItem(this.storageKey) === 'true');
    }
  }

  async likeSite(): Promise<void> {
    if (this.liked()) {
      this.showToast('Thanks for the love ❤️');
      return;
    }

    const previousCount = this.count();
    this.liked.set(true);
    this.count.set(previousCount + 1);

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, 'true');
    }

    try {
      const response = await fetch('/api/site-likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'like' }),
      });

      if (!response.ok) {
        throw new Error('Failed to save like');
      }

      const payload = (await response.json()) as { count?: number };
      this.count.set(Number(payload.count ?? previousCount + 1));
    } catch {
      this.count.set(previousCount + 1);
    }

    this.showToast('Thanks for liking my site ✨');
  }

  formatCount(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  private async loadLikes(): Promise<void> {
    try {
      const response = await fetch('/api/site-likes', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('Failed to load likes');
      }

      const payload = (await response.json()) as { count?: number };
      this.count.set(Number(payload.count ?? this.defaultCount));
    } catch {
      this.count.set(this.defaultCount);
    }
  }

  private showToast(message: string): void {
    this.toastVisible.set(true);

    if (typeof window !== 'undefined') {
      if (this.toastTimer) {
        window.clearTimeout(this.toastTimer);
      }

      this.toastTimer = window.setTimeout(() => {
        this.toastVisible.set(false);
      }, 2200);
    }
  }
}
