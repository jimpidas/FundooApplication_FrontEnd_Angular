import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {
  updateForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private userService:UserService,private router: Router,private http: HttpClient, public dialogRef: MatDialogRef<UpdatenoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.updateForm = this.formBuilder.group({
        title: ['', [Validators.maxLength(200),Validators.minLength(1)]],
        body: ['', [Validators.maxLength(400)]]
      });
     }
   
  ngOnInit(): void {
    
  }
  close(){
    
        let reqData={
        title: this.updateForm.get('title')?.value,
        body: this.updateForm.get('body')?.value,
        reminder: "2021-08-05T15:05:48.368Z",
        color: "",
        isArchived: false,
        isTrash: false,
        isPin: false,
        createdDate: "2021-08-05T15:05:48.368Z",
        modifiedDate: "2021-08-05T15:05:48.368Z",
        notesId:this.data.notesId
        }
        console.log(reqData);
      
        this.userService.updateNote(reqData).subscribe(
          response => {
            console.log(response);
            
          },
          (error)=>{
            console.log(error)
            if(error.status == 401){
              console.log("fail")
            }
          })
          this.dialogRef.close();
          this.reloadCurrentRoute();
      
    }
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  }
  }
    
   
  

