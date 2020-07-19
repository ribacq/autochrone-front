import { Injectable } from '@angular/core';

import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private names = {
    session: 'AUTOCHRONE_STORED_SESSION',
  };

  constructor() { }

  setSession(session: Session): void {
    localStorage.setItem(this.names.session, JSON.stringify(session));
  }

  getSession(): Session {
    return JSON.parse(localStorage.getItem(this.names.session)) as Session;
  }

  removeSession(): void {
    localStorage.removeItem(this.names.session);
  }
}
