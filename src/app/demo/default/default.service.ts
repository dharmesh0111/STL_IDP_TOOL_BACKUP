import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { RestApi } from '../../core/models/rest-api';
import { TokenService } from '../../core/services/token.service';
import { GlobalService } from '../core/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  api = new RestApi();
  constructor(
    public httpClient:HttpClient,
    public handler: HttpBackend,
    private globalService: GlobalService,
    private tokenService: TokenService) { }

  getDahshoabrdcount(): Observable<any> {
    const http = new HttpClient(this.handler);
    const location = this.globalService.getUserLocation(); // Get the location from UserLocation
    const url = `${this.api.BASE_URL}/api/invoices/dashboardcount?filter={"location":"${location}"}&&access_token=${this.tokenService.getTokenId()}`;
    return http.get<any>(url);
  }
  
  
  fetchchartdata(f_startdate:string,f_enddate:string,chartcattype:string):Observable<any>{
    
    const http = new HttpClient(this.handler);
    const url = `${this.api.BASE_URL}/api/invoices/chartdata?filter={"fromdate":"`+f_startdate+`","todate":"`+f_enddate+`","type":"`+chartcattype+`"}&&access_token=${this.tokenService.getTokenId()}`;
    return http.get<any>(url);
  }
}
