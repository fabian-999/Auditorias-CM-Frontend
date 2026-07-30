export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'auditor' | 'user';
  area: string;
  activo: boolean;
  contrasenha: string;
  uid: string;
  fechaCreacion?: Date;
}

export interface CreateUserPayload {
  email: string;
  nombre: string;
  contrasenha: string;
  rol: 'admin' | 'auditor' | 'user';
  area: string;
}
