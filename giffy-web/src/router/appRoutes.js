export const PUBLIC_ROUTE = {
  LANDING: '/',
  SIGN_IN: '/signin',
  ACTIVATE: '/activate/:id/:token',
  FORGET_PASSWORD: '/forgotpassword',
  RESET_PASSWORD: '/resetpassword',
};

export const PRIVATE_ROUTE = {
  DASHBOARD_HOME: '/',
  DASHBOARD: 'dashboard',
  HOME: '',
  DEMO_PAGE: 'demo',
  VID_TO_GIF_PAGE: 'vid-to-gif',
  MY_GIFS: 'my-gifs',
  ALL_GIFS: 'all-gifs',
  PARAM_ID: ':id',
};
