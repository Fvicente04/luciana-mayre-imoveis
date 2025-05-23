import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LeadPayload {
  nomeContato: string;
  telefone: string;
  mensagem: string;
  imovelId?: number;
  imovelTitulo?: string;
  canal?: 'formulario' | 'whatsapp';
}

@Injectable({ providedIn: 'root' })
export class LeadService {
  private http = inject(HttpClient);

  submit(payload: LeadPayload): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.apiUrl}/leads`, payload);
  }
}
