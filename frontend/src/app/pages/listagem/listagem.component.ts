import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ImovelService } from '../../core/services/imovel.service';
import { Imovel, ImovelFilters, TipoImovel, FinalidadeImovel } from '../../core/models/imovel.model';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-listagem',
  imports: [FormsModule, PropertyCardComponent, SkeletonCardComponent],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  private imovelService = inject(ImovelService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  properties = signal<Imovel[]>([]);
  totalProperties = signal(0);
  totalPages = signal(0);
  loading = signal(true);
  mobileFiltersOpen = signal(false);
  availableBairros = signal<string[]>([]);

  filters: ImovelFilters = {
    tipo: '',
    finalidade: '',
    quartos: undefined,
    bairro: '',
    q: '',
    page: 1,
    limit: 12
  };

  precoMaxSlider = 5000000;
  precoMaxValue = 5000000;

  tipoOptions: { value: TipoImovel | ''; label: string }[] = [
    { value: '', label: 'All types' },
    { value: 'apartamento', label: 'Apartment' },
    { value: 'casa', label: 'House' },
    { value: 'studio', label: 'Studio' },
    { value: 'comercial', label: 'Commercial' },
    { value: 'terreno', label: 'Land' }
  ];

  currentPageLabel = computed(() =>
    `Page ${this.filters.page} of ${this.totalPages()}`
  );

  ngOnInit(): void {
    this.title.setTitle('Properties — Luciana Mayre Imóveis');
    this.meta.updateTag({
      name: 'description',
      content: 'Browse apartments, houses, studios and commercial spaces for sale and rent in Rio de Janeiro.'
    });

    this.route.queryParams.subscribe(params => {
      if (params['finalidade']) this.filters.finalidade = params['finalidade'] as FinalidadeImovel;
      if (params['tipo']) this.filters.tipo = params['tipo'] as TipoImovel;
      if (params['q']) this.filters.q = params['q'];
      if (params['bairro']) this.filters.bairro = params['bairro'];
      if (params['page']) this.filters.page = Number(params['page']);
      this.fetchProperties();
    });

    this.imovelService.getBairros().subscribe(bairros => this.availableBairros.set(bairros));
  }

  fetchProperties(): void {
    this.loading.set(true);

    const activeFilters: ImovelFilters = { ...this.filters };
    if (this.precoMaxValue < this.precoMaxSlider) {
      activeFilters.precoMax = this.precoMaxValue;
    }

    this.imovelService.list(activeFilters).subscribe({
      next: ({ imoveis, total, totalPaginas }) => {
        this.properties.set(imoveis);
        this.totalProperties.set(total);
        this.totalPages.set(totalPaginas);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilters(): void {
    this.filters.page = 1;
    this.mobileFiltersOpen.set(false);
    this.syncQueryParams();
    this.fetchProperties();
  }

  goToPage(page: number): void {
    this.filters.page = page;
    this.syncQueryParams();
    this.fetchProperties();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private syncQueryParams(): void {
    const params: Record<string, string> = {};
    if (this.filters.tipo) params['tipo'] = this.filters.tipo;
    if (this.filters.finalidade) params['finalidade'] = this.filters.finalidade;
    if (this.filters.bairro) params['bairro'] = this.filters.bairro;
    if (this.filters.q) params['q'] = this.filters.q;
    if (this.filters.page && this.filters.page > 1) params['page'] = String(this.filters.page);

    this.router.navigate([], { queryParams: params, replaceUrl: true });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
  }
}
