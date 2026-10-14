export { VERSION } from './simulation.js';
// Local preview uses SQLite; production uses the shared Cloudflare D1 service.
export const API_URL = ['localhost','127.0.0.1'].includes(location.hostname) ? `${location.protocol}//${location.hostname}:8771` : 'https://runwerk-leaderboard.tom-26f.workers.dev';
