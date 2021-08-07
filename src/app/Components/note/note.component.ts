import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: any ;
  noteForm:FormGroup;
  constructor(private formBuilder:FormBuilder,public dialog: MatDialog) {
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
      // this.animal = result;
    });
  }

}
