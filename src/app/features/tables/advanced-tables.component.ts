import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-tables',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="fas fa-chart-bar"></i> Advanced Tables</h1>
        <p class="page-description">Tablas avanzadas con funcionalidades</p>
      </div>
      <div class="placeholder-content">
        <i class="fas fa-chart-bar placeholder-icon"></i>
        <h3>Advanced Tables</h3>
        <p>Tablas avanzadas con filtros y sorting en desarrollo</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .page-header h1 { color: #333; margin-bottom: 8px; }
    .page-header h1 i { color: #667eea; margin-right: 10px; }
    .page-description { color: #6c757d; margin: 0 0 30px 0; }
    .placeholder-content { text-align: center; padding: 60px 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1); }
    .placeholder-icon { font-size: 48px; color: #667eea; margin-bottom: 20px; }
    .placeholder-content h3 { color: #333; margin-bottom: 10px; }
    .placeholder-content p { color: #6c757d; margin: 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedTablesComponent {
}
