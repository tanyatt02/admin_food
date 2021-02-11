import { UserBase } from '../interfaces/main';

class Auth {
  /**
   * Authenticate an entity. Save a token string in Local Storage
   * @param {string} token
   */
  static authenticate(token: string, user: UserBase) {
    localStorage.setItem('admin-token', token);
    localStorage.setItem('admin-user', JSON.stringify(user));
  }

  /**
   * Check if a entity is authenticated - check if a token is saved in Local Storage
   * @returns {boolean}
   */
  static isAuthenticated() {
    return localStorage.getItem('admin-token') !== null;
  }

  /**
   * Deauthenticate an entity. Remove a token from Local Storage.
   */
  static deauthenticate() {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
  }

  /**
   * Get token value
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem('admin-token');
  }

  /**
   * Get current user
   * @returns {UserBase}
   */
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('admin-user') || '{}');
  }
}

export default Auth;
