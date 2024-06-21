import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  address = {
    houseNumber: '',
    prefix: '',
    streetName: '',
    streetType: '',
    suffix: '',
    county: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('your-api-endpoint', this.address).subscribe(data => {
      // Handle response
    });
  }

  onCancel() {
    this.address = {
      houseNumber: '',
      prefix: '',
      streetName: '',
      streetType: '',
      suffix: '',
      county: ''
    };
  }
}
