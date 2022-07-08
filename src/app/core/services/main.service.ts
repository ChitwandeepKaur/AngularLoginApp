import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor() {}

  initialUserName : string
  userObject      : any
  userInfo        : {
                      firstName       : string
                      lastName        : string
                      contactNumber   : number
                      userId          : string
                      userEmail       : string
                      userPassword    : string
                      confirmPassword : string
                      userAge         : number
                      gender          : string
                      address         : string
                      maritalStatus   : string
                      postalCode      : number
                      profilePic      : string
                    } = {
                      firstName       : '',
                      lastName        : '',
                      contactNumber   : 0,
                      userId          : '',
                      userEmail       : '',
                      userPassword    : '',
                      confirmPassword : '',
                      userAge         : 0,
                      gender          : '',
                      address         : '',
                      maritalStatus   : '',
                      postalCode      : 0,
                      profilePic      : '../../../../assets/profilePic.png',
                    }

  getInfo(username: string){
    if(localStorage.getItem(username + '_data')){
      this.userObject = JSON.parse(atob((localStorage.getItem(username + '_data'))))
        for(const userProperty in this.userObject)
        this.userInfo[userProperty] = this.userObject[userProperty]
    }
    else return undefined
  }

  setInfoById(newUserId: string){
    localStorage.setItem(newUserId + '_data', btoa(JSON.stringify(this.userInfo)))
  }

  setInfoByEmail(updatedEmail: string){
    localStorage.setItem(updatedEmail + '_data', btoa(JSON.stringify(this.userInfo)))
  }
  
}