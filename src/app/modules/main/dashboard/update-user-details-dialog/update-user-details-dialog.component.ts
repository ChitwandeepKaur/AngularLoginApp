import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { RegexService } from '../../../../core/services/regex.service'
import { MainService } from '../../../../core/services/main.service'
import { NotificationService } from '../../../../core/services/notification.service'
import { CookieStorageService } from '../../../../core/services/cookie-storage.service'
import { Router } from '@angular/router'
import { UtilService } from '../../../../core/services/util.service'

@Component({
  selector   : 'app-update-user-details-dialog',
  templateUrl: './update-user-details-dialog.component.html',
  styleUrls  : ['./update-user-details-dialog.component.scss']
})

export class UpdateUserDetailsDialogComponent implements OnInit {

  constructor(private formbuilder         : FormBuilder,
              private regexService        : RegexService,
              private mainService         : MainService,
              private notificationService : NotificationService,
              private cookieService       : CookieStorageService,
              private router              : Router,
              public utilService          : UtilService) {}

  updateDetailsForm  : FormGroup
  changePasswordForm : FormGroup
  userData = this.mainService.userInfo
  hide     = true
  imgSrc   = ''
  ngOnInit(): void {
    this.updateDetailsForm = this.formbuilder.group({
      'firstName'    : new FormControl(this.userData.firstName,
                                       [Validators.required, 
                                        Validators.pattern(this.regexService.firstName)]),
      'lastName'     : new FormControl(this.userData.lastName,
                                       [Validators.required,
                                        Validators.pattern(this.regexService.lastName)]),
      'contactNumber': new FormControl(this.userData.contactNumber,
                                       [Validators.required]),
      'userEmail'    : new FormControl(this.userData.userEmail,
                                       [Validators.required,
                                        Validators.email]),
      'userAge'      : new FormControl(this.userData.userAge),
      'gender'       : new FormControl(this.userData.gender),
      'address'      : new FormControl(this.userData.address),
      'postalCode'   : new FormControl(this.userData.postalCode),
      'maritalStatus': new FormControl(this.userData.maritalStatus),
      'profilePic'   : new FormControl(this.userData.profilePic)
    })
  }

  updateMaritalStatus(event: any): void {
    this.updateDetailsForm.value.maritalStatus = event.target.value
  }

  uploadImage(event): void{
    const newProfilePic = event.target.files[0]
    this.utilService.imageHandling(newProfilePic)
  }
  
  updateForm(): void {
    const oldEmail = this.mainService.userInfo.userEmail
    if(this.cookieService.getCookie() !== -1){
      if(oldEmail !== this.updateDetailsForm.value.userEmail && 
        localStorage.getItem(this.updateDetailsForm.value.userEmail + '_data') !== null){
          this.notificationService.error('User Email Already exists','Error')
      }
      else{
        for(const userProperty in this.updateDetailsForm.value){
          if(userProperty === 'profilePic'){}
          else this.mainService.userInfo[userProperty] = this.updateDetailsForm.value[userProperty]
        }
        const updatedEmail = this.mainService.userInfo.userEmail
        if(oldEmail !== updatedEmail) {
          localStorage.removeItem(oldEmail + '_data')
          this.mainService.setInfoById(this.mainService.userInfo.userId)
          this.mainService.setInfoByEmail(updatedEmail)
        } else  this.mainService.setInfoById(this.mainService.userInfo.userId)
        this.notificationService.success('Data Successfully updated','Message')
      }
    }
    else {
      this.notificationService.error('Please Refresh and Login Again','Session expired')
      this.router.navigate(['/login'])
    }
  }
}