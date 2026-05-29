import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { Imovel } from '../../../core/models/imovel.model';

@Component({
  selector: 'app-admin-imovel-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-imovel-form.component.html',
  styleUrl: './admin-imovel-form.component.css'
})
export class AdminImovelFormComponent implements OnInit {
  @Input() id?: string;

  private adminService = inject(AdminService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isEditing = signal(false);
  saving = signal(false);
  uploadingPhotos = signal(false);
  currentImovel = signal<Imovel | null>(null);
  error = signal('');

  form = this.fb.group({
    titulo: ['', Validators.required],
    tipo: ['apartamento', Validators.required],
    finalidade: ['venda', Validators.required],
    preco: [null as number | null, Validators.required],
    condominio: [null as number | null],
    iptu: [null as number | null],
    area: [null as number | null, Validators.required],
    quartos: [1, Validators.required],
    banheiros: [1, Validators.required],
    suites: [0],
    vagas: [0],
    andar: [null as number | null],
    descricao: ['', Validators.required],
    endereco: ['', Validators.required],
    bairro: ['', Validators.required],
    cidade: ['Rio de Janeiro', Validators.required],
    estado: ['RJ', Validators.required],
    cep: [''],
    destaque: [false],
    ativo: [true]
  });

  ngOnInit(): void {
    if (this.id) {
      this.isEditing.set(true);
      this.adminService.listAll().subscribe(list => {
        const imovel = list.find(i => i.id === Number(this.id));
        if (imovel) {
          this.currentImovel.set(imovel);
          this.form.patchValue(imovel as unknown as Record<string, unknown>);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);
    this.error.set('');

    const data = this.form.value as Partial<Imovel>;
    const request$ = this.isEditing()
      ? this.adminService.update(Number(this.id), data)
      : this.adminService.create(data);

    request$.subscribe({
      next: (saved) => {
        if (this.isEditing()) {
          this.router.navigate(['/admin/imoveis']);
        } else {
          this.router.navigate(['/admin/imoveis', (saved as Imovel).id]);
        }
      },
      error: () => {
        this.error.set('Falha ao salvar. Tente novamente.');
        this.saving.set(false);
      }
    });
  }

  onPhotosSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.currentImovel()) return;

    this.uploadingPhotos.set(true);
    this.adminService.uploadPhotos(this.currentImovel()!.id, input.files).subscribe({
      next: (result) => {
        this.currentImovel.update(i => i ? { ...i, ...result } : i);
        this.uploadingPhotos.set(false);
      },
      error: () => this.uploadingPhotos.set(false)
    });
  }

  removePhoto(url: string): void {
    if (!this.currentImovel()) return;
    this.adminService.removePhoto(this.currentImovel()!.id, url).subscribe(result => {
      this.currentImovel.update(i => i ? { ...i, ...result } : i);
    });
  }

  logout(): void {
    this.auth.logout();
    window.location.href = '/admin';
  }
}
