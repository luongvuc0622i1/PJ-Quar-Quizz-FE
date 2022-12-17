import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormLoginRouting} from './form-login-routing.module';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from "../user/user.component";


@NgModule({
  declarations: [
    RegisterComponent,
      UserComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    CommonModule,
    RouterModule.forChild(FormLoginRouting),
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
      MatInputModule
  ]
})
export class FormLoginModule { }