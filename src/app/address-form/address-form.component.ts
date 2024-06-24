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
    county: '',
    zipcode: '',
    borough: ''
  };

  boroughs: string[] = ['MN', 'BX', 'BK', 'QN', 'SI'];
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  onSubmit() {
    const { zipcode, borough } = this.address;
    let url = `http://localhost:5000/nyc/rcu/api/properties/criteria?offset=50`;
    //let url = `http://ec2-3-88-108-171.compute-1.amazonaws.com:5000/nyc/rcu/api/properties/criteria?offset=50`;

    if (zipcode) {
      url += `&zipcode=${zipcode}`;
    }
    if (borough) {
      url += `&borough=${borough}`;
    }

    this.http.get<any[]>(url).subscribe(data => {
      this.searchResults = data.map(item => ({
        status1: item.property.status1,
        block: item.property.block,
        lot: item.property.lot,
        numberOfBuildings: item.units.numberOfBuildings,
        numOfFloors: item.units.numOfFloors,
        unitRes: item.units.unitRes,
        unitTotal: item.units.unitTotal,
        ucbblNumber: item.addresses.ucbblNumber,
        buildingNumber: item.addresses.buildingNumber,
        street: item.addresses.street,
        stateSuffix: item.addresses.stateSuffix,
        city: item.addresses.city,
        borough: item.addresses.borough,
        zip: item.addresses.zip
      }));
    }, error => {
      console.error('Error fetching properties:', error);
    });
  }

  onCancel() {
    this.address = {
      houseNumber: '',
      prefix: '',
      streetName: '',
      streetType: '',
      suffix: '',
      county: '',
      zipcode: '',
      borough: ''
    };
    this.searchResults = [];
  }
}
