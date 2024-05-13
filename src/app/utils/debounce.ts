import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

export function Debounce(delay: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      const subjectKey = `_debounce_${key}`;
      if (!this[subjectKey]) {
        Object.defineProperty(this, subjectKey, {
          enumerable: false,
          configurable: true,
          writable: false,
          value: new Subject<any>(),
        });
        const originalFunction = originalMethod.bind(this);
        this[subjectKey].pipe(debounceTime(delay)).subscribe((...args: any[]) => {
          originalFunction(...args);
        });
      }
      (this[subjectKey] as Subject<any>).next(args);
    };
    return descriptor;
  };
}