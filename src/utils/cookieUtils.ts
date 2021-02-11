export const getCookie = (name: string) => {
  const regexp = new RegExp(`${name}=([^;]+)`);
  const value = regexp.exec(document.cookie);
  return value !== null ? decodeURI(value[1]) : '';
};

export const setCookie = (name: string, value = '') => {
  const year = 3600 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${year}}`;
};
