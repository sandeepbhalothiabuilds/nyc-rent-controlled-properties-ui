import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-download-properties',
  templateUrl: './download-properties.component.html',
  styleUrls: ['./download-properties.component.css']
})
export class DownloadPropertiesComponent {
  boroughs: string[] = ['MN', 'BX', 'BK', 'QN', 'SI'];
  selectedBorough: string = '';
  properties: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onDownload() {
    if (this.selectedBorough) {
      this.isLoading = true;
      this.errorMessage = '';
            //this.http.get<any[]>(`http://localhost:8080/nyc/rcu/getProperties/${this.selectedBorough}`).subscribe(

      this.http.get<any[]>(`http://nyc-rent-stablized-2-env.eba-zgrxhx29.us-east-1.elasticbeanstalk.com/nyc/rcu/getProperties/${this.selectedBorough}`).subscribe(
        data => {
          this.properties = data;
          this.downloadCSV(data);
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching properties:', error);
          this.isLoading = false;
          this.errorMessage = 'Error fetching properties. Please try again later.';
        }
      );
    }
  }

  convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array.map(row => {
      return Object.values(row).map(value => {
        return typeof value === 'string' ? JSON.stringify(value) : value;
      }).toString();
    }).join('\n');
  }

  downloadCSV(data: any[]) {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `properties_${this.selectedBorough}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
