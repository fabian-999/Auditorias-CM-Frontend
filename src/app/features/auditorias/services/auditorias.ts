import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Audit, CreateAuditDto, UpdateAuditDto } from '../models/auditoria.model';

@Injectable({
  providedIn: 'root',
})
export class Auditorias {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/audits`;

  // Signals para manejar el estado reactivo centralizado
  private readonly _auditorias = signal<Audit[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Readonly signals expuestas a los componentes
  readonly auditorias = this._auditorias.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  /**
   * Carga la lista inicial de auditorías y actualiza las Signals de estado.
   */
  loadAuditorias(): Observable<Audit[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<Audit[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          this._auditorias.set(data);
          this._loading.set(false);
        },
        error: (err) => {
          const message = err?.error?.message || 'Error al conectar con la API de auditorías';
          this._error.set(message);
          this._loading.set(false);
        },
      })
    );
  }

  /**
   * Obtiene la lista completa de auditorías desde el backend.
   */
  getAuditorias(): Observable<Audit[]> {
    return this.loadAuditorias();
  }

  /**
   * Crea una nueva auditoría y actualiza reactivamente la Signal del estado local.
   */
  createAuditoria(auditoria: CreateAuditDto): Observable<Audit> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<Audit>(this.apiUrl, auditoria).pipe(
      tap((newAudit) => {
        this._auditorias.update((current) => [newAudit, ...current]);
        this._loading.set(false);
      }),
      catchError((err) => {
        this._loading.set(false);
        const errorMsg = err?.error?.message || 'Error al crear la auditoría';
        this._error.set(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Actualiza una auditoría existente y refresca la Signal de estado.
   */
  updateAuditoria(id: string, auditoria: UpdateAuditDto): Observable<Audit> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<Audit>(`${this.apiUrl}/${id}`, auditoria).pipe(
      tap((updatedAudit) => {
        this._auditorias.update((current) =>
          current.map((item) => (item.id === id ? { ...item, ...updatedAudit } : item))
        );
        this._loading.set(false);
      }),
      catchError((err) => {
        this._loading.set(false);
        const errorMsg = err?.error?.message || 'Error al actualizar la auditoría';
        this._error.set(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Elimina una auditoría por id y la remueve reactivamente de la Signal.
   */
  deleteAuditoria(id: string): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._auditorias.update((current) => current.filter((item) => item.id !== id));
        this._loading.set(false);
      }),
      catchError((err) => {
        this._loading.set(false);
        const errorMsg = err?.error?.message || 'Error al eliminar la auditoría';
        this._error.set(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}