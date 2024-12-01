import { defer, of, MonoTypeOperatorFunction, Observable, switchMap, finalize, share, ReplaySubject } from 'rxjs';
import { tap } from "rxjs/operators";
import {StorageService} from "./storage.service";

const PENDING: Record<string, Observable<any>> = {};
const CACHE_MISS: any = Symbol('cache-miss');

export function cache<T>(
  key: string,
  storageService: StorageService, // Pass the StorageService as a parameter
): MonoTypeOperatorFunction<T> {
 
  return (source) =>
    defer(() => {
      const item = storageService.getJSONFromStorage(key, 'memory');
      if (item === null) {
        return of<T>(CACHE_MISS);
      }
      return of(item);
    }).pipe(
      switchMap((v) => {
        if (v === CACHE_MISS) {
          let pending = PENDING[key];
          if (!pending) {
            pending = source.pipe(
              tap((result) => storageService.setJSONToStorage(key, result, 'memory')),
              finalize(() => delete PENDING[key]),
              share({
                connector: () => new ReplaySubject(1),
                resetOnComplete: true,
                resetOnError: true,
                resetOnRefCountZero: true,
              })
            );
            PENDING[key] = pending;
          }
          return pending;
        }
        return of(v);
      })
    );
}
