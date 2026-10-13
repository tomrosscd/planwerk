export { VERSION } from './simulation.js';
// Local preview uses the real SQLite-backed service. Production stays offline until configured.
export const API_URL = ['localhost','127.0.0.1'].includes(location.hostname) ? `${location.protocol}//${location.hostname}:8771` : '';
