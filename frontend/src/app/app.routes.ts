import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'imoveis',
    loadComponent: () => import('./pages/listagem/listagem.component').then(m => m.ListagemComponent)
  },
  {
    path: 'imoveis/:id/:slug',
    loadComponent: () => import('./pages/detalhe/detalhe.component').then(m => m.DetalheComponent)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.component').then(m => m.SobreComponent)
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contato.component').then(m => m.ContatoComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/imoveis',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/imoveis/admin-imoveis.component').then(m => m.AdminImoveisComponent)
  },
  {
    path: 'admin/imoveis/novo',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/imovel-form/admin-imovel-form.component').then(m => m.AdminImovelFormComponent)
  },
  {
    path: 'admin/imoveis/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/imovel-form/admin-imovel-form.component').then(m => m.AdminImovelFormComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
