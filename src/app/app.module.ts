// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressTableComponent } from './address-table/address-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    AddressFormComponent,
    AddressTableComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule // Include AppRoutingModule in imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
