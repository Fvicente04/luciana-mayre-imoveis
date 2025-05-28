import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Imovel } from '../../../core/models/imovel.model';

@Component({
  selector: 'app-property-card',
  imports: [RouterLink, CurrencyPipe, TitleCasePipe],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input({ required: true }) imovel!: Imovel;

  isFavorited = signal(this.checkFavorited());

  private checkFavorited(): boolean {
    try {
      const favorites: number[] = JSON.parse(localStorage.getItem('favorites') ?? '[]');
      return favorites.includes(this.imovel?.id);
    } catch {
      return false;
    }
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    try {
      const favorites: number[] = JSON.parse(localStorage.getItem('favorites') ?? '[]');
      const index = favorites.indexOf(this.imovel.id);

      if (index === -1) {
        favorites.push(this.imovel.id);
        this.isFavorited.set(true);
      } else {
        favorites.splice(index, 1);
        this.isFavorited.set(false);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {
      // localStorage can be blocked in some privacy modes
    }
  }
}
