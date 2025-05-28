import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ImovelService } from '../../core/services/imovel.service';
import { Imovel } from '../../core/models/imovel.model';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-home',
  imports: [FormsModule, PropertyCardComponent, SkeletonCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private imovelService = inject(ImovelService);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  featuredProperties = signal<Imovel[]>([]);
  loadingFeatured = signal(true);

  searchTerm = '';
  searchFinalidade = 'compra';

  ngOnInit(): void {
    this.title.setTitle('Luciana Mayre Imóveis — Corretora de Imóveis no Rio de Janeiro');
    this.meta.updateTag({
      name: 'description',
      content: 'Encontre o imóvel ideal no Rio de Janeiro com atendimento personalizado. Apartamentos, casas e imóveis comerciais para compra e aluguel. CRECI-RJ 086.305.'
    });

    this.imovelService.list({ destaque: true, limit: 3 }).subscribe({
      next: ({ imoveis }) => {
        this.featuredProperties.set(imoveis);
        this.loadingFeatured.set(false);
      },
      error: () => this.loadingFeatured.set(false)
    });
  }

  onSearch(): void {
    this.router.navigate(['/imoveis'], {
      queryParams: {
        finalidade: this.searchFinalidade === 'compra' ? 'venda' : 'aluguel',
        q: this.searchTerm || undefined
      }
    });
  }
}
