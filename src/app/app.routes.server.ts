import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Todas las páginas se prerenderizan al compilar: cada ruta queda como un HTML estático con su
 * title, description, canonical y contenido, así Google la ve completa sin ejecutar JavaScript.
 */
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
