import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ImovelService } from '../../core/services/imovel.service';
import { Imovel } from '../../core/models/imovel.model';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';

interface Depoimento {
  texto: string;
  nome: string;
}

const DEPOIMENTOS: Depoimento[] = [
  { texto: 'A Luciana foi incrível durante todo o processo. Encontrou o apartamento perfeito para a nossa família em menos de um mês. Atendimento humano e sem pressão.', nome: 'Fernanda Oliveira' },
  { texto: 'Profissional exemplar. Além de encontrar o imóvel ideal, ela me orientou em cada etapa da documentação. Recomendo sem hesitar.', nome: 'Ricardo Matos' },
  { texto: 'Comprei meu primeiro apartamento com a Luciana. Ela teve uma paciência enorme com todas as minhas dúvidas e sempre foi honesta sobre os imóveis.', nome: 'Ana Paula Souza' },
  { texto: 'Alugamos nossa casa por intermédio da Luciana. Processo rápido, transparente e sem burocracia desnecessária. Voltaremos a trabalhar com ela com certeza.', nome: 'Carlos Eduardo Lima' }
];

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, PropertyCardComponent, SkeletonCardComponent],
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

  depoimentos = DEPOIMENTOS;
  activeDepoimento = signal(0);
  depoimentoAtual = computed(() => this.depoimentos[this.activeDepoimento()]);

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

  prev(): void {
    this.activeDepoimento.update(i => (i - 1 + this.depoimentos.length) % this.depoimentos.length);
  }

  next(): void {
    this.activeDepoimento.update(i => (i + 1) % this.depoimentos.length);
  }

  goTo(index: number): void {
    this.activeDepoimento.set(index);
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
