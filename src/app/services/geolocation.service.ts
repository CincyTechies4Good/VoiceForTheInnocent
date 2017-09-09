import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/replaySubject';
import { Observable } from 'rxjs/observable';
@Injectable()
export class GeolocationService {
  private geolocation$ = new ReplaySubject<Position>(1);
  constructor() {
    this.init();
  }
  get geolocation(): Observable<Position> {
    return this.geolocation$.asObservable();
  }

  private init(): void {
    navigator.geolocation.getCurrentPosition(
      position => this.geolocation$.next(position),
      e => this.geolocation$.error('no geolocation')
    );
  }
}
