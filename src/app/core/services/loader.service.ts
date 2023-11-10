import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setLoader(value: boolean) {
    this.isLoading.next(value);
  }

  getLoader() {
    return this.isLoading.asObservable();
  }
}
