export interface BackendError {
    title?: string;
    error: Error;
}
  
export interface Error {
    warnings: string[];
    message: string;
  }