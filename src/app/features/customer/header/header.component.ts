import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private route = inject(ActivatedRoute);
  currentFragment: string | null = null;
  isDropdownOpen = false;

  userName: string | null = null;
  userEmail: string | null = null;
  auth = inject(AuthService);


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
    const userInfo = this.auth.getUserInfo();
    
    if (userInfo) {
      this.userName = userInfo.accountProfile?.name || userInfo.email;
      this.userEmail = userInfo.email;
    }
    

    this.route.fragment.subscribe((fragment) => {
      this.currentFragment = fragment;
    });
  }

  isActive(fragment: string): boolean {
    return this.currentFragment === fragment;
  }

  logout() {
    this.auth.logout();
  }
}
