import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  getLoadingCheck(): Observable<boolean> {
    return this.loadingSub.asObservable();
  }
  setLoadingCheck(check: boolean): void {
    this.loadingSub.next(check)
  }
}
