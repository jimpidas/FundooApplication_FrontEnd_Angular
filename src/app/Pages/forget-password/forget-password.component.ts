import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UserService } from 'src/app/Services/UserServices/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarConfig,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  ForgetForm:FormGroup
  action: boolean = false;
  setAutoHide: boolean = false;

  constructor(private formBuilder:FormBuilder,private userSevice: UserService,public snackBar: MatSnackBar,private router: Router) {
    this.ForgetForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required])
      }
    );   

   }

  ngOnInit(): void {
  }
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }
  forget(){

    if(this.ForgetForm.valid){
     
      this.openSnackBar('processing', 0); 
      let reqData ={
        Email: this.ForgetForm.get('email')?.value,
      }
      this.userSevice.ForgetPassword(reqData).subscribe(
        (response: any) => {
          console.log(response);
          this.openSnackBar('password reset link has been sent to your registered email', 2000);
          //this.router.navigateByUrl('/ResetPassword');
        },
        error => {
            this.openSnackBar('Sending password reset link failed: '+error.error.message,2000);
        });
    } 
  }
}
