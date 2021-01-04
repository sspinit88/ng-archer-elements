import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  constructor() {
  }

  simpleClone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }
}
