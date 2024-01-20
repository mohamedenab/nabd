import { Subscription } from 'rxjs';
/*
 * AutoUnsub Decorator :  is a @ AutoUnsub  angular decorator used for
 *   auto unsubscribe for any subcription opened without the usage of
 *   ngOnDestroy hook
 *
 * @param constructor
 */
export function AutoUnsub(constructor: Function) {
  const original = constructor.prototype.ngOnDestroy;
  constructor.prototype.ngOnDestroy = function () {
    for (const prop in this) {
      const property = this[prop];
      if (property && property instanceof Subscription) {
        property.unsubscribe();
      }
    }
    original && typeof original === 'function' && original.apply(this, []);
  };
}
