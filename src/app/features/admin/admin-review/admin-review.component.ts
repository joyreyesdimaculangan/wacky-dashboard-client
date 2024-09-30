import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DrawerComponent } from "../drawer/drawer.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [MatIconModule, CommonModule, DrawerComponent, FormsModule],
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss'],
})
export class AdminReviewComponent {
  selectedTab: 'published' | 'held' = 'published';
  selectedTags: string[] = []; 
  searchQuery: string = '';
  searchDate: string | null = null;
  
  // Example published and held reviews
  private allPublishedReviews = [
    { id: 1, name: 'John Doe', rating: 4, content: 'Great experience!', date: '2024-09-28', tags: ['Experience', 'Staff'] },
    { id: 2, name: 'Jane Smith', rating: 5, content: 'Excellent quality!', date: '2024-09-29', tags: ['Food', 'Price'] },
  ];

  private allHeldReviews = [
    { id: 3, name: 'Charlie', rating: 3.5, content: 'Good value, but...', date: '2024-09-28', tags: ['Food', 'Location'] },
    { id: 4, name: 'Dave', rating: 2, content: 'Could be better', date: '2024-09-27', tags: ['Price'] },
  ];

  publishedReviews = [...this.allPublishedReviews];
  heldReviews = [...this.allHeldReviews];

  // Method to switch tabs
  selectTab(tab: 'published' | 'held') {
    this.selectedTab = tab;
    this.filterReviews(); // Filter reviews when tab changes
  }

  // Function to delete a review
  deleteReview(id: number) {
    if (this.selectedTab === 'published') {
      this.allPublishedReviews = this.allPublishedReviews.filter(review => review.id !== id);
    } else {
      this.allHeldReviews = this.allHeldReviews.filter(review => review.id !== id);
    }
    this.filterReviews(); // Re-filter after deletion
  }

  // Method to approve a review from the "held for review" section
  approveReview(id: number) {
    const review = this.allHeldReviews.find(review => review.id === id);
    if (review) {
      this.allHeldReviews = this.allHeldReviews.filter(review => review.id !== id);
      this.allPublishedReviews.push(review);
      this.filterReviews(); // Update filter after approval
    }
  }

  // Method to toggle tag selection
  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag); // Add tag if not selected
    } else {
      this.selectedTags.splice(index, 1); // Remove tag if already selected
    }
    this.filterReviews(); // Call to filter reviews based on selected tags
  }

  // Method to filter reviews based on selected tags and search query
  filterReviews() {
    let reviewsToFilter = this.selectedTab === 'published' ? [...this.allPublishedReviews] : [...this.allHeldReviews];

    // Filter by selected tags
    if (this.selectedTags.length > 0) {
      reviewsToFilter = reviewsToFilter.filter(review => 
        this.selectedTags.some(tag => review.tags.includes(tag))
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      const queryLower = this.searchQuery.toLowerCase();
      reviewsToFilter = reviewsToFilter.filter(review =>
        review.name.toLowerCase().includes(queryLower) ||
        review.content.toLowerCase().includes(queryLower)
      );
    }

     // Filter by date search
    if (this.searchDate) {
      const inputDate = new Date(this.searchDate).toISOString().split('T')[0]; // Convert input date to 'YYYY-MM-DD' format
      reviewsToFilter = reviewsToFilter.filter(review => {
        const reviewDate = new Date(review.date).toISOString().split('T')[0]; // Convert review date to 'YYYY-MM-DD' format
        return reviewDate === inputDate; // Compare dates
      });
    }

    // Assign filtered reviews to the correct property
    if (this.selectedTab === 'published') {
      this.publishedReviews = reviewsToFilter;
    } else {
      this.heldReviews = reviewsToFilter;
    }

    // Log final filtered reviews for debugging
    console.log("Filtered Reviews:", reviewsToFilter);
  }

  resetSearch(): void {
    this.searchQuery = '';
    this.searchDate = null;
    this.filterReviews(); // Optionally, call filterReviews to refresh the reviews
  }

}
