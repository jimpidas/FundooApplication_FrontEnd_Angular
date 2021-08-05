import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.opened = !this.opened
  }
  routeNotes(){
    this.router.navigateByUrl('/Dashboard/notes');
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
}
