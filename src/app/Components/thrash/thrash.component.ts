import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserServices/user.service';
@Component({
  selector: 'app-thrash',
  templateUrl: './thrash.component.html',
  styleUrls: ['./thrash.component.scss']
})
export class ThrashComponent implements OnInit {
  notesArray:any;
  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.service.getTrashNotes().subscribe((dataReturned:any) =>{ 
      this.notesArray = dataReturned.data;
    })
  }

}
