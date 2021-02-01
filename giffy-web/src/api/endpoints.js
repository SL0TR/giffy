import config from 'config';

console.log(config);

export const apiUrl = `${config.BACKEND_ROOT_URL}/api/`;

export const authUrl = `${apiUrl}auth/`;

export const testApi = 'https://jsonplaceholder.typicode.com/posts/1';

export const loginUrl = `${authUrl}login`;

export const registerUrl = `${authUrl}register`;
