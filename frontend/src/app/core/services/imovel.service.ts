import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Imovel, ImovelFilters, ImovelListResponse } from '../models/imovel.model';

@Injectable({ providedIn: 'root' })
export class ImovelService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  list(filters: ImovelFilters = {}): Observable<ImovelListResponse> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<ImovelListResponse>(`${this.apiUrl}/imoveis`, { params });
  }

  getById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.apiUrl}/imoveis/${id}`);
  }

  getSimilares(id: number): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.apiUrl}/imoveis/similares/${id}`);
  }

  getBairros(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/imoveis/bairros`);
  }

  getFeatured(): Observable<ImovelListResponse> {
    return this.list({ destaque: true, limit: 3 });
  }
}
