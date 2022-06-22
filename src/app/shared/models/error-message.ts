export interface BackendError {
    title?: string;
    error: Error;
}

export interface Error {
    error: InnerError;
    warnings: string[];
}

export interface InnerError {
    error: string;
    message: string,
}