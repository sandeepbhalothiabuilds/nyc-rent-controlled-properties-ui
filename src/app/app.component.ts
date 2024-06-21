import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  records: any[] = [];

  constructor(private http: HttpClient) {}

  handleSearch(address: any) {
    this.http.post<any[]>('your-api-endpoint', address).subscribe(data => {
      this.records = data;
    });
  }
}
