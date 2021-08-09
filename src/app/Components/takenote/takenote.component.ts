import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserServices/user.service';
@Component({
  selector: 'app-takenote',
  templateUrl: './takenote.component.html',
  styleUrls: ['./takenote.component.scss']
})
export class TakenoteComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  noteForm:FormGroup;


  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router: Router,private userService:UserService) {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(200),Validators.minLength(1)]],
      body: ['', [Validators.maxLength(400)]]
    });
   }
  
  ngOnInit(): void {
   
  }
  response:any;
  token:any;
  
  close(){
    //console.log(this.noteForm?.value)        
     //this.messageEvent.emit(this.noteForm?.value)
    
      
     if(this.noteForm.value.title != "" && this.noteForm.value.body != "")
    {
      let reqData ={
        title: this.noteForm.get('title')?.value,
        body: this.noteForm.get('body')?.value,
        reminder: "2021-08-05T15:05:48.368Z",
        color: "white",
        isArchived: false,
        isTrash: false,
        isPin: false,
        createdDate: "2021-08-05T15:05:48.368Z",
        modifiedDate: "2021-08-05T15:05:48.368Z"

      }
      console.log(reqData);
      
      this.userService.addNote(reqData).subscribe(
        response => {
          console.log(response);
          this.reloadCurrentRoute();
          
        },
        (error)=>{
          console.log(error)
          if(error.status == 401){
            console.log("fail")
          }
        })
        
    } 
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
