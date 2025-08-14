import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-tables',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="fas fa-table"></i> Basic Tables</h1>
        <p class="page-description">Tablas básicas y ejemplos</p>
      </div>
      <div class="tables-demo">
        <div class="table-section">
          <h3>Tabla Simple</h3>
          <table class="basic-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Juan Pérez</td>
                <td>juan@example.com</td>
                <td><span class="status active">Activo</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>María García</td>
                <td>maria@example.com</td>
                <td><span class="status inactive">Inactivo</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Carlos López</td>
                <td>carlos@example.com</td>
                <td><span class="status active">Activo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .page-header h1 { color: #333; margin-bottom: 8px; }
    .page-header h1 i { color: #667eea; margin-right: 10px; }
    .page-description { color: #6c757d; margin: 0 0 30px 0; }
    .tables-demo { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1); }
    .table-section h3 { color: #333; margin-bottom: 20px; }
    .basic-table { width: 100%; border-collapse: collapse; }
    .basic-table th, .basic-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e9ecef; }
    .basic-table th { background-color: #f8f9fa; font-weight: 600; color: #495057; }
    .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .status.active { background-color: #e8f5e9; color: #28a745; }
    .status.inactive { background-color: #ffebee; color: #dc3545; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTablesComponent {
}
