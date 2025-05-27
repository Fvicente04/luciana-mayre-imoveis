import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { LeadService } from '../../core/services/lead.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contato',
  imports: [ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  private leadService = inject(LeadService);
  private fb = inject(FormBuilder);
  private title = inject(Title);
  private meta = inject(Meta);

  submitted = signal(false);
  submitting = signal(false);

  form = this.fb.group({
    nomeContato: ['', Validators.required],
    telefone: ['', Validators.required],
    mensagem: ['', Validators.required]
  });

  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações sobre imóveis.')}`;

  ngOnInit(): void {
    this.title.setTitle('Contact — Luciana Mayre Imóveis');
    this.meta.updateTag({
      name: 'description',
      content: 'Get in touch with Luciana Mayre, real estate agent in Rio de Janeiro. WhatsApp: (21) 96679-0079.'
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);

    this.leadService.submit(this.form.value as { nomeContato: string; telefone: string; mensagem: string }).subscribe({
      next: () => {
        this.submitted.set(true);
        this.submitting.set(false);
      },
      error: () => this.submitting.set(false)
    });
  }
}
