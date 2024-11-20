import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerReviewsService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/reviews';

  getReviews() {
    return this.http.get<any>(this.apiUrl);
  }

  getReviewByID(reviewID: string) {
    return this.http.get<any>(`${this.apiUrl}/${reviewID}`);
  }

  createReview(reviewData: any) {
    return this.http.post<any>(this.apiUrl, reviewData);
  }

  updateReview(reviewID: string, reviewData: any) {
    return this.http.patch<any>(`${this.apiUrl}/${reviewID}`, reviewData);
  }

  deleteReview(reviewID: string) {
    return this.http.delete<any>(`${this.apiUrl}/${reviewID}`);
  }
}
