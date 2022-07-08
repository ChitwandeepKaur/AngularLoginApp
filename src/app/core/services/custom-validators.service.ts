import { Injectable } from '@angular/core'
import { FormGroup }  from '@angular/forms'

@Injectable({
  providedIn: 'root'
})

export class CustomValidatorsService {

  constructor() {}

  passwordValidation(submittedForm: FormGroup){ 
    const password        = submittedForm.controls.userPassword.value,
          confirmPassword = submittedForm.controls.confirmPassword.value

    if(password == confirmPassword) return null
    else                            return { noMatch: true }
  }
}