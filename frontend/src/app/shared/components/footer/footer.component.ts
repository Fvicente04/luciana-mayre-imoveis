import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações sobre imóveis.')}`;
}
