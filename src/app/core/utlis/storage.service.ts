import { Injectable } from '@angular/core';
type AllowedDataType = {
  memory: string | number | Blob | Function | Object | boolean;
  localStorage: string;
  sessionStorage: string;
};
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static readonly memoryState = new Map<string, any>();

  /**
   * Saves key and value to storage, defaults to memory state
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * @param  {key} string Required - Key storage identifier
   * @param  {value} string Required - Value to store
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   * @return {void}  Returns void
   */
  setItem<K extends keyof AllowedDataType>(key: string, value: AllowedDataType[K], location: K): void {
    switch (location) {
      case 'memory':
        StorageService.memoryState.set(key, value);
        break;
      case 'localStorage':
        localStorage.setItem(key, value as string);
        break;
      case 'sessionStorage':
        sessionStorage.setItem(key, value as string);
        break;
    }
  }

  /**
   * Checks if key exists, defaults to memory state
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * @param  {key} string Required - Key storage identifier
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   * @return {boolean}  Returns boolean
   */
  hasItem<K extends keyof AllowedDataType>(key: string, location: K): boolean {
    switch (location) {
      case 'memory':
        return StorageService.memoryState.has(key);
      case 'localStorage':
        return localStorage.getItem(key) !== null;
      case 'sessionStorage':
        return sessionStorage.getItem(key) !== null;
      default:
        return false;
    }
  }
  /**
   * Return data if key exists and throws error if empty defaults to memory state
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * @param  {key} string Required - Key storage identifier
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   * @return {string}  Returns string
   */
  getItem<K extends keyof AllowedDataType>(key: string, location: K): AllowedDataType[K] {
    let data = '';
    let error = 'البيانات المطلوبة غير موجودة';
    switch (location) {
      case 'memory':
        if (!StorageService.memoryState.has(key)) throw new Error(error);
        data = StorageService.memoryState.get(key) || '';
        break;
      case 'localStorage':
        if (!(localStorage.getItem(key) !== null)) throw new Error(error);
        data = localStorage.getItem(key) || '';
        break;
      case 'sessionStorage':
        if (!(sessionStorage.getItem(key) !== null)) throw new Error(error);
        data = sessionStorage.getItem(key) || '';
        break;
    }
    return data;
  }

  /**
   * Delete data if key exists defaults to memory state
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * @param  {key} string Required - Key storage identifier
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   */
  deleteItem<K extends keyof AllowedDataType>(key: string, location: K): void {
    switch (location) {
      case 'memory':
        StorageService.memoryState.delete(key);
        break;
      case 'localStorage':
        localStorage.removeItem(key);
        break;
      case 'sessionStorage':
        sessionStorage.removeItem(key);
    }
  }

  /**
   * Clear all data defaults to memory state
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   */
  clear<K extends keyof AllowedDataType>(location: K): void {
    switch (location) {
      case 'memory':
        StorageService.memoryState.clear();
        break;
      case 'localStorage':
        localStorage.clear();
        break;
      case 'sessionStorage':
        sessionStorage.clear();
        break;
    }
  }

  /**
   * Retrieves a JSON object from the specified storage location
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * Automatically parses the JSON string to a JavaScript object
   * If key does not exist or any error occurs during parsing, returns null
   * @param  {key} string Required - Key storage identifier
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   * @return {T | null}  Returns the parsed object or null
   */
  getJSONFromStorage<T, K extends keyof AllowedDataType>(key: string, location: K): T | null {
    try {
      const item = this.getItem(key, location);
      return (item && typeof item === 'string') ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Saves a JSON object to the specified storage location
   * Allowed storage are : 'memory' | 'localStorage' | 'sessionStorage'
   * Automatically stringifies the JavaScript object to a JSON string
   * If any error occurs during stringification, fails silently
   * @param  {key} string Required - Key storage identifier
   * @param  {value} any Required - Object to store
   * @param  {location} string - 'memory' | 'localStorage' | 'sessionStorage'
   * @return {void}  Returns void
   */
  setJSONToStorage<K extends keyof AllowedDataType>(key: string, value: any, location: K) {
    try {
      this.setItem(key, JSON.stringify(value), location);
    } catch (error) {

    }
  }
}
