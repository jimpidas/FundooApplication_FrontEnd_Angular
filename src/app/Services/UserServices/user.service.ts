import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../HttpServices/http.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  helper = new JwtHelperService();
  constructor(private httpService : HttpService) { }

  registerUser(data: any){
    
    return this.httpService.post('User/register', data,null);
  }

  login(data: any){

    return this.httpService.post('User/Login', data,null);
  }
  ForgetPassword(data: any){
    return this.httpService.post('User/ForgetPassword', data,null);
  }

  resetPassword(data: any){
   /* let headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
  
    console.log(headers);
    let options = { headers: headers };
  
      console.log(headers);*/
      return this.httpService.post('/User/ResetPassword', data,null );
    }
   /* authenticateUser(){
      const token = localStorage.getItem("FunDooNotesJWT")
      const isExpired = this.helper.isTokenExpired(token || undefined);
      return !isExpired;
    }*/

    addNote(data:any){
      let headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
  
    console.log(headers);
    let options = { headers: headers };
      return this.httpService.post('Notes', data,options );
    }

    updateNote(data:any){
      let headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
    
      console.log(headers);
      let options = { headers: headers };
        return this.httpService.put('Notes/${notesId}', data,options );
    }

    getAllNotes(){
      let headers = new HttpHeaders()
      .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
    
      console.log(headers);
      let options = { headers: headers };
        return this.httpService.get('Notes', options );
      }

     
}



