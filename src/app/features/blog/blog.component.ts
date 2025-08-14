import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><i class="fas fa-blog"></i> Blog</h1>
        <p class="page-description">Artículos y noticias del blog</p>
      </div>
      <div class="blog-grid">
        <article class="blog-card">
          <div class="blog-image">
            <i class="fas fa-image"></i>
          </div>
          <div class="blog-content">
            <h3>Tendencias de desarrollo web 2025</h3>
            <p>Las últimas tendencias en desarrollo web que debes conocer...</p>
            <div class="blog-meta">
              <span><i class="fas fa-calendar"></i> 15 Ago 2025</span>
              <span><i class="fas fa-user"></i> Admin</span>
            </div>
          </div>
        </article>
        <article class="blog-card">
          <div class="blog-image">
            <i class="fas fa-image"></i>
          </div>
          <div class="blog-content">
            <h3>Mejores prácticas en UX/UI</h3>
            <p>Consejos para crear interfaces de usuario excepcionales...</p>
            <div class="blog-meta">
              <span><i class="fas fa-calendar"></i> 12 Ago 2025</span>
              <span><i class="fas fa-user"></i> Editor</span>
            </div>
          </div>
        </article>
        <article class="blog-card">
          <div class="blog-image">
            <i class="fas fa-image"></i>
          </div>
          <div class="blog-content">
            <h3>Guía de Angular 20</h3>
            <p>Todo lo que necesitas saber sobre Angular 20...</p>
            <div class="blog-meta">
              <span><i class="fas fa-calendar"></i> 10 Ago 2025</span>
              <span><i class="fas fa-user"></i> Desarrollador</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .page-header h1 { color: #333; margin-bottom: 8px; }
    .page-header h1 i { color: #667eea; margin-right: 10px; }
    .page-description { color: #6c757d; margin: 0 0 30px 0; }
    .blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
    .blog-card { background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1); overflow: hidden; transition: transform 0.2s ease; }
    .blog-card:hover { transform: translateY(-2px); }
    .blog-image { height: 200px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; }
    .blog-image i { font-size: 3rem; color: #dee2e6; }
    .blog-content { padding: 20px; }
    .blog-content h3 { color: #333; margin-bottom: 10px; }
    .blog-content p { color: #6c757d; margin-bottom: 15px; line-height: 1.6; }
    .blog-meta { display: flex; gap: 15px; font-size: 0.85rem; color: #6c757d; }
    .blog-meta span { display: flex; align-items: center; gap: 5px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
}
