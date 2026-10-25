import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// BASE_PATH permette di servire il sito da un sottopercorso, ad esempio
// /serbar-react/ per l'anteprima su osharko.github.io. Con il dominio
// custom (serbar.it) resta il default "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
});
