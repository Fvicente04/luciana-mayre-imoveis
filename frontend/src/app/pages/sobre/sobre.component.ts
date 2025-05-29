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
    this.title.setTitle('Sobre mim — Luciana Mayre Imóveis');
    this.meta.updateTag({
      name: 'description',
      content: 'Conheça a Luciana Mayre, corretora de imóveis no Rio de Janeiro com mais de 10 anos de experiência. CRECI-RJ 086.305.'
    });
  }
}
