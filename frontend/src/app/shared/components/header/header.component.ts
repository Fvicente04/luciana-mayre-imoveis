import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações sobre imóveis.')}`;

  @HostListener('document:keydown.escape')
  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }
}
