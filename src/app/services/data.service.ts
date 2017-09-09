import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Resource } from '../models/Resource';

@Injectable()
export class DataService {

  constructor(public http:Http) {}

  /**
   * Load resource from the static resources.json data, usually an API URL.
   * 
   * @return {Observable<Resource[]>} A list of resources.
   */
  get resources(): Observable<Resource[]> {
    //converting to getter since it has no input
    return this.http.get('assets/data/resources.json')
      .map((res => res.json()))
      .catch((error: any) => {
        return Observable.throw(error.statusText);
      });
  }
}


