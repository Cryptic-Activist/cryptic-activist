import { SetCookieParams } from './types';

export const copyToClipboard = (text?: string | `0x${string}`) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
};

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLocalStorage = (key: string) => localStorage.getItem(key);

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const getCurrentPath = () => {
  return window.location.href;
};

export const getCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
};

export const setCookie = ({
  name,
  value,
  path,
  expiresInHours,
  domain,
}: SetCookieParams) => {
  let expiresLocal;

  if (expiresInHours) {
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + expiresInHours * 60 * 60 * 1000
    );
    expiresLocal = expiresInHours ? `expires=${expirationDate};` : '';
  }

  const pathLocal = path ? `path=${path};` : '';
  const domainLocal = domain ? `domain=${domain};` : '';

  return (document.cookie = `${name}=${value}; ${
    expiresLocal ?? ''
  } ${pathLocal} ${domainLocal} secure; samesite`);
};

export const removeCookie = (name: string, path: string = '/') =>
  (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`);
