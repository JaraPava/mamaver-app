import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="fas fa-columns"></i> Kanban</h1>
        <p class="page-description">Tablero de gestión de proyectos</p>
      </div>
      <div class="placeholder-content">
        <i class="fas fa-columns placeholder-icon"></i>
        <h3>Kanban Board</h3>
        <p>Funcionalidad de tablero Kanban en desarrollo</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container { 
      padding: 20px; 
      background: var(--theme-background);
      min-height: 100%;
    }
    .page-header h1 { 
      color: var(--theme-text-primary); 
      margin-bottom: 8px; 
      transition: color 0.3s ease;
    }
    .page-header h1 i { 
      color: var(--theme-primary); 
      margin-right: 10px; 
    }
    .page-description { 
      color: var(--theme-text-secondary); 
      margin: 0 0 30px 0; 
      transition: color 0.3s ease;
    }
    .placeholder-content { 
      text-align: center; 
      padding: 60px 20px; 
      background: var(--theme-surface); 
      border: 1px solid var(--theme-border);
      border-radius: 12px; 
      box-shadow: 0 2px 10px var(--theme-shadow);
      transition: all 0.3s ease;
    }
    .placeholder-icon { 
      font-size: 48px; 
      color: var(--theme-primary); 
      margin-bottom: 20px; 
      transition: color 0.3s ease;
    }
    .placeholder-content h3 { 
      color: var(--theme-text-primary); 
      margin-bottom: 10px; 
      transition: color 0.3s ease;
    }
    .placeholder-content p { 
      color: var(--theme-text-secondary); 
      margin: 0; 
      transition: color 0.3s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanComponent {
}
