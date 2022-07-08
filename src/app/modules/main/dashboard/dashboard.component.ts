import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MainService } from '../../../core/services/main.service'
import { NotificationService } from '../../../core/services/notification.service'
import { CookieStorageService } from '../../../core/services/cookie-storage.service'

@Component({
  selector   : 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls  : ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(private router              : Router,
              public mainService          : MainService,
              private notificationService : NotificationService,
              private cookieService       : CookieStorageService) {
  }
  ngOnInit(): void {}

  userData = this.mainService.userInfo

  logoutUser() {
    this.router.navigate(['/login'])
    this.cookieService.deleteCookie()
    this.notificationService.success('Log Out Successful','Message')
  }
}
