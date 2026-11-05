/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_MODE?: 'whatsapp' | 'internal';
  readonly VITE_DEFAULT_VARIANT?: 'neon' | 'clasica';
}
