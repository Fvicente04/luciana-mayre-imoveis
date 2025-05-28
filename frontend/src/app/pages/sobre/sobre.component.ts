import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sobre',
  imports: [],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações sobre imóveis.')}`;

  ngOnInit(): void {
    this.title.setTitle('About me — Luciana Mayre Imóveis');
    this.meta.updateTag({
      name: 'description',
      content: 'Meet Luciana Mayre, real estate agent in Rio de Janeiro with over 10 years of experience. CRECI-RJ 086.305.'
    });
  }
}
