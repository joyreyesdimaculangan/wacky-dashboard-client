import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private route = inject(ActivatedRoute);
  currentFragment: string | null = null;
  isDropdownOpen = false;
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
    // Subscribe to fragment changes
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
