import { Injectable }   from '@angular/core'
import imageCompression from 'browser-image-compression'
import { environment }  from '../../../environments/environment'
import { HttpClient }   from '@angular/common/http'
import { MainService }  from '../../core/services/main.service'
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(private httpService : HttpClient,
              private mainService: MainService) {}

  base64coded : string
  chunkSize   : number = environment.max_img_upload_chunk_size * 1000000
  newFileName : string
  offset      : number = 0
  serverAPI   : string = environment.ap_nodeServerUrl + environment.API_PATH
  getUrlAPI   : string = environment.ap_nodeServerUrl + environment.GET_URL_PATH
  uploadingStatus : boolean = false
  imgSrc : string
  chunkData : {
                fileName    : string
                fileData    : string
                totalChunks : number
                chunkIndex  : number
              } = {
                fileName    : '',
                fileData    : '',
                totalChunks : 0,
                chunkIndex  : 0
              }
  fileNameBody : {
                fileName    : string
              } = {
                fileName    : ''
              }

  startService(){
    this.imgSrc= '../../../../assets/profilePic.png'
    this.mainService.userInfo.profilePic = this.imgSrc
    this.uploadingStatus = false
  }

  async imageHandling(newProfilePic: File){
    this.newFileName = newProfilePic.name.split('.')[0] + '_' + uuidv4() + '.' + 
                       newProfilePic.name.split('.')[1]

    Object.defineProperty(newProfilePic, 'name', {
      writable: true,
      value : this.newFileName
    })

    this.base64coded = await imageCompression.getDataUrlFromFile(newProfilePic)
    this.base64coded = this.base64coded.split(',')[1]

    const noOfChunks = Math.ceil(this.base64coded.length/ this.chunkSize)
    let chunkIndex   = 0

    this.chunkData.fileName    = newProfilePic.name
    this.chunkData.totalChunks = noOfChunks
    this.chunkData.chunkIndex  = chunkIndex
    this.chunkData.fileData    = this.base64coded.slice(this.offset, this.offset + this.chunkSize)

    this.sendRequest(this.chunkData.chunkIndex,this.chunkData.fileData, noOfChunks)
  }

  async sendRequest(chunkIndex: number, fileData:string, noOfChunks: number){
    
    this.chunkData.chunkIndex = chunkIndex
    this.chunkData.fileData   = fileData

    await this.httpService.post(this.serverAPI,this.chunkData).subscribe(()=>{
      this.offset += this.chunkSize
      if(this.chunkData.chunkIndex + 1 === noOfChunks){
        this.offset = 0
        this.chunkData.chunkIndex = 0
        this.getUrl()
      }
      else{ 
      chunkIndex++
      fileData = this.base64coded.slice(this.offset, this.offset + this.chunkSize)
      this.sendRequest(chunkIndex, fileData, noOfChunks)
      }
      
    })
    
  }

  async getUrl(){
    this.fileNameBody.fileName = this.newFileName

    await this.httpService.post(this.getUrlAPI,this.fileNameBody).subscribe((data)=>{
      this.imgSrc = data["data"].response.url
      this.mainService.userInfo.profilePic = this.imgSrc
      localStorage.removeItem(this.mainService.userInfo.userId)
      this.mainService.setInfoById(this.mainService.userInfo.userId)
      this.mainService.getInfo(this.mainService.userInfo.userId)
      
      this.uploadingStatus = true 
    })
  }
}