import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarConfig} from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/UserServices/user.service';
    



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isActive: boolean;
  registerForm:FormGroup; //registerForm is a property of type FormGroup
  public notSame: boolean;
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  
  addExtraClass: boolean = false;
  
 
  constructor(private formBuilder:FormBuilder, private userSevice:UserService,public snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required,
           Validators.pattern('^[A-Z][a-z]{2,}$')
          ] ,), 
        lastName: new FormControl('', [Validators.required, 
          Validators.pattern('^[A-Z][a-z]{2,}$')
        ],),
        email: new FormControl('', [Validators.required, 
          Validators.pattern('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+.[a-zA-Z]{2,4}([.][a-zA-Z]{2,})?$')
        ]),
        password:  new FormControl('', [Validators.required, 
          Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
        ]),
        confirmPassword:  new FormControl('', [Validators.required
        ])
      },
      { validators: this.checkPasswords },
    );   
    this.isActive = true;
    this.notSame = false;
  } 
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }
   

  ngOnInit():  void{

  }

  register(){
    
    if(this.registerForm.valid){
      this.openSnackBar('Registering user...', 2000);
      let reqData ={
        firstName: this.registerForm.get('firstName')?.value,
        LastName: this.registerForm.get('lastName')?.value,
        Email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      }
      console.log(reqData);
      
      this.userSevice.registerUser(reqData).subscribe(
        response => {
          console.log(response);
          this.openSnackBar('Registration successful', 2000);      
        },
        error => {
            this.openSnackBar('Registration failed: '+error.error.message,2000);
        }
        );
    } 
  } 

    checkPasswords(group: FormGroup) {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmPassword.value;
    
      return pass === confirmPass ? null : { notSame: true } 
  }
}

