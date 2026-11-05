import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import '@fontsource/big-shoulders-display/latin-700';
import '@fontsource/big-shoulders-display/latin-900';
import '@fontsource/anton/latin-400';
import '@fontsource/instrument-serif/latin-400-italic';
import './index.css';
import { App } from './App';
import { VariantProvider } from './hooks/useVariant';

const root = document.getElementById('root');
if (!root) throw new Error('Falta #root en index.html');

createRoot(root).render(
  <StrictMode>
    <VariantProvider>
      <App />
    </VariantProvider>
  </StrictMode>,
);
