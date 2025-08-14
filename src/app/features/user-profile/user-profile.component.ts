import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>
          <i class="fas fa-user"></i> User Profile
          <span class="new-badge">New</span>
        </h1>
        <p class="page-description">Perfil y configuración de usuario</p>
      </div>
      <div class="placeholder-content">
        <i class="fas fa-user placeholder-icon"></i>
        <h3>User Profile</h3>
        <p>Funcionalidad de perfil de usuario en desarrollo</p>
        <div class="new-feature-note">
          <i class="fas fa-star"></i>
          <span>Nueva funcionalidad disponible</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .page-header h1 { color: #333; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
    .page-header h1 i { color: #667eea; }
    .new-badge { 
      background-color: #ff9800; 
      color: white; 
      padding: 2px 8px; 
      border-radius: 10px; 
      font-size: 10px; 
      font-weight: 600; 
      text-transform: uppercase; 
      letter-spacing: 0.5px;
    }
    .page-description { color: #6c757d; margin: 0 0 30px 0; }
    .placeholder-content { text-align: center; padding: 60px 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1); }
    .placeholder-icon { font-size: 48px; color: #667eea; margin-bottom: 20px; }
    .placeholder-content h3 { color: #333; margin-bottom: 10px; }
    .placeholder-content p { color: #6c757d; margin: 0 0 20px 0; }
    .new-feature-note { 
      display: inline-flex; 
      align-items: center; 
      gap: 8px; 
      background-color: #fff3e0; 
      color: #f57c00; 
      padding: 8px 16px; 
      border-radius: 20px; 
      font-size: 14px; 
      font-weight: 500;
    }
    .new-feature-note i { color: #ff9800; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
}
