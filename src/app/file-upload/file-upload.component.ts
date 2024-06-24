import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:5000/nyc/rcu/upload', formData).pipe(
        //this.http.post('http://ch-nyc-app-2-env.eba-urc9ybxz.us-east-1.elasticbeanstalk.com/nyc/rcu/upload', formData).pipe(
        catchError(this.handleError)
      ).subscribe(response => {
        this.uploadSuccess = true;
        this.uploadError = false;
      }, error => {
        this.uploadSuccess = false;
        this.uploadError = true;
      });
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('File upload failed:', error);
    return throwError('File upload failed. Please try again.');
  }
}
