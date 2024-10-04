import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentFragment: string | null = null;
  isDropdownOpen = false;

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


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to fragment changes
    this.route.fragment.subscribe((fragment) => {
      this.currentFragment = fragment;
    });
  }

  isActive(fragment: string): boolean {
    return this.currentFragment === fragment;
  }
}
