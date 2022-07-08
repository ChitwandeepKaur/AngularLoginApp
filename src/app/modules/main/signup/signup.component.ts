import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CustomValidatorsService } from '../../../core/services/custom-validators.service'
import { RegexService } from '../../../core/services/regex.service'
import { NotificationService } from '../../../core/services/notification.service'
const md5 = require('md5')
 
@Component({
  selector   : 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls  : ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  constructor(private formbuilder            : FormBuilder, 
              private router                 : Router, 
              private CustomValidatorsService:CustomValidatorsService,
              private regexService           : RegexService,
              private notificationService    : NotificationService ) {}

  signUpForm  : FormGroup
  hidePassword: boolean   = true
  hideConfirm : boolean   = true

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      'firstName'      : new FormControl('', [Validators.required,
                                              Validators.pattern(this.regexService.firstName)]),
      'lastName'       : new FormControl('', [Validators.required, 
                                              Validators.pattern(this.regexService.lastName)]),
      'contactNumber'  : new FormControl('', [Validators.required]),
      'userId'         : new FormControl('', [Validators.required,
                                              Validators.pattern(this.regexService.userName)]),
      'userEmail'      : new FormControl('', [Validators.required, Validators.email]),
      'userPassword'   : new FormControl('', [Validators.required,
                                              Validators.pattern(this.regexService.passWord)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    },
    {
      validator: this.CustomValidatorsService.passwordValidation
    })
  }
  togglePassword() {
    this.hidePassword = !this.hidePassword
  }

  toggleConfirm() {
    this.hideConfirm  = !this.hideConfirm
  }

  signUpUser() {
    let userDetails   = this.signUpForm.value
    const userId      = userDetails.userId,
          userEmail   = userDetails.userEmail

    if(localStorage.getItem(userId+'_data') !== null){
      this.notificationService.error('User Id already exists','Error')
    }
    else if(localStorage.getItem(userEmail + '_data') !== null) {
      this.notificationService.error('User Email already exists','Error')
    }
    else {
      userDetails.firstName       = userDetails.firstName.trim()
      userDetails.lastName        = userDetails.lastName.trim()
      userDetails.userPassword    = md5(userDetails.userPassword)
      userDetails.confirmPassword = md5(userDetails.confirmPassword)
      userDetails.profilePic      = '../../../../assets/profilePic.png'
      userDetails.userAge         = 0
      userDetails.gender          = ''
      userDetails.address         = ''
      userDetails.maritalStatus   = ''
      userDetails.postalCode      = 0
      userDetails                 = btoa(JSON.stringify(userDetails))
      localStorage.setItem(userId + '_data', userDetails)
      localStorage.setItem(userEmail + '_data', userDetails)
      this.router.navigate(['/login'])
      this.notificationService.success('SignUp Successful!', 'Message')
    }
  }
}
