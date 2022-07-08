import { Injectable }    from '@angular/core'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})

export class CookieStorageService {

  constructor(private cookieService: CookieService) {}

  setCookie(uniqueId: string){
    const expirationTime = new Date()
    expirationTime.setTime(expirationTime.getTime() + 600000)
    this.cookieService.set('session_id', uniqueId, {
      expires : expirationTime,
      sameSite: 'Strict',
      secure  : true
    })
  }
   
  deleteCookie(){
    this.cookieService.delete('session_id')
  }

  getCookie(): number{
    return document.cookie.indexOf('session_id=')
  }
}