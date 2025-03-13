import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../core/services/auth.service';
import { GlobalService } from 'src/app/demo/core/services/global.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  fullname: string = '';

  constructor(
    private authService: AuthenticationService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.fullname = this.globalService.getFullname();
    console.log('Fullname:', this.fullname); // Add this line to debug
  }

  logout() {
    this.authService.logout();
  }
}
