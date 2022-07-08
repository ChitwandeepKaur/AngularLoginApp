import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { RegexService } from '../../../../core/services/regex.service'
import { CustomValidatorsService } from '../../../../core/services/custom-validators.service'
import { MainService } from '../../../../core/services/main.service'
import { NotificationService } from '../../../../core/services/notification.service'
import   md5 from 'md5'

@Component({
  selector   : 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls  : ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

  constructor(private formbuilder             : FormBuilder,
              private regexService            : RegexService,
              private customValidatorsService : CustomValidatorsService,
              private mainService             : MainService,
              private notificationService     : NotificationService) {}

  changePasswordForm  : FormGroup
  hideOldPassword     : boolean   = true
  hideNewPassword     : boolean   = true
  hideConfirmPassword : boolean   = true

  ngOnInit(): void {
    this.changePasswordForm = this.formbuilder.group({
      'oldPassword'     : new FormControl('', [Validators.required,
                                               Validators.pattern(this.regexService.passWord)]),
      'userPassword'    : new FormControl('', [Validators.required,
                                               Validators.pattern(this.regexService.passWord)]),
      'confirmPassword' : new FormControl('', [Validators.required,
                                               Validators.pattern(this.regexService.passWord)]),
    },
    {
      validator: this.customValidatorsService.passwordValidation
    })
  }

  changePassword(){

    if(md5(this.changePasswordForm.value.oldPassword) === this.mainService.userInfo.userPassword){
      this.mainService.userInfo.userPassword = md5(this.changePasswordForm.value.userPassword)
      this.mainService.userInfo.confirmPassword = md5(this.changePasswordForm.value.confirmPassword)
      this.mainService.setInfoById(this.mainService.userInfo.userId)
      this.mainService.setInfoByEmail(this.mainService.userInfo.userEmail)
      this.notificationService.success('Password Changed Successfully','Message')
    } 
    else
      this.notificationService.error('Please Enter Your Old Password Correctly','Error')
  }
  toggleConfirmPassword(){
    this.hideConfirmPassword = !this.hideConfirmPassword
  }
  toggleNewPassword(){
    this.hideNewPassword     = !this.hideNewPassword
  }
  togglePassword(){
    this.hideOldPassword     = !this.hideOldPassword
  }  
}
