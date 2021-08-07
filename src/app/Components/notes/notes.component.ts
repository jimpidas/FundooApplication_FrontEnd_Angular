import { AfterViewInit, Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  note: any;
  notes:any;
  token: any;
 
  
  constructor(private http:HttpClient) { }

  receiveMessage($event: any) {
    this.note = $event
      console.log(this.note)
    
  }
  ngOnInit(): void {
    this.getAllNotes();
  }
 
getAllNotes(){
  this.token = localStorage.getItem("FunDooNotesJWT");
  console.log("token"+this.token);
  const headers= new HttpHeaders()
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Authorization',`Bearer ${this.token}`);
  this.http
      .get("https://localhost:44329/Notes",{ 'headers': headers })
      .subscribe((res:any)=>{
        console.log(res);
        this.notes = res.data;
      })  
}
}
