import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: string | null = null;

  // Mock login function; replace with actual backend integration
  login(username: string, password: string): boolean {
    // Example logic; replace with actual authentication mechanism
    if (username === 'admin' && password === 'admin123') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
      return true;
    } else if (username === 'customer' && password === 'customer123') {
      this.isAuthenticated = true;
      this.userRole = 'customer';
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = null;
    // Additional logic for clearing tokens or notifying a backend
  }
}
