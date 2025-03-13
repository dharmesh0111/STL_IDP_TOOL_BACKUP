import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestApi } from '../../core/models/rest-api';
import { TokenService } from '../../core/services/token.service';
import { AgingReport } from './report2.model';

@Injectable({
  providedIn: 'root'
})
export class Report2Service {
  private api = new RestApi();

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {}

  getAgingReport(stage?: string): Observable<AgingReport[]> {
    const url = `${this.api.BASE_URL}/api/accountusers/aging-report?access_token=${this.tokenService.getTokenId()}&stage=${stage || ''}`;
    return this.httpClient.get<AgingReport[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error fetching aging report:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
