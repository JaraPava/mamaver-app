import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytical',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytical-container">
      <div class="page-header">
        <h1><i class="fas fa-globe"></i> Analytical Dashboard</h1>
        <p class="page-description">Análisis y métricas de rendimiento</p>
      </div>
      
      <div class="content-grid">
        <div class="card">
          <h3>Visitas del sitio</h3>
          <div class="metric">
            <span class="number">24,567</span>
            <span class="change positive">+12.5%</span>
          </div>
        </div>
        
        <div class="card">
          <h3>Usuarios únicos</h3>
          <div class="metric">
            <span class="number">18,239</span>
            <span class="change positive">+8.3%</span>
          </div>
        </div>
        
        <div class="card">
          <h3>Tasa de conversión</h3>
          <div class="metric">
            <span class="number">3.42%</span>
            <span class="change negative">-2.1%</span>
          </div>
        </div>
        
        <div class="card">
          <h3>Ingresos</h3>
          <div class="metric">
            <span class="number">$45,123</span>
            <span class="change positive">+15.7%</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytical-container {
      padding: 20px;
    }
    
    .page-header {
      margin-bottom: 30px;
      
      h1 {
        color: #333;
        margin-bottom: 8px;
        
        i {
          color: #667eea;
          margin-right: 10px;
        }
      }
      
      .page-description {
        color: #6c757d;
        margin: 0;
      }
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);
      
      h3 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 14px;
        font-weight: 600;
      }
      
      .metric {
        display: flex;
        align-items: center;
        gap: 10px;
        
        .number {
          font-size: 24px;
          font-weight: 700;
          color: #333;
        }
        
        .change {
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          
          &.positive {
            background-color: #e8f5e9;
            color: #28a745;
          }
          
          &.negative {
            background-color: #ffebee;
            color: #dc3545;
          }
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticalComponent {
}
