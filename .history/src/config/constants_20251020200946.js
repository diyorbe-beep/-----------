// Global constants and configuration
export const PHONE = '998901234567';
export const TG = 'username';
export const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
  ? 'http://localhost:4000' 
  : '';

// Payment providers
export const PAYME_MERCHANT_ID = '[PAYME_MERCHANT_ID]';
export const CLICK_MERCHANT_ID = '[CLICK_MERCHANT_ID]';

// Services catalog
export const SERVICES = {
  offline_primary: {
    label: "Birlamchi ko'rik (Offline)",
    price: 120000,
    minutes: 30
  },
  offline_follow: {
    label: "Takroriy qabul (Offline)",
    price: 90000,
    minutes: 20
  },
  online_consult: {
    label: "Online konsultatsiya (Video)",
    price: 100000,
    minutes: 25
  }
};

// Admin credentials (demo)
export const ADMIN_USER = 'admin';
export const ADMIN_PASS = 'admin123';

