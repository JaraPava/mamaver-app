import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de control de Malecón Mágico Veracruz</p>
      </div>

      <div class="dashboard-cards">
        <div class="card">
          <div class="card-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="card-content">
            <h3>Usuarios Registrados</h3>
            <p class="card-number">1,234</p>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="card-content">
            <h3>Eventos Activos</h3>
            <p class="card-number">12</p>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="card-content">
            <h3>Visitantes Hoy</h3>
            <p class="card-number">567</p>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="card-content">
            <h3>Calificación Promedio</h3>
            <p class="card-number">4.8</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }

    .dashboard-header {
      margin-bottom: 30px;

      h1 {
        color: #333;
        margin-bottom: 8px;
      }

      p {
        color: #6c757d;
        margin: 0;
      }
    }

    .dashboard-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }
    }

    .card-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
    }

    .card-content {
      flex: 1;

      h3 {
        margin: 0 0 8px 0;
        color: #333;
        font-size: 16px;
        font-weight: 600;
      }

      .card-number {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        color: #667eea;
      }
    }
  `]
})
export class DashboardComponent {}
