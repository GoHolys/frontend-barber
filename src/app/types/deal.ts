export interface DealFormState<T> {
  errors?: StringMap ;
  successMessage?: string;
  data?: T;
}

export interface StringMap {
  [key: string]: string;
}
