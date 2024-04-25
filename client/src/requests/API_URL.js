export const DEV_API_URL = 'http://localhost:3000/api';
export const DEV_WEB_URL = 'http://localhost:3000';
export const DEV_FLASK_URL = 'http://localhost:5000';


export const PROD_API_URL = 'https://starfish-app-6mqw2.ondigitalocean.app/api';
export const PROD_WEB_URL = 'https://starfish-app-6mqw2.ondigitalocean.app';
export const PROD_FLASK_URL = 'http://localhost:5000';

const DEV = true;
export const API_URL = DEV ? DEV_API_URL : PROD_API_URL;
export const WEB_URL = DEV ? DEV_WEB_URL : PROD_WEB_URL;
export const FLASK_URL = DEV ? DEV_FLASK_URL : PROD_FLASK_URL;
