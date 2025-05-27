import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { Imovel } from '../../../core/models/imovel.model';

@Component({
  selector: 'app-admin-imoveis',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './admin-imoveis.component.html',
  styleUrl: './admin-imoveis.component.css'
})
export class AdminImoveisComponent implements OnInit {
  private adminService = inject(AdminService);
  private auth = inject(AuthService);

  imoveis = signal<Imovel[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadImoveis();
  }

  loadImoveis(): void {
    this.adminService.listAll().subscribe({
      next: (list) => {
        this.imoveis.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  toggleAtivo(imovel: Imovel): void {
    this.adminService.update(imovel.id, { ativo: !imovel.ativo }).subscribe(() => this.loadImoveis());
  }

  toggleDestaque(imovel: Imovel): void {
    this.adminService.update(imovel.id, { destaque: !imovel.destaque }).subscribe(() => this.loadImoveis());
  }

  delete(imovel: Imovel): void {
    if (!confirm(`Remove "${imovel.titulo}"?`)) return;
    this.adminService.delete(imovel.id).subscribe(() => this.loadImoveis());
  }

  logout(): void {
    this.auth.logout();
    window.location.href = '/admin';
  }
}
