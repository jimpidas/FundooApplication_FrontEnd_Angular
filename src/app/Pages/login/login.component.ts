import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,} from '@angular/forms';
import { UserService } from 'src/app/Services/UserServices/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isActive: boolean;
  loginForm:FormGroup
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private formBuilder:FormBuilder,private userSevice:UserService, public snackBar: MatSnackBar, private route: Router) {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required]),
        password:  new FormControl('', [Validators.required]),}
    );   
    this.isActive = true;
   }

  ngOnInit(): void {
  }

  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  login(){

    if(this.loginForm.valid){
      this.openSnackBar('Loggin in...', 1000);
      let reqData ={
        Email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.userSevice.login(reqData).subscribe(
        (response: any) => {
          localStorage.setItem('FunDooNotesJWT', response['token']);
          //this.openSnackBar('Login success', 2000);
          this.route.navigateByUrl('/Dashboard');
        },
        error => {
              this.openSnackBar('Login failed: '+error.error.message,2000);
        });
    } 
  }

}
