import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilService } from '../../../core/services/util.service'
import { Router } from '@angular/router'
import { CookieStorageService } from '../../../core/services/cookie-storage.service'
import { MainService } from '../../../core/services/main.service'
import { NotificationService } from '../../../core/services/notification.service'
import { v4 as uuidv4 } from 'uuid'
import   md5 from 'md5'


@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private formBuilder         : FormBuilder, 
              private cookieService       : CookieStorageService,
              private router              : Router,
              private notificationService : NotificationService,
              private mainService         : MainService,
              private utilService         : UtilService) {}

  userInfo       : any
  loginForm      : FormGroup
  hide           : boolean   = true
  passwordMessage: string    = 'Password is required'
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'userId'       : new FormControl('', [Validators.required]),
      'userPassword' : new FormControl('', [Validators.required]),
    })
  }

  togglePassword(): void {
    this.hide = !this.hide
  }

  loginUser(): void {
    this.utilService.startService()
    const verifyUser: { userId: string; userPassword: string } = this.loginForm.value
    verifyUser.userPassword = md5(verifyUser.userPassword)
    this.mainService.getInfo(verifyUser.userId)
    if(localStorage.getItem(verifyUser.userId +'_data')) {
      if(this.mainService.userInfo.userPassword == verifyUser.userPassword)
      {
        this.cookieService.setCookie(uuidv4())
        this.router.navigate(['/dashboard'])
        this.notificationService.success('Log In Successful','Message')
      }
      else {
        this.notificationService.error('Password incorrect','Error')
      }
    }
    else {
        this.notificationService.error('User not found','Error')
    }
  }
}