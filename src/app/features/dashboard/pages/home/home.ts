import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Auditorias } from '../../auditorias/services/auditorias';
import { Audit } from '../../auditorias/models/auditoria.model';

interface Slide {
  title: string;
  description: string;
  tag: string;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  currentIndex = 0;

  private auditoriasService = inject(Auditorias);

  slides: Slide[] = [
    {
      title: 'Gestión de auditorías más clara',
      description: 'Monitorea los procesos clave con una vista moderna y profesional para tu equipo.',
      tag: 'Gestión',
      src: '/imagenes/Gemini_Generated_Image_gapqvzgapqvzgapq%20(1).png',
      alt: 'Pantalla de auditorías profesionales',
    },
    {
      title: 'Documentos y evidencia disponibles',
      description: 'Carga y organiza la evidencia en un espacio limpio sin perder el control.',
      tag: 'Evidencia',
      src: '/imagenes/imagen%20petrista.jpeg',
      alt: 'Vista de documento y auditoría',
    },
  ];

  get currentSlide(): Slide {
    return this.slides[this.currentIndex];
  }

  get auditorias(): Audit[] {
    return this.auditoriasService.auditorias();
  }

  get activeCount(): number {
    return this.auditorias.filter((audit) => audit.status !== 'closed').length;
  }

  get pendingReports(): number {
    return this.auditorias.filter((audit) => audit.status === 'in_progress').length;
  }

  get totalCount(): number {
    return this.auditorias.length;
  }

  get recentAuditorias(): Audit[] {
    return [...this.auditorias]
      .sort((a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at)))
      .slice(0, 3);
  }

  get hasAuditorias(): boolean {
    return this.auditorias.length > 0;
  }

  get loading(): boolean {
    return this.auditoriasService.loading();
  }

  get error(): string | null {
    return this.auditoriasService.error();
  }

  ngOnInit(): void {
    this.auditoriasService.loadAuditorias().subscribe({
      error: (err) => console.error('Error al cargar auditorías en Home:', err),
    });

    setInterval(() => this.nextSlide(), 8000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex + this.slides.length - 1) % this.slides.length;
  }

  selectSlide(index: number): void {
    this.currentIndex = index;
  }
}
