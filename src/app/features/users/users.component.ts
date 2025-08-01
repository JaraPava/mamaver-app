import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="users-container">
      <div class="users-header">
        <h1>Gestión de Usuarios</h1>
        <button class="btn btn-primary">
          <i class="fas fa-plus"></i>
          Agregar Usuario
        </button>
      </div>

      <div class="users-table">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="badge" [ngClass]="'badge-' + user.role">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span class="badge" [ngClass]="user.active ? 'badge-success' : 'badge-danger'">
                  {{ user.active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 20px;
    }

    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      h1 {
        color: #333;
        margin: 0;
      }
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &.btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
      }

      &.btn-sm {
        padding: 4px 8px;
        font-size: 12px;
      }

      &.btn-outline-primary {
        border: 1px solid #667eea;
        color: #667eea;
        background: transparent;

        &:hover {
          background: #667eea;
          color: white;
        }
      }

      &.btn-outline-danger {
        border: 1px solid #dc3545;
        color: #dc3545;
        background: transparent;

        &:hover {
          background: #dc3545;
          color: white;
        }
      }
    }

    .users-table {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 0;

      th, td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #e9ecef;
      }

      th {
        background: #f8f9fa;
        font-weight: 600;
        color: #495057;
      }

      tbody tr:hover {
        background: #f8f9fa;
      }
    }

    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;

      &.badge-admin {
        background: #dc3545;
        color: white;
      }

      &.badge-user {
        background: #6c757d;
        color: white;
      }

      &.badge-success {
        background: #28a745;
        color: white;
      }

      &.badge-danger {
        background: #dc3545;
        color: white;
      }
    }

    .me-2 {
      margin-right: 8px;
    }
  `]
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin', active: true },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'user', active: true },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'user', active: false },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'user', active: true },
  ];
}
