import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import vercel from './vercel.json';

// Precarga las fuentes del hero (latin) para evitar el salto de texto al cargar.
const HERO_FONTS = [/anton-latin-400-normal.*\.woff2$/, /big-shoulders-display-latin-900-normal.*\.woff2$/, /manrope-latin-wght-normal.*\.woff2$/];

function preloadHeroFonts(): Plugin {
  return {
    name: 'preload-hero-fonts',
    apply: 'build',
    transformIndexHtml(_html, ctx) {
      const files = Object.keys(ctx.bundle ?? {}).filter((file) => HERO_FONTS.some((pattern) => pattern.test(file)));
      return files.map((file) => ({
        tag: 'link',
        attrs: { rel: 'preload', href: `./${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head',
      }));
    },
  };
}

function previewHeaders(): Record<string, string> {
  const site = vercel.headers.find((rule) => rule.source === '/(.*)');
  // HSTS y upgrade-insecure-requests no aplican a http://localhost.
  return Object.fromEntries(
    (site?.headers ?? [])
      .filter((header) => header.key !== 'Strict-Transport-Security')
      .map((header) => [header.key, header.value.replace('; upgrade-insecure-requests', '')]),
  );
}

// VITE_DEFAULT_VARIANT=clasica (en .env.production o en Vercel) publica la versión B como portada.
function defaultVariant(envValue: string | undefined): Plugin {
  const variant = envValue === 'clasica' ? 'clasica' : 'neon';
  const themeColor = variant === 'clasica' ? '#F2F0EB' : '#0A0A0D';
  return {
    name: 'default-variant',
    transformIndexHtml: (html) =>
      html
        .replace('data-variant="neon"', `data-variant="${variant}"`)
        .replace('<meta name="theme-color" content="#0A0A0D" />', `<meta name="theme-color" content="${themeColor}" />`),
  };
}

export default defineConfig(({ mode }) => ({
  base: './',
  // `npm run preview` usa las mismas cabeceras que Vercel, para probar la CSP en local.
  preview: { headers: previewHeaders() },
  // Ninguna fuente en base64: la CSP solo permite fuentes del propio dominio.
  build: { assetsInlineLimit: (file) => (/\.woff2?$/.test(file) ? false : undefined) },
  plugins: [react(), tailwindcss(), preloadHeroFonts(), defaultVariant(loadEnv(mode, '.', 'VITE_').VITE_DEFAULT_VARIANT)],
}));
