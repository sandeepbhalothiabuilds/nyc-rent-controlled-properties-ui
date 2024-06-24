import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download-properties',
  templateUrl: './download-properties.component.html',
  styleUrls: ['./download-properties.component.css']
})
export class DownloadPropertiesComponent {
  boroughs: string[] = ['MN', 'BX', 'BK', 'QN', 'SI'];
  selectedBorough: string = '';
  properties: any[] = [];

  constructor(private http: HttpClient) {}

  onDownload() {
    if (this.selectedBorough) {
      //this.http.get<any[]>(`http://localhost:8080/nyc/rcu/getProperties/${this.selectedBorough}`).subscribe(
        this.http.get<any[]>(`http://ch-nyc-app-2-env.eba-urc9ybxz.us-east-1.elasticbeanstalk.com/nyc/rcu/getProperties/${this.selectedBorough}`).subscribe(
        data => {
          this.properties = data;
          this.downloadCSV(data);
        },
        error => {
          console.error('Error fetching properties:', error);
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
