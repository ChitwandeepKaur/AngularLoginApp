import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class RegexService {

  firstName: RegExp = /\b([A-Za-z][-,a-zA-Z. ']+[ ]*)+/
  //Can start with a capital letter
  //Can have more than one word
  //atleast two letters long
  lastName : RegExp = /^[a-zA-Z]*$/
  //only alphabets
  //only one word
  userName : RegExp = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/
  //Atleast 5 letters long
  //can't have a whitespace
  passWord : RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  //6 to 16 valid characters
  //at least one number
  //at least one special character
}