import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BaseUrl= environment.BaseUrl;

  constructor(private http:HttpClient) { }
  post(url: any, data : any, headers:any)
  {
    if(headers != null)
    {
    return this.http.post(this.BaseUrl + url, data,headers);
    }
    return this.http.post(this.BaseUrl + url, data);
  }

  get(url:any,headers:any)
  {
    return this.http.get(this.BaseUrl + url,headers);
  }
  put(url: any, data : any, headers:any)
  {
      return this.http.put(this.BaseUrl + url, data, headers);
  }
  delete(url: any, isHeaderRequired:any=false,headers:null){
    
      return this.http.delete(this.BaseUrl + url, isHeaderRequired && headers);
  }
}
