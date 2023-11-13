import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelService {

  private readonly apiUrl = 'https://api.pexels.com/v1/';

  private http = inject(HttpClient);


  public getImages(query: string, page: number, perPage: number): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: this.apiKey,
    });

    const params = {
      query: query,
      per_page: perPage.toString(),
      page: page.toString(),
    };

    return this.http.get(`${this.apiUrl}/search`, { headers, params });
  }

}
