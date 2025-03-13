import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private realm: string = localStorage.getItem('realm') || '';
  private userLocation: string = localStorage.getItem('userLocation') || '';
  private userId: string = localStorage.getItem('userId') || '';
  private fullname: string = localStorage.getItem('fullname') || '';

  // Set the realm
  setRealm(value: string): void {
    this.realm = value;
    localStorage.setItem('realm', value);
  }

  // Get the realm
  getRealm(): string {
    return localStorage.getItem('realm') || '';
  }

  // Set the user ID
  setUserId(id: string): void {
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  // Get the user ID
  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  // Set the user location
  setUserLocation(location: string): void {
    this.userLocation = location;
    localStorage.setItem('userLocation', location);
  }

  // Get the user location
  getUserLocation(): string {
    return localStorage.getItem('userLocation') || '';
  }

  // Get the fullname
  getFullname(): string {
    return localStorage.getItem('fullname') || this.fullname;
  }

  // Set the fullname
  setFullname(value: string): void {
    this.fullname = value;
    localStorage.setItem('fullname', value);
  }
}
