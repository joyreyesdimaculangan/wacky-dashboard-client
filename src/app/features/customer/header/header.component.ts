import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { GetAccountIdService } from '../reservation-form/getAccountId.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly getAccountNameService = inject(GetAccountIdService);
  private route = inject(ActivatedRoute);
  authService = inject(AuthService);
  currentFragment: string | null = null;
  isDropdownOpen = false;

  accountProfileName: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  auth = inject(AuthService);
  router = inject(Router);

  userRole: string | null = null;

  toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.getElementById('user-menu-button');
    
    // Close the dropdown if the click is outside the dropdown and the button
    if (!dropdownButton?.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit() {
    this.userRole = this.auth.getUserRole();
    const userInfo = this.auth.getUserInfo();
    
    if (userInfo) {
      const accountProfileName = this.getAccountNameService.getAccountProfileName();
      this.accountProfileName = accountProfileName?.accountProfileName ?? null;
      this.userEmail = userInfo.email;
    }
    
    this.route.fragment.subscribe((fragment) => {
      this.currentFragment = fragment;
    });
  }

  isActive(fragment: string): boolean {
    return this.currentFragment === fragment;
  }

  signIn() {
    this.router.navigate(['/login']);
  } 

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }
}
