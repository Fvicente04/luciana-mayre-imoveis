import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sobre',
  imports: [RouterLink],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Sobre mim — Luciana Mayre Imóveis');
    this.meta.updateTag({
      name: 'description',
      content: 'Conheça a Luciana Mayre, corretora de imóveis no Rio de Janeiro com mais de 10 anos de experiência. CRECI-RJ 086.305.'
    });
  }
}
