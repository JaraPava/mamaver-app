import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="fas fa-home"></i> Home Page</h1>
        <p class="page-description">Página principal del sitio web</p>
      </div>
      <div class="home-content">
        <div class="hero-section">
          <h2>Bienvenido a Admixion</h2>
          <p>Tu plataforma de gestión todo en uno</p>
          <div class="stats-grid">
            <div class="stat-card">
              <i class="fas fa-users"></i>
              <span class="number">1,247</span>
              <span class="label">Usuarios</span>
            </div>
            <div class="stat-card">
              <i class="fas fa-chart-line"></i>
              <span class="number">89%</span>
              <span class="label">Crecimiento</span>
            </div>
            <div class="stat-card">
              <i class="fas fa-star"></i>
              <span class="number">4.8</span>
              <span class="label">Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .page-header h1 { color: #333; margin-bottom: 8px; }
    .page-header h1 i { color: #667eea; margin-right: 10px; }
    .page-description { color: #6c757d; margin: 0 0 30px 0; }
    .home-content { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1); text-align: center; }
    .hero-section h2 { font-size: 2.5rem; color: #333; margin-bottom: 10px; }
    .hero-section p { font-size: 1.2rem; color: #6c757d; margin-bottom: 40px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px; }
    .stat-card { padding: 20px; background: #f8f9fa; border-radius: 8px; }
    .stat-card i { font-size: 2rem; color: #667eea; margin-bottom: 10px; }
    .stat-card .number { display: block; font-size: 2rem; font-weight: bold; color: #333; }
    .stat-card .label { color: #6c757d; font-size: 0.9rem; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
}
