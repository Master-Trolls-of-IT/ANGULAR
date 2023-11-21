import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuctionCategory } from '~/app/shared/models/auction/auction-category.enum';
import { environment } from '~/environments/environment';
import { APIResponseInterface } from '~/app/shared/services/api/interface/APIResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private readonly APIKey: string;
  private baseURL: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.APIKey = environment.APIKey;
    this.baseURL = environment.baseURL;
    this.headers = new HttpHeaders({
      Authorization: `${this.APIKey}`,
    });
  }

  public getImageByType(
    category: AuctionCategory,
  ): Observable<APIResponseInterface> {
    const params = {
      query: this.getQueryForCategory(category),
    };

    return this.http
      .get<APIResponseInterface>(this.baseURL, {
        headers: this.headers,
        params: params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching images:', error);
          return [];
        }),
      );
  }

  private getQueryForCategory(category: AuctionCategory): string {
    switch (category) {
      case AuctionCategory.Vehicles:
        return 'vehicles';
      case AuctionCategory.Books:
        return 'books';
      case AuctionCategory.Art:
        return 'art';
    }
  }
}
