import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <h1>Configuración</h1>
        <p>Gestiona la configuración de la aplicación</p>
      </div>

      <div class="settings-content">
        <div class="settings-section">
          <h3>Configuración General</h3>
          <div class="setting-item">
            <label>Nombre de la aplicación</label>
            <input type="text" value="Malecón Mágico Veracruz" readonly>
          </div>
          <div class="setting-item">
            <label>Versión</label>
            <input type="text" value="1.0.0" readonly>
          </div>
        </div>

        <div class="settings-section">
          <h3>Configuración de Usuario</h3>
          <div class="setting-item">
            <label>Notificaciones por email</label>
            <input type="checkbox" checked>
          </div>
          <div class="setting-item">
            <label>Tema oscuro</label>
            <input type="checkbox">
          </div>
        </div>

        <div class="settings-section">
          <h3>Configuración de Seguridad</h3>
          <div class="setting-item">
            <label>Autenticación de dos factores</label>
            <input type="checkbox">
          </div>
          <div class="setting-item">
            <label>Tiempo de sesión (minutos)</label>
            <input type="number" value="60">
          </div>
        </div>

        <div class="settings-actions">
          <button class="btn btn-primary">Guardar Cambios</button>
          <button class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
    }

    .settings-header {
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

    .settings-content {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .settings-section {
      margin-bottom: 30px;

      &:last-of-type {
        margin-bottom: 0;
      }

      h3 {
        color: #333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #e9ecef;
      }
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

      label {
        font-weight: 500;
        color: #495057;
        flex: 1;
      }

      input[type="text"],
      input[type="number"] {
        width: 200px;
        padding: 8px 12px;
        border: 1px solid #ced4da;
        border-radius: 6px;
        font-size: 14px;

        &:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
        }

        &[readonly] {
          background: #f8f9fa;
          color: #6c757d;
        }
      }

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #667eea;
      }
    }

    .settings-actions {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
      display: flex;
      gap: 15px;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;

      &.btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
      }

      &.btn-secondary {
        background: #6c757d;
        color: white;

        &:hover {
          background: #5a6268;
        }
      }
    }
  `]
})
export class SettingsComponent {}
