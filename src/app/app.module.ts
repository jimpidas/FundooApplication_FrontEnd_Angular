import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LabelComponent } from './Components/label/label.component';
import { RegisterComponent } from './Pages/register/register.component';
import {  MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Pages/login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NoteComponent } from './Components/note/note.component';
import { NotesComponent } from './Components/notes/notes.component';
import { TakenoteComponent } from './Components/takenote/takenote.component';
import { UpdatenoteComponent } from './Components/updatenote/updatenote.component';
import { MatDialogModule } from '@angular/material/dialog';
//import { AuthenticationGuard } from '../app/authGuard/authentication.guard';
@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    ResetPasswordComponent,
    NoteComponent,
    NotesComponent,
    TakenoteComponent,
    UpdatenoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        HttpClientModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatDividerModule,
        MatSidenavModule,
        MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
