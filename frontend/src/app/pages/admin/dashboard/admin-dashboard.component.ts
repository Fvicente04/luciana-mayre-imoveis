import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminService, DashboardStats, Lead } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);
  private auth = inject(AuthService);

  stats = signal<DashboardStats | null>(null);
  recentLeads = signal<Lead[]>([]);

  ngOnInit(): void {
    this.adminService.getStats().subscribe(s => this.stats.set(s));
    this.adminService.getLeads().subscribe(leads => this.recentLeads.set(leads.slice(0, 10)));
  }

  logout(): void {
    this.auth.logout();
    window.location.href = '/admin';
  }
}
