import config from 'config';

console.log(config);

export const apiUrl = `${config.BACKEND_ROOT_URL}/api/`;

export const authUrl = `${apiUrl}auth/`;

export const testApi = 'https://jsonplaceholder.typicode.com/posts/1';

export const loginUrl = `${authUrl}login`;

export const registerUrl = `${authUrl}register`;

export const gifUrl = `${apiUrl}gif`;

export const getAllgifUrl = `${apiUrl}gif/all`;

export const gifUploadUrl = 'https://api.cloudinary.com/v1_1/sl0tr/upload';
