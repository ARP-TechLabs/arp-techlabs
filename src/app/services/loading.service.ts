import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  private requestsInProgress = 0;

  show(): void {
    this.requestsInProgress++;
    this._loading.next(true);
  }

  hide(): void {
    if (this.requestsInProgress > 0) {
      this.requestsInProgress--;
    }
    if (this.requestsInProgress === 0) {
      this._loading.next(false);
    }
  }
}
