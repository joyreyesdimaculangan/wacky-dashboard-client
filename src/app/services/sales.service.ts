import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/sales';

  getSales(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
