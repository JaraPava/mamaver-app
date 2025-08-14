import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frontend-pages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="fas fa-file-alt"></i> Frontend Pages</h1>
        <p class="page-description">Páginas públicas del sitio web</p>
      </div>
      <div class="pages-grid">
        <div class="page-card">
          <i class="fas fa-home"></i>
          <h3>Landing Page</h3>
          <p>Página principal del sitio</p>
        </div>
        <div class="page-card">
          <i class="fas fa-dollar-sign"></i>
          <h3>Pricing</h3>
          <p>Planes y precios</p>
        </div>
        <div class="page-card">
          <i class="fas fa-info-circle"></i>
          <h3>About Us</h3>
          <p>Información de la empresa</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .page-header h1 { color: #333; margin-bottom: 8px; }
    .page-header h1 i { color: #667eea; margin-right: 10px; }
    .page-description { color: #6c757d; margin: 0 0 30px 0; }
    .pages-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
      gap: 20px; 
    }
    .page-card { 
      background: white; 
      padding: 30px 20px; 
      border-radius: 8px; 
      box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1); 
      text-align: center;
      transition: transform 0.2s ease;
    }
    .page-card:hover { transform: translateY(-2px); }
    .page-card i { font-size: 32px; color: #667eea; margin-bottom: 15px; }
    .page-card h3 { color: #333; margin-bottom: 10px; }
    .page-card p { color: #6c757d; margin: 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontendPagesComponent {
}
