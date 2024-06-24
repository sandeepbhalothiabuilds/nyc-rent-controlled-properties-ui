import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressTableComponent } from './address-table/address-table.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppRoutingModule } from './app-routing.module';
import { DownloadPropertiesComponent } from './download-properties/download-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressFormComponent,
    AddressTableComponent,
    FileUploadComponent,
    DownloadPropertiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
