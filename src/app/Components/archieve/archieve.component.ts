import { Component, OnInit,Input } from '@angular/core';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.scss']
})
export class ArchieveComponent implements OnInit {
  @Input() note:any ;
  token:any;
  
  notesArray:any;
  constructor(private service:UserService,private http:HttpClient) { }
 
  ngOnInit(): void {
    this.getArchieveNotes();  
  }
  getArchieveNotes(){
    this.token = localStorage.getItem("FunDooNotesJWT");
    console.log("token"+this.token);
    const headers= new HttpHeaders()
    .append('content-type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization',`Bearer ${this.token}`);
    this.http
        .get("https://localhost:44329/Notes/Archieve",{ 'headers': headers })
        .subscribe((res:any)=>{
          console.log(res);
          this.notesArray = res.data;
        })  
  }
  
}
