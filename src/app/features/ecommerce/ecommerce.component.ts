import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ecommerce-container">
      <div class="page-header">
        <h1><i class="fas fa-shopping-cart"></i> eCommerce Dashboard</h1>
        <p class="page-description">Gestión de tienda en línea y ventas</p>
      </div>
      
      <div class="content-grid">
        <div class="card">
          <h3>Pedidos hoy</h3>
          <div class="metric">
            <span class="number">47</span>
            <span class="change positive">+23%</span>
          </div>
        </div>
        
        <div class="card">
          <h3>Productos vendidos</h3>
          <div class="metric">
            <span class="number">156</span>
            <span class="change positive">+18%</span>
          </div>
        </div>
        
        <div class="card">
          <h3>Carrito abandonado</h3>
          <div class="metric">
            <span class="number">23</span>
            <span class="change negative">+5%</span>
          </div>
        </div>
        
        <div class="card">
          <h3>Ventas del día</h3>
          <div class="metric">
            <span class="number">$2,847</span>
            <span class="change positive">+32%</span>
          </div>
        </div>
      </div>
      
      <div class="recent-orders">
        <h2>Pedidos Recientes</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12847</td>
                <td>Juan Pérez</td>
                <td>$127.50</td>
                <td><span class="status processing">Procesando</span></td>
              </tr>
              <tr>
                <td>#12846</td>
                <td>María García</td>
                <td>$89.99</td>
                <td><span class="status completed">Completado</span></td>
              </tr>
              <tr>
                <td>#12845</td>
                <td>Carlos López</td>
                <td>$245.00</td>
                <td><span class="status shipped">Enviado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ecommerce-container {
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
      margin-bottom: 40px;
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
    
    .recent-orders {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);
      
      h2 {
        margin: 0 0 20px 0;
        color: #333;
      }
      
      .table-container {
        overflow-x: auto;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e9ecef;
        }
        
        th {
          font-weight: 600;
          color: #495057;
          background-color: #f8f9fa;
        }
        
        .status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          
          &.processing {
            background-color: #fff3e0;
            color: #f57c00;
          }
          
          &.completed {
            background-color: #e8f5e9;
            color: #28a745;
          }
          
          &.shipped {
            background-color: #e3f2fd;
            color: #1976d2;
          }
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommerceComponent {
}
