import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  archiveClickedFlag:boolean=false;
  @Input() note: any ;
  @Output() archiveClicked = new EventEmitter<Boolean>();
  
  noteForm:FormGroup;
  constructor(private http:HttpClient,private formBuilder:FormBuilder,public dialog: MatDialog) {
    this.noteForm = this.formBuilder.group({
      title: new FormControl(""),
      body: new FormControl(""),
      reminder: new FormControl(""),
      color: new FormControl(""),
      isArchived: new FormControl(""),
      isTrash: new FormControl(""),
      isPin: new FormControl(""),
      //UserModelID: new FormControl(null)
      createdDate: new FormControl(""),
      modifiedDate: new FormControl("")
    });
   }

  ngOnInit(): void {
  }

  archive(){
    //console.log(this.note.notesId)
    //this.deleteNote();
    //this.archiveClicked.emit(!this.archiveClickedFlag);
    this.deleteNote();
  }
 
  token:any;
  response:any;
  deleteNote(){
    this.token = localStorage.getItem("FunDooNotesJWT");
    const headers= new HttpHeaders()
    .append('Authorization',`Bearer ${this.token}`);
    this.http
            .delete(`https://localhost:44329/Notes/${this.note.notesId}`,{ 'headers': headers })
            .subscribe(res=>{        
              this.response = res
              if(this.response.success == true){         
                console.log("Note Deleted") 
               // this.reloadCurrentRoute();       
              }
            },(error)=>{
              console.log(error)
            })          
}

  openDialog(): void {
    // console.log(note)
    const dialogRef = this.dialog.open(UpdatenoteComponent, {
      panelClass: 'custom-dialog-container',
      width: '650px',
      // height:'400px',
      // data: {name: this.name, animal: this.animal}
      data: this.note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  opened = false;
toggleColorPallete(){
  this.opened = !this.opened
}

// bgColor : string = 'white';
color:any;
  receiveMessage($event: any) {
    this.color = $event
    // console.log(this.color)
  }
}
