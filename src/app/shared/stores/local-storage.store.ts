import { BehaviorSubject } from 'rxjs';

export class LocalStorageSubject<T> extends BehaviorSubject<T> {
  constructor(
    private storageKey: string,
    defaultValue: T,
    listenToChange = false,
  ) {
    const storageValue = localStorage.getItem(storageKey);
    if (storageValue === null) {
      localStorage.setItem(storageKey, JSON.stringify(defaultValue));
    }
    const value: T =
      storageValue !== null ? JSON.parse(storageValue) : defaultValue;
    if (listenToChange) {
      window.addEventListener('storage', () => {
        const storageValue = localStorage.getItem(storageKey);
        if (storageValue !== null) {
          const value: T = JSON.parse(storageValue);
          this.next(value);
        }
      });
    }
    super(value);
  }

  override next(value: T): void {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
    super.next(value);
  }
}
