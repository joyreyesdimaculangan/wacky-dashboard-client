import { Injectable, signal } from '@angular/core';

interface AccountProfile {
  accountProfileId: string;
  accountProfileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetAccountIdService {
  accountProfileName = signal<AccountProfile | null>(null);

  setAccountProfileName(accountProfileId:string, accountProfileName: string): void {
    this.accountProfileName.set({accountProfileId, accountProfileName});
  }

  getAccountProfileName(): AccountProfile | null {
    return this.accountProfileName();
  }
}
