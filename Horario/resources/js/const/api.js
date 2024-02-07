export const API_URL = 'http://localhost:8000/api';
export const API_KEY = '';
export const access_token = localStorage.getItem('access_token');
export const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
