import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieStorageService } from '../services/cookie-storage.service';
import { Router } from '@angular/router'
import { NotificationService } from '../services/notification.service'

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {

  constructor(private cookieService: CookieStorageService,
              private router       : Router,
              private notification : NotificationService){}

  canActivate(): boolean{
    if(this.cookieService.getCookie() !== -1) return true
    else {
      this.router.navigate(['/login'])
      this.notification.error('Login to access this URL','Unauthorized')
      return false
    }
  }
}
