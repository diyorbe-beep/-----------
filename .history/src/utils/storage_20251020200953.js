// LocalStorage utilities
export const getToken = () => {
  try {
    return localStorage.getItem('adm_token') || '';
  } catch (e) {
    return '';
  }
};

export const setToken = (token) => {
  try {
    localStorage.setItem('adm_token', token || '');
  } catch (e) {
    console.error('Failed to set token', e);
  }
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { 'Authorization': 'Bearer ' + token } : {};
};

export const isAdminAuthenticated = () => {
  try {
    return localStorage.getItem('adm_auth') === '1';
  } catch (e) {
    return false;
  }
};

export const setAdminAuth = (value) => {
  try {
    if (value) {
      localStorage.setItem('adm_auth', '1');
    } else {
      localStorage.removeItem('adm_auth');
    }
  } catch (e) {
    console.error('Failed to set admin auth', e);
  }
};

export const getAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem('appts') || '[]');
  } catch (e) {
    return [];
  }
};

export const saveAppointments = (appts) => {
  try {
    localStorage.setItem('appts', JSON.stringify(appts));
  } catch (e) {
    console.error('Failed to save appointments', e);
  }
};

export const getPayments = () => {
  try {
    return JSON.parse(localStorage.getItem('payments') || '[]');
  } catch (e) {
    return [];
  }
};

export const savePayments = (payments) => {
  try {
    localStorage.setItem('payments', JSON.stringify(payments));
  } catch (e) {
    console.error('Failed to save payments', e);
  }
};

export const getServicesPrices = () => {
  try {
    return JSON.parse(localStorage.getItem('services_prices') || 'null');
  } catch (e) {
    return null;
  }
};

export const saveServicesPrices = (prices) => {
  try {
    localStorage.setItem('services_prices', JSON.stringify(prices));
  } catch (e) {
    console.error('Failed to save prices', e);
  }
};

