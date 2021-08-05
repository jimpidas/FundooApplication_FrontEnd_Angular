import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-takenote',
  templateUrl: './takenote.component.html',
  styleUrls: ['./takenote.component.scss']
})
export class TakenoteComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  constructor(private http:HttpClient,private router: Router) { }
  noteForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.noteForm = new FormGroup({
      Title: new FormControl(null),
      Body: new FormControl(null),
      Reminder: new FormControl("default"),
      Color: new FormControl(null),
      isArchived: new FormControl(false),
      isTrash: new FormControl(false),
      isPin: new FormControl(false),
      UserModelID: new FormControl(0)
    });
  }
  response:any;
  token:any;
  close(){
    console.log(this.noteForm?.value)        
     this.messageEvent.emit(this.noteForm?.value)
  }
}
