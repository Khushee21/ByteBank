declare module 'qrcode' {
  interface ToDataURLOptions {
    errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high';
    type?: string;
    quality?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export function toDataURL(text: string, options?: ToDataURLOptions): Promise<string>;
  export function toDataURL(text: string, callback: (err: Error | null, url: string) => void): void;
  export function toDataURL(
    text: string,
    options: ToDataURLOptions,
    callback: (err: Error | null, url: string) => void
  ): void;
}
