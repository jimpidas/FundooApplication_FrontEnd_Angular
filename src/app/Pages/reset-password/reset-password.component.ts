import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormGroupDirective, NgForm, FormControl, Validators,} from '@angular/forms';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { ErrorStateMatcher, } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarConfig,} from '@angular/material/snack-bar';
import { Router, RouterStateSnapshot, ActivatedRoute, Params  } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !! (control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
} 

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  public isActive: boolean;
  public token: string;
  resetPassword:FormGroup;

  
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  constructor(private formBuilder:FormBuilder,private userSevice:UserService, private activatedRoute: ActivatedRoute,public snackBar: MatSnackBar)
     { 
      this.resetPassword = this.formBuilder.group(
        {
          password:  new FormControl('', [Validators.required, 
            Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
          ]),
          confirmPassword:  new FormControl('', [Validators.required, 
          ])
        },
          { validators: this.checkPasswords },
        );   
        this.isActive = true;
        this.token = '';
      } 
      openSnackBar(message: string, duration: number) {
        let config = new MatSnackBarConfig();
        if (duration != 0)
        {
          config.duration = duration; 
        }
        this.snackBar.open(message, undefined, config);
      }
    
      checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;
      
        return pass === confirmPass ? null : { notSame: true }
      }
      TogglePassword(){
        this.isActive = this.isActive ? false : true 
      }

  

  ngOnInit(): void {
    /*this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
      localStorage.setItem('FunDooNotesJWT', this.token);
    });*/
  }
  ResetPassword(){
    if(this.resetPassword.valid){
      this.openSnackBar('Resetting password...', 0);
      let reqData ={
        NewPassword: this.resetPassword.get('password')?.value,
        "token": this.activatedRoute.snapshot.paramMap.get("token")
      }
      
      this.userSevice.resetPassword(reqData).subscribe(
        response => {
          this.openSnackBar('Password reset successful', 2000); 
        },
        error => {
          try {
                  this.openSnackBar('Password reset failed: '+error.error.message,2000);
                   
                } catch (error) {
                  this.openSnackBar('Password reset link is invalid :'+error.error.message,0);
              }
            });
      } 
    }
  }

