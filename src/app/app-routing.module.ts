import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/address-search', pathMatch: 'full' },
  { path: 'address-search', component: AddressFormComponent },
  { path: 'file-upload', component: FileUploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
