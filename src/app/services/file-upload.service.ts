import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private url = environment.apiUrl
  private http = inject(HttpClient);
  uploadImage(data: FormData) {
    return this.http.post(`${this.url}/images/upload`, data);
  }
}
