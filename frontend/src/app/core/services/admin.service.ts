import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Imovel } from '../models/imovel.model';

export interface DashboardStats {
  totalAtivos: number;
  emDestaque: number;
  leadsEsteMes: number;
}

export interface Lead {
  id: number;
  nomeContato: string;
  telefone: string;
  mensagem: string;
  imovelTitulo: string | null;
  canal: 'formulario' | 'whatsapp';
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/admin/stats`);
  }

  listAll(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.api}/admin/imoveis`);
  }

  create(data: Partial<Imovel>): Observable<Imovel> {
    return this.http.post<Imovel>(`${this.api}/admin/imoveis`, data);
  }

  update(id: number, data: Partial<Imovel>): Observable<Imovel> {
    return this.http.put<Imovel>(`${this.api}/admin/imoveis/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/admin/imoveis/${id}`);
  }

  uploadPhotos(id: number, files: FileList): Observable<{ fotos: string[]; fotoPrincipal: string }> {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('fotos', f));
    return this.http.post<{ fotos: string[]; fotoPrincipal: string }>(`${this.api}/admin/imoveis/${id}/fotos`, formData);
  }

  removePhoto(id: number, url: string): Observable<{ fotos: string[]; fotoPrincipal: string }> {
    return this.http.delete<{ fotos: string[]; fotoPrincipal: string }>(`${this.api}/admin/imoveis/${id}/fotos`, { body: { url } });
  }

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.api}/admin/leads`);
  }
}
