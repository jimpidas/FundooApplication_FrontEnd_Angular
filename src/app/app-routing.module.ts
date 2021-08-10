import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { NoteComponent } from './Components/note/note.component';
import { NotesComponent } from './Components/notes/notes.component';
import { ArchieveComponent } from './Components/archieve/archieve.component';
import { ThrashComponent } from './Components/thrash/thrash.component';
//import {AuthenticationGuard} from './authGuard/authentication.guard'

const routes: Routes = [{ path: 'register', component: RegisterComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'ForgetPassword', component: ForgetPasswordComponent },
                        { path: 'Dashboard', component: DashboardComponent ,
                        children:[
                              {path:'notes',component: NotesComponent},
                              {path:'archieve',component: ArchieveComponent},
                              {path:'thrash',component:ThrashComponent}
                            
                            ]},
                       
                        { path: '', component: LoginComponent},
                        { path: 'ResetPassword/:token', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
