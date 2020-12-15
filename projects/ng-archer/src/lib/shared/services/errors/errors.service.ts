import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() {
  }

  checkAndThrowError(data: unknown, message: string): void {
    if (!data) {
      throw new Error(message);
    }
  }
}
