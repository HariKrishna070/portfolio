/**
 * Resolves a public asset path correctly for both local dev and GitHub Pages.
 * In production (base = /portfolio/), import.meta.env.BASE_URL = '/portfolio/'
 * In local dev (base = /),           import.meta.env.BASE_URL = '/'
 *
 * Usage: asset('/assets/images/hari.jpg') → '/portfolio/assets/images/hari.jpg'
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
