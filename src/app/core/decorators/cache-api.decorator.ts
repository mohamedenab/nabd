// cache.decorator.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  has(key: string): boolean {
    return key in this.cache;
  }

  get(key: string): any {
    return this.cache[key];
  }

  set(key: string, value: any): void {
    this.cache[key] = value;
  }

  clear(): void {
    this.cache = {};
  }
}

export function Cacheable(cacheKey?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cacheService = new CacheService();

    descriptor.value = function (...args: any[]) {
      const key = cacheKey || propertyKey;

      if (cacheService.has(key)) {
        return cacheService.get(key);
      }

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result.then((data: any) => {
          cacheService.set(key, data);
          return data;
        });
      } else {
        cacheService.set(key, result);
        return result;
      }
    };

    return descriptor;
  };
}
