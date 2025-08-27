import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;

  // Landing page data
  features = [
    {
      title: 'Mensaje claro',
      description: 'Copy directo y visual que explica tu propuesta en segundos.',
      icon: 'fas fa-bullhorn'
    },
    {
      title: 'Autoridad visual',
      description: 'Marca moderna con microdetalles que proyectan confianza.',
      icon: 'fas fa-medal'
    },
    {
      title: 'Carga veloz',
      description: 'Estructura optimizada para SEO y Core Web Vitals.',
      icon: 'fas fa-rocket'
    }
  ];

  portfolioItems = [
    {
      id: 1,
      industry: 'E-commerce',
      title: 'Tienda Online Premium',
      description: 'Incremento del 150% en conversiones con diseño centrado en UX.'
    },
    {
      id: 2,
      industry: 'SaaS',
      title: 'Plataforma B2B',
      description: 'Reducción del 40% en tiempo de onboarding de usuarios.'
    },
    {
      id: 3,
      industry: 'Fintech',
      title: 'App Financiera',
      description: 'Interfaz intuitiva que aumentó la retención en 60%.'
    }
  ];

  pricingPlans = [
    {
      name: 'Start',
      price: '$0',
      description: 'Prototipo inicial',
      features: [
        'Hosting optimizado',
        'SEO base',
        'Integración de analítica',
        'Soporte por email'
      ],
      isHighlighted: false,
      buttonText: 'Comenzar Gratis'
    },
    {
      name: 'Pro',
      price: '$249',
      description: 'Para pymes exigentes',
      features: [
        'Todo lo de Start',
        'Diseño personalizado',
        'Optimización avanzada',
        'Soporte prioritario',
        'Analytics avanzado'
      ],
      isHighlighted: true,
      buttonText: 'Elegir Pro'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'A medida',
      features: [
        'Solución personalizada',
        'Integración completa',
        'Soporte 24/7',
        'Consultoría estratégica',
        'SLA garantizado'
      ],
      isHighlighted: false,
      buttonText: 'Contactar'
    }
  ];

  testimonials = [
    {
      id: 1,
      name: 'María García',
      company: 'TechStart MX',
      role: 'CEO',
      content: 'Subimos nuestra tasa de conversión en 32% gracias a una propuesta clara y un diseño que genera confianza.',
      avatar: 'M'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      company: 'Innovate Solutions',
      role: 'Director de Marketing',
      content: 'El tiempo de carga mejoró significativamente y nuestros usuarios permanecen más tiempo en el sitio.',
      avatar: 'C'
    },
    {
      id: 3,
      name: 'Ana López',
      company: 'Digital Ventures',
      role: 'Fundadora',
      content: 'Una inversión que se pagó sola en el primer mes. Recomendamos su trabajo sin dudarlo.',
      avatar: 'A'
    }
  ];

  // Contact form data
  contactForm = {
    firstName: '',
    email: '',
    company: '',
    message: ''
  };

  // Component state
  isMobileMenuOpen = false;
  isScrolled = false;
  private isBrowser = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Only add scroll listener in browser environment
    if (this.isBrowser) {
      window.addEventListener('scroll', this.onScroll.bind(this));
      
      // Smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }

  ngOnDestroy(): void {
    // Only remove event listener in browser environment
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  // Navigation methods
  scrollToSection(sectionId: string): void {
    if (this.isBrowser) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Action methods
  onGetStarted(): void {
    this.scrollToSection('contact');
  }

  onWatchDemo(): void {
    // Aquí puedes agregar lógica para mostrar un modal de demo o video
    console.log('Showing demo...');
  }

  onLogin(): void {
    // Redirigir al login del dashboard
    this.router.navigate(['/auth/login']);
  }

  onTryDemo(): void {
    // Redirigir al dashboard
    this.router.navigate(['/dashboard']);
  }

  // Pricing actions
  onSelectPlan(plan: any): void {
    if (plan.name === 'Enterprise') {
      this.scrollToSection('contact');
    } else {
      // Lógica para planes Start y Pro
      console.log(`Selected plan: ${plan.name}`);
      this.scrollToSection('contact');
    }
  }

  // Contact form methods
  onSubmitContact(): void {
    if (this.isContactFormValid()) {
      // Aquí implementarías la lógica de envío del formulario
      console.log('Contact form submitted:', this.contactForm);
      
      // Simular envío exitoso
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      this.resetContactForm();
    }
  }

  private isContactFormValid(): boolean {
    return !!(
      this.contactForm.firstName.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.company.trim() &&
      this.contactForm.message.trim()
    );
  }

  private resetContactForm(): void {
    this.contactForm = {
      firstName: '',
      email: '',
      company: '',
      message: ''
    };
  }

  // Utility methods
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  // Return to dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
