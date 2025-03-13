import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestApi } from '../../core/models/rest-api';
import { TokenService } from '../../core/services/token.service';
import { AccountUser } from './report1.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private api = new RestApi();

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  getValidatorReport(startDate?: string, endDate?: string): Observable<AccountUser[]> {
    let url = `${this.api.BASE_URL}/api/accountusers/validator-report?access_token=${this.tokenService.getTokenId()}`;
  
    // Add startDate and endDate as query parameters if provided
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
  
    return this.httpClient.get<AccountUser[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching validator report:', error);
    console.error('Status code:', error.status);
    console.error('Error message:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
