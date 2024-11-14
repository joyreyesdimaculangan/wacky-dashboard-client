import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAccountIdService {
  accountProfileId = signal<string | null>(null);

  setAccountProfileId(accountProfileId: string): void {
    this.accountProfileId.set(accountProfileId);
  }

  setAccountProfileName(accountProfileName: string): void {
    this.accountProfileId.set(accountProfileName);
  }

  getAccountProfileName(): string | null {
    return this.accountProfileId();
  }

  getAccountProfileId(): string | null {
    return this.accountProfileId();
  }
}
