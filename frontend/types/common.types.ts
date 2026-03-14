
export type ID = string;
export type Timestamp = string;

export enum UserRole {
  DOCTOR   = 'doctor',
  PATIENT  = 'patient',
  PHARMACY = 'pharmacy',
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}


export interface BaseDocument {
  _id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}