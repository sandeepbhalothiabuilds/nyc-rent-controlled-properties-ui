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
  currentOffset: number = 0;
  hasMoreResults: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.currentOffset = 0;
    this.fetchData();
  }

  fetchData() {
    const { zipcode, borough } = this.address;
    //let url = `http://localhost:8080/nyc/rcu/api/properties/criteria?offset=${this.currentOffset}`;
    let url = `http://nyc-rent-stablized-2-env.eba-zgrxhx29.us-east-1.elasticbeanstalk.com/nyc/rcu/api/properties/criteria?offset=${this.currentOffset}`;
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
      this.hasMoreResults = data.length > 0;
    }, error => {
      console.error('Error fetching properties:', error);
    });
  }

  nextPage() {
    if (this.hasMoreResults) {
      this.currentOffset += 50;
      this.fetchData();
    }
  }

  previousPage() {
    if (this.currentOffset > 0) {
      this.currentOffset -= 50;
      this.fetchData();
    }
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
