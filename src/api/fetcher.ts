import Auth from './auth';
import { MessageType } from '../interfaces/main';

async function fetch_(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (response.status === 401) {
    window.location.replace('/logout');
  }
  return response;
}

const options: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `bearer ${Auth.getToken()}`,
  },
};

export default class Fetcher {
  public static init() {
    options.headers = {
      'Content-Type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    };
  }

  public static async get(url: string, query: string = '') {
    try {
      const _options = { method: 'GET', ...options };
      const response = await fetch_(url + query, _options);
      if (response.status === 400) {
        const message = await response.json();
        message.type = MessageType.error;
        return Promise.reject(message);
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getBlob(url: string, query: string = '') {
    try {
      const _options = { 
        method: 'GET',
        responseType: 'blob',
        ...options
      };
      const response = await fetch_(url + query, _options);
      
      return await response.blob();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async post(url: string, data: object) {
    try {
      const _options = { method: 'POST', body: JSON.stringify(data), ...options };
      const response = await fetch_(url, _options);
      if (response.status === 400) {
        const message = await response.json();
        message.type = MessageType.error;
        return Promise.reject(message);
      }
      return await response.json();
    } catch(error) {
      return Promise.reject(error);
    }
  }

  public static async postFile(url: string, data: File, companyId: string = '') {
    try {
      const formData = new FormData();
      formData.append('file', data);
      formData.append('companyId', companyId);
      const _options = { method: 'POST', headers: {
        Authorization: `bearer ${Auth.getToken()}`,
      }, body: formData };
      const response = await fetch_(url, _options);
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async put(url: string, data: object) {
    try {
      const _options = { method: 'PUT', body: JSON.stringify(data), ...options };
      const response = await fetch_(url, _options);
      if (response.status === 400) {
        const message = await response.json();
        message.type = MessageType.error;
        return Promise.reject(message);
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async delete(url: string, id: string) {
    try {
      const _options = { method: 'DELETE', body: JSON.stringify({ id }), ...options };
      const response = await fetch_(url, _options);
      if (response.status === 400) {
        const message = await response.json();
        message.type = MessageType.error;
        return Promise.reject(message);
      }
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
