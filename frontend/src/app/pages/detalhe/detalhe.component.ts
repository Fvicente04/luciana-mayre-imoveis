import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title, Meta } from '@angular/platform-browser';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImovelService } from '../../core/services/imovel.service';
import { LeadService } from '../../core/services/lead.service';
import { Imovel } from '../../core/models/imovel.model';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detalhe',
  imports: [CurrencyPipe, TitleCasePipe, ReactiveFormsModule, RouterLink, PropertyCardComponent],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent implements OnInit {
  @Input() id!: string;

  private imovelService = inject(ImovelService);
  private leadService = inject(LeadService);
  private sanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);
  private title = inject(Title);
  private meta = inject(Meta);

  imovel = signal<Imovel | null>(null);
  similares = signal<Imovel[]>([]);
  loading = signal(true);
  activePhotoIndex = signal(0);
  lightboxOpen = signal(false);
  leadSubmitted = signal(false);
  leadSubmitting = signal(false);

  contactForm = this.fb.group({
    nomeContato: ['', Validators.required],
    telefone: ['', Validators.required],
    mensagem: ['Olá! Tenho interesse neste imóvel e gostaria de mais informações.']
  });

  ngOnInit(): void {
    this.imovelService.getById(Number(this.id)).subscribe({
      next: (imovel) => {
        this.imovel.set(imovel);
        this.loading.set(false);
        this.title.setTitle(`${imovel.titulo} — Luciana Mayre Imóveis`);
        this.meta.updateTag({ name: 'description', content: imovel.descricao.slice(0, 160) });
        this.imovelService.getSimilares(imovel.id).subscribe(s => this.similares.set(s));
      },
      error: () => this.loading.set(false)
    });
  }

  get mapEmbedUrl(): SafeResourceUrl | null {
    const imovel = this.imovel();
    if (!imovel) return null;
    // Google Maps embed doesn't accept exact street number for seller privacy
    const address = encodeURIComponent(`${imovel.bairro}, ${imovel.cidade}, ${imovel.estado}`);
    const url = `https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_KEY&q=${address}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get whatsappUrl(): string {
    const imovel = this.imovel();
    if (!imovel) return '';
    const price = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(imovel.preco);
    const msg = `Olá! Tenho interesse no imóvel: ${imovel.titulo} (${price}). Pode me ajudar?`;
    return `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  submitLead(): void {
    if (this.contactForm.invalid || this.leadSubmitting()) return;

    const imovel = this.imovel()!;
    this.leadSubmitting.set(true);

    this.leadService.submit({
      ...this.contactForm.value as { nomeContato: string; telefone: string; mensagem: string },
      imovelId: imovel.id,
      imovelTitulo: imovel.titulo
    }).subscribe({
      next: () => {
        this.leadSubmitted.set(true);
        this.leadSubmitting.set(false);
      },
      error: () => this.leadSubmitting.set(false)
    });
  }

  openLightbox(index: number): void {
    this.activePhotoIndex.set(index);
    this.lightboxOpen.set(true);
  }

  prevPhoto(): void {
    const photos = this.imovel()?.fotos ?? [];
    this.activePhotoIndex.update(i => (i - 1 + photos.length) % photos.length);
  }

  nextPhoto(): void {
    const photos = this.imovel()?.fotos ?? [];
    this.activePhotoIndex.update(i => (i + 1) % photos.length);
  }
}
